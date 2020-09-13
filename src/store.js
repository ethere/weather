import Vue from 'vue';
import Vuex from 'vuex';
import axios from './http.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        curCity: '长沙',
        curProvince: '湖南',
        curDatas: {},
        sunTimes: null,
        hourDatas: [],
        day7Datas: [],
        liveDatas: [],
        day15Datas: [],
        focusList: [], //关注的城市列表 
        focusDatas: [] //关注的城市列表对应的天气
    },
    getters: {
        hourList(state) {
            if (state.sunTimes && state.hourDatas.length) {
                const times = state.sunTimes.split('|');
                const begin = times[0].slice(0, 2);
                const end = times[1].slice(0, 2);
                let bIndex, eIndex;
                let newList = state.hourDatas.map((hour, index) => {
                    let time;
                    if (hour.time.length > 8) {
                        time = hour.time.slice(8, 10);
                    } else {
                        time = hour.time.slice(0, 2)
                    }

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
                    return {
                        time: hour.time,
                        iconSrc: 'http://app1.showapi.com/weather/icon/day/' + hour.weather_code + '.png',
                        temperature: hour.temperature + '°'
                    };
                });
                newList.splice(bIndex, 0, {
                    time: times[0],
                    iconSrc:'https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/rise.png',
                    temperature: '日出'
                });
                newList.splice(eIndex, 0, {
                    time: times[1],
                    iconSrc:'https://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/set.png',
                    temperature: '日落'
                })
                return newList;
            }
        }
    },
    mutations: {
        setPosition(state, cityInfo) {
            state.curCity = cityInfo.city;
            state.curProvince = cityInfo.province;
        },
        setNowInfo(state, nowInfo) {
            state.curDatas = nowInfo;
            state.sunTimes = nowInfo.sun_begin_end;
        },
        setLiveInfo(state, liveInfo) {
            state.liveDatas = liveInfo;
        },
        setDayInfo(state, dayInfo) {
            state.day15Datas = dayInfo.map(item => {
                //http://app1.showapi.com/weather/icon/day/00.png
                //http://app1.showapi.com/weather/icon/night/01.png
                return (
                    item && {
                        day: item.daytime,
                        day_air_temperature: item.day_air_temperature, //白天气温(摄氏度)
                        day_weather: item.day_weather, //白天天气标识
                        day_weather_pic: item.day_weather_pic, //白天天气图标
                        night_air_temperature: item.night_air_temperature, //晚上气温(摄氏度)
                        night_weather: item.night_weather, //晚上天气标识
                        night_weather_pic: item.night_weather_pic, //晚上天气图标
                        night_wind_direction: item.night_wind_direction, //晚上风向
                        night_wind_power: item.night_wind_power, //晚上风力
                    }
                );
            })
            state.day7Datas = state.day15Datas.slice(0, 7);
        },
        setHourInfo(state, hourInfo) {
            state.hourDatas = hourInfo;
        },
        setFocusList(state) {
            let result = localStorage.getItem("focusList");
            if (result) {
                state.focusList = result.split(',');
            } else {
                localStorage.setItem("focusList", []);
            }
        },
        addFocusList(state) {
            state.focusList.unshift(state.curCity);
            localStorage.setItem("focusList", state.focusList);
            let curCity = state.day7Datas[0];
            let weather;
            if (curCity.day_weather === curCity.night_weather) {
                weather = curCity.day_weather
            } else {
                weather = `${curCity.day_weather}转${curCity.night_weather}`
            }
            state.focusDatas.unshift({
                city: state.curCity,
                weather,
                temperature: `${curCity.day_air_temperature}°/${curCity.night_air_temperature}°`,
                weather_pic: state.curDatas.weather_pic
            });
        },
        delFocusCity(state, index) {
            state.focusList.splice(index, 1);
            state.focusDatas.splice(index, 1);
            console.log(state.focusDatas);
            console.log(state.focusList)
            localStorage.setItem("focusList", state.focusList);
        },
        setFocusData(state, focusDatas) {
            state.focusDatas = focusDatas;
        }
    },
    actions: {
        update(context, city) {
            axios.get("/area-to-weather", {
                params: {
                    area: city,
                    needAlarm: 1,
                    needIndex: 1,
                    needMoreDay: 1
                }
            }).then(res => {
                //更新地理信息
                const {
                    c5: city,
                    c7: province
                } = res.cityInfo;
                context.commit('setPosition', {
                    city,
                    province
                })
                //更新当前天气信息
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
                } = res.now;
                const {
                    co, //一氧化碳1小时平均
                    no2, //二氧化氮1小时平均
                    o3, //臭氧1小时平均
                    pm10, //颗粒物（粒径小于等于10μm）1小时平均
                    pm2_5, //颗粒物（粒径小于等于2.5μm）1小时平均
                    so2, //二氧化硫1小时平均
                } = res.now.aqiDetail;
                const {
                    air_press, //大气压
                    sun_begin_end, //日出|日落时间
                    alarmList, //预警
                } = res.f1;
                context.commit('setNowInfo', {
                    sd,
                    temperature,
                    temperature_time,
                    weather,
                    weather_pic,
                    wind_direction,
                    wind_power,
                    aqi,
                    quality,
                    air_press,
                    alarmList,
                    sun_begin_end,
                    aqiDetail: {
                        co,
                        no2,
                        o3,
                        pm10,
                        pm2_5,
                        so2
                    }
                })
                //更新生活指数
                const {
                    clothes,
                    cold,
                    wash_car,
                    cl,
                    uv,
                    gj,
                    dy,//钓鱼
                    travel,//旅游
                    yh,//交通
                    beauty,//空气污染扩散条件
                    zs,
                    ls//晾晒
                } = res.f1.index;
                context.commit('setLiveInfo', {
                    "穿衣":clothes,
                    "感冒":cold,
                    "洗车":wash_car,
                    "晨练":cl,
                    "紫外线":uv,
                    "逛街":gj,
                    "钓鱼":dy,
                    "旅游":travel,
                    "约会":yh,
                    "化妆":beauty,
                    "中暑":zs,
                    "晾晒":ls
                })
                //更新近七天数据
                axios
                    .get("/day15", {
                        params: {
                            area: context.state.curCity,
                        },
                    })
                    .then(res => {
                        context.commit('setDayInfo', res.dayList)
                    });
            })
            axios.get("/hour24", {
                params: {
                    area: city,
                }
            }).then(res => {
                context.commit('setHourInfo', res.hourList)
            })
        },
        getFocusDatas(context) {
            let list = [];
            context.state.focusList.forEach((city) => {
                axios.get("/area-to-weather", {
                    params: {
                        area: city,
                    },
                }).then(res => {
                    const weather_pic = res.now.weather_pic;
                    const {
                        day_air_temperature,
                        day_weather,
                        night_air_temperature,
                        night_weather,
                    } = res.f1;
                    let weather;
                    if (day_weather === night_weather) {
                        weather = day_weather
                    } else {
                        weather = `${day_weather}转${night_weather}`
                    }
                    list.push({
                        city,
                        weather,
                        temperature: `${day_air_temperature}°/${night_air_temperature}°`,
                        weather_pic
                    });
                    if (list.length === context.state.focusList.length) {
                        context.commit('setFocusData', list)
                    }
                });
            });

        }
    }
})