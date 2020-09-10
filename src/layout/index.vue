<template>
  <div class="weather-container">
    <container-header :city-info="headerDatas" />
    <current :current-datas="currentDatas?currentDatas:''" />
    <hours :hours-datas="hoursDatas?hoursDatas:''" :sun-times="currentDatas.sunTimes" />
    <div class="container">
      <days :daysDatas="daysDatas?daysDatas:''" :day15List="day15List" @click="getDayDatas" />
      <live :liveDatas="liveDatas?liveDatas:''" />
    </div>
    <container-footer />
  </div>
</template>

<script>
import containerHeader from "../components/Header";
import Current from "../components/Current";
import Hours from "../components/Hours";
import Days from "../components/Days";
import Live from "../components/Live";
import containerFooter from "../components/Footer";
import axios from "../http.js";
export default {
  name: "Index",
  components: {
    containerHeader,
    Current,
    Hours,
    Days,
    Live,
    containerFooter,
  },
  data() {
    return {
      currentDatas: {},
      headerDatas: {},
      hoursDatas: {},
      daysDatas: null,
      day15List: null,
      liveDatas: null,
    };
  },
  watch:{
      '$store.state.curCity':{
          handler(){
              this.getNowDatas();
              this.getHourDatas();
          }
      }
  },
  created() {
    this.getNowDatas();
    this.getHourDatas();
  },
  methods: {
    updataHour() {
      let sunTimes = this.hoursDatas.sunTimes;
      let begin = sunTimes.begin.slice(0, 2);
      let end = sunTimes.end.slice(0, 2);
      let bIndex, eIndex;
      let newList = this.hoursDatas.list.map((hour, index) => {
        const time = hour.time.slice(8, 10);
        if (time == "00") {
          hour.time = "明天";
        } else {
          hour.time = time + ":00";
        }
        if (time == begin) {
          bIndex = index + 1;
        }
        if (time == end) {
          eIndex = index + 1;
        }
        return hour;
      });
      newList.splice(bIndex, 0, {
        time: sunTimes.begin,
        temperature: "日出",
      });
      newList.splice(eIndex, 0, {
        time: sunTimes.end,
        temperature: "日落",
      });
      return newList;
    },
    getNowDatas() {
      axios
        .get("/area-to-weather", {
          params: {
            area: this.$store.state.curCity,
            needAlarm: 1,
            needIndex: 1,
          },
        })
        .then((data) => {
          const { c5: city, c7: province, c9: country } = data.cityInfo;
          this.headerDatas.city = city;
          this.headerDatas.province = province;
          this.headerDatas.country = country;
          const {
            sd, //空气湿度
            temperature, //当前气温
            temperature_time, //采集时间
            weather, //天气文字标识
            weather_pic, //天气图片地址
            wind_direction, //风向名称
            wind_power, //风力
            aqi, //空气质量指数，越小越好
            quality, //空气质量指数类别，有“优，良...”
          } = data.now;

          this.currentDatas.temperature = temperature;
          this.currentDatas.temperature_time = temperature_time;
          this.currentDatas.weather = weather;
          this.currentDatas.aqi = aqi;
          this.currentDatas.quality = quality;
          this.currentDatas.wind_direction = wind_direction;
          this.currentDatas.wind_power = wind_power;
          this.currentDatas.sd = sd;
          this.currentDatas.weather_pic = weather_pic;
          const {
            co, //一氧化碳1小时平均
            no2, //二氧化氮1小时平均
            o3, //臭氧1小时平均
            pm10, //颗粒物（粒径小于等于10μm）1小时平均
            pm2_5, //颗粒物（粒径小于等于2.5μm）1小时平均
            so2, //二氧化硫1小时平均
          } = data.now.aqiDetail;

          this.currentDatas.aqiDetail = {
            co,
            no2,
            o3,
            pm10,
            pm2_5,
            so2,
          };
          const {
            air_press, //大气压
            sun_begin_end, //日出|日落时间
            alarmList, //预警
          } = data.f1;

          this.currentDatas.air_press = air_press;
          this.currentDatas.alarmList = alarmList;
          let times = sun_begin_end.split("|");
          this.hoursDatas.sunTimes = {
            begin: times[0],
            end: times[1],
          };
          if (this.hoursDatas.list) {
            this.hoursDatas = this.updataHour();
          }
          const { clothes, cold, wash_car, cl, uv, gj } = data.f1.index;
          this.liveDatas = {
            clothes,
            cold,
            wash_car,
            cl,
            uv,
            gj,
          };

          let fList = [];
          for (let i = 1; i <= 7; i++) {
            fList.push(data["f" + i]);
          }
          this.daysDatas = fList.map((item) => {
            return (
              item && {
                day: item.day,
                day_air_temperature: item.day_air_temperature, //晚上气温(摄氏度)
                day_weather: item.day_weather, //白天天气标识
                day_weather_pic: item.day_weather_pic, //白天天气图标
                night_air_temperature: item.night_air_temperature, //晚上气温(摄氏度)
                night_weather: item.night_weather, //晚上天气标识
                night_weather_pic: item.night_weather_pic, //晚上天气图标
                night_wind_direction: item.night_wind_direction, //晚上风向
                night_wind_power: item.night_wind_power, //晚上风力
              }
            );
          });
        });
    },
    getHourDatas() {
      axios
        .get("/hour24", {
          params: {
            area: this.$store.state.curCity,
          },
        })
        .then((data) => {
          this.hoursDatas.list = data.hourList;
          if (this.hoursDatas.sunTimes) {
            this.hoursDatas = this.updataHour();
          }
        });
    },
    getDayDatas() {
      axios
        .get("/day15", {
          params: {
            area: this.$store.state.curCity,
          },
        })
        .then((data) => {
          this.day15List = data.dayList;
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/reset.css");
.weather-container {
  min-width: 1200px;
  box-sizing: border-box;
  background: #f6f9fe url("../assets/img/bg.jpg") center top no-repeat;
  font-family: "PingFang SC", "Microsoft YaHei", Simsun, Helvetica, Arial,
    sans-serif;
}
.container {
  display: flex;
  padding: 0 70px;
}
</style>