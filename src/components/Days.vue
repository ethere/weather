<template>
  <div class="days">
    <div class="d-top">
      <span class="title">7日天气预报</span>
    </div>
    <ul class="d-datas clearFix">
      <li v-for="item in day7Info" :key="item.date">
        <div class="item-top">
          <p class="day">{{item.week}}</p>
          <p class="date">{{item.date}}</p>
          <p class="weather">{{item.day_weather}}</p>
          <img :src="item.day_weather_pic" class="d-icon" alt />
        </div>
        <div class="item-bottom">
          <img :src="item.night_weather_pic" class="d-icon" alt />
          <p class="weather">{{item.night_weather}}</p>
          <p class="wind">{{item.night_wind_direction}} {{item.night_wind_power}}</p>
        </div>
      </li>
    </ul>
    <canvas width="700" height="174" class="d-chart"></canvas>
  </div>
</template>
<script>
export default {
  data() {
    return {
      weekMap: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      dom: null,
      tempList:[],
      minTemp:Infinity,
      maxTemp:-Infinity
    };
  },
  mounted(){
    this.dom = document.querySelector('.d-chart');
    this.drawChart()
  },
  computed: {
    day7Info() {
      let list = this.$store.state.day7Datas.filter((item) => {
        return item;
      });
      const week = new Date().getDay();
      this.minTemp = Infinity;
      this.maxTemp = -Infinity;
      this.tempList = [];
      list = list.map((item, i) => {
        const month = item.day.slice(4, 6);
        const day = item.day.slice(6, 8);
        item.date = month + "月" + day + "日";
        if (i === 0) {
          item.week = "今天";
        } else if (i === 1) {
          item.week = "明天";
        } else if (i === 2) {
          item.week = "后天";
        } else {
          item.week = this.weekMap[(week + i) % 7];
        }
        const dayTemp = +item.day_air_temperature;
        const nightTemp = +item.night_air_temperature;
        const tMin = Math.min(dayTemp,nightTemp);
        const tMax = Math.max(dayTemp,nightTemp);
        if(tMin < this.minTemp) this.minTemp = tMin;
        if(tMax > this.maxTemp) this.maxTemp = tMax;
        this.tempList.push([dayTemp,nightTemp])
        return item;
      });
      this.drawChart()
      return list;
    },
  },
  methods:{
    drawChart(){
      if(this.dom === null || this.tempList.length === 0) return;
      const ctx = this.dom.getContext('2d');
      ctx.clearRect(0, 0, this.dom.width, this.dom.height);
      const min = this.minTemp;
      const scale = 100/(this.maxTemp-min); //刻度
      const mapPos = this.tempList.map((item,i) => {
        const x = 50 + i * 100;
        // 37  为y轴最高温度坐标点
        // 137 为y轴最低温度坐标点
        let high,
            low,
            tempH,
            tempL;
        if(item[0] < item[1]){
            high = 137 - (item[1] - min) * scale;
            low = 137 - (item[0] - min) * scale;
            tempH = item[1];
            tempL = item[0]
        }else{
            high = 137 - (item[0] - min) * scale;
            low = 137 - (item[1] - min) * scale;
            tempH = item[0];
            tempL = item[1]
        }
        return {
          x,
          high,
          low,
          tempH,
          tempL
        }
      });
      //高温曲线
      ctx.moveTo(mapPos[0].x,mapPos[0].high);
      ctx.lineWidth = 3;
      for(let i = 1; i < mapPos.length; i++){
        ctx.lineTo(mapPos[i].x,mapPos[i].high)
      }
      ctx.strokeStyle = 'rgb(252 195 112)';
      ctx.stroke()
      //低温曲线
      ctx.beginPath();
      ctx.strokeStyle = 'rgb(148 204 249)';
      ctx.moveTo(mapPos[0].x,mapPos[0].low);
      for(let i = 1; i < mapPos.length; i++){
        ctx.lineTo(mapPos[i].x,mapPos[i].low)
      }
      ctx.stroke();
      //描点
      mapPos.forEach((item,i) => {
        //高温点
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(252 195 112)';
        ctx.fillStyle = 'rgb(252 195 112)';
        ctx.arc(item.x,item.high,4,0,Math.PI*2,0);
        ctx.fill();
        ctx.stroke();
        //低温点
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(148 204 249)';
        ctx.fillStyle = 'rgb(148 204 249)';
        ctx.arc(item.x,item.low,4,Math.PI*2,0);
        ctx.fill();
        ctx.stroke();
        //最高温度
        ctx.fillStyle = 'rgba(0,0,0,.5)';
        ctx.font = "18px Arial";
        ctx.beginPath();
        ctx.fillText(item.tempH + '°',item.x - 15 ,item.high - 10);
        //最低温度
        ctx.beginPath();
        ctx.fillText(item.tempL + '°',item.x - 15,item.low + 30);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.days {
  flex: 0 0 740px;
  width: 740px;
  height: 492px;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.08);
  position: relative;
  .d-top {
    height: 21px;
    line-height: 21px;
    margin-bottom: 22px;
    margin-left: 10px;
    .title {
      font-size: 18px;
      color: #344665;
      float: left;
      margin-right: 10px;

      &::before {
        content: "";
        width: 10px;
        height: 10px;
        background: black;
        border-radius: 50%;
        display: inline-block;
        margin-right: 8px;
      }
    }
  }
  .d-datas {
    width: 100%;
    height: calc(100% - 40px);
    li {
      width: 100px;
      height: 100%;
      float: left;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .weather {
        font-size: 14px;
        color: #384c78;
        line-height: 14px;
        height: 14px;
      }
      .d-icon {
        width: 30px;
        height: 30px;
        align-items: center;
      }
      .item-top {
        .day {
          font-size: 14px;
          color: #384c78;
          margin-bottom: 12px;
          height: 14px;
          line-height: 14px;
        }
        .date {
          font-size: 12px;
          color: #8a9baf;
          margin-bottom: 30px;
          height: 12px;
          line-height: 12px;
        }
        .weather {
          margin-bottom: 20px;
        }
      }
      .item-bottom {
        margin-bottom: 10px;
        .weather {
          margin-top: 20px;
          margin-bottom: 10px;
        }
        .wind {
          font-size: 12px;
          color: #8a9baf;
          line-height: 12px;
          height: 12px;
        }
      }
    }
  }
  .d-chart {
    position: absolute;
    left: 20px;
    top: 199px;
    user-select: none;
  }
}
</style>