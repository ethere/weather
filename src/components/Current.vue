<template>
  <div class="current">
    <p class="ct-origin">中央气象台{{nowInfo.temperature_time}}发布</p>
    <div class="ct-container clearFix">
      <div class="ct-left">
        <div class="ct-main">
          <span class="ct-temperature">{{nowInfo.temperature}}</span>
          <span class="ct-name">{{nowInfo.weather}}</span>
          <div class="ct-api" :style="aqiColor">
            <i class="aqi-icon" :style="aqiStyle"></i>
            <span
              @mouseenter="apiDisplay=true"
              @mouseleave="apiDisplay=false"
            >{{nowInfo.aqi}} {{nowInfo.quality?nowInfo.quality:''}}</span>
            <div class="ct-api-detail" v-show="apiDisplay">
              <i class="arrow" :style="aqiArrow"></i>
              <p
                class="ct-api-title"
                :style="aqiColor"
              >空气质量指数 {{nowInfo.aqi}} {{nowInfo.quality? nowInfo.quality:''}}</p>
              <table>
                <tbody>
                  <tr class="line1">
                    <td>
                      <p class="val">{{nowInfo.aqiDetail && nowInfo.aqiDetail['pm2_5']}}</p>
                      <p class="title">PM2.5</p>
                    </td>
                    <td>
                      <p class="val">{{nowInfo.aqiDetail && nowInfo.aqiDetail['pm10']}}</p>
                      <p class="title">PM10</p>
                    </td>
                    <td>
                      <p class="val">{{nowInfo.aqiDetail && nowInfo.aqiDetail['so2']}}</p>
                      <p class="title">SO2</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="val">{{nowInfo.aqiDetail && nowInfo.aqiDetail['no2']}}</p>
                      <p class="title">NO2</p>
                    </td>
                    <td>
                      <p class="val">{{nowInfo.aqiDetail && nowInfo.aqiDetail['o3']}}</p>
                      <p class="title">O3</p>
                    </td>
                    <td>
                      <p class="val">{{nowInfo.aqiDetail && nowInfo.aqiDetail['co']}}</p>
                      <p class="title">CO</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="ct-other">
          <i class="icon-wind" :style="windDirection" v-show="windDirection"></i>
          <span class="ct-wind">{{nowInfo.wind_direction}} {{nowInfo.wind_power}}</span>
          <span class="ct-humidity">湿度 {{nowInfo.sd}}</span>
          <span class="ct-kPa">气压{{nowInfo.air_press}}</span>
        </div>
      </div>
      <img :src="nowInfo.weather_pic" class="ct-img" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiDisplay: false,
      aqiArrow: "",
      aqiColor: "",
      windMap: {
        北风: "-191px -165px",
        东风: "-144px -191px",
        西北风: "-29px -191px",
        东北风: "-167px -191px",
        西风: "-191px -50px",
        南风: "-98px -191px",
        东南风: "-191px -73px",
        西南风: "-75px -191px",
      },
      aqiMap: {
        优: {
          pos: "-216px -1px",
          color: "#a3d765",
        },
        良: {
          pos: "-216px -21px",
          color: "#f0cc35",
        },
        轻度污染: {
          pos: "-216px -42px",
          color: "#DD7907",
        },
        中度污染: {
          pos: "-216px -105px",
          color: "#DC143C",
        },
        重度污染: {
          pos: "-216px -63px",
          color: "#8A5A83",
        },
        严重污染: {
          pos: "-216px -84px",
          color: "8E236B",
        },
      },
    };
  },
  created() {
    this.$store.commit("setFocusList");
    this.$store.dispatch("getFocusDatas");
  },
  computed: {
    nowInfo() {
      console.log(this.$store.state.curDatas)
      return this.$store.state.curDatas;
    },
    windDirection() {
      const position = this.windMap[this.nowInfo.wind_direction];
      if (!position) return "";
      return {
        backgroundPosition: position,
      };
    },
    aqiStyle() {
      if (this.nowInfo && !this.nowInfo.quality) {
        if (this.nowInfo.aqi < 50) {
          this.nowInfo.quality = "优";
        } else if (this.nowInfo.aqi < 100) {
          this.nowInfo.quality = "良";
        } else if (this.nowInfo.aqi < 150) {
          this.nowInfo.quality = "轻度污染";
        } else if (this.nowInfo.aqi < 200) {
          this.nowInfo.quality = "中度污染";
        } else if (this.nowInfo.aqi < 300) {
          this.nowInfo.quality = "重度污染";
        } else {
          this.nowInfo.quality = "严重污染";
        }
      }

      let aqiInfo = this.aqiMap[this.nowInfo.quality];
      if (!aqiInfo)
        aqiInfo = {
          pos: "-216px 0",
          color: "#a3d765",
        };
      this.aqiColor = {
        backgroundColor: aqiInfo.color,
      };
      this.aqiArrow = {
        borderBottomColor: aqiInfo.color,
      };
      return {
        backgroundPosition: aqiInfo.pos,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.current {
  margin-top: 30px;
  height: 310px;
  padding: 0 70px;
  padding-top: 20px;
  .ct-origin {
    font-size: 14px;
    color: #fff;
    opacity: 0.6;
    height: 19px;
    line-height: 19px;
    margin-bottom: 20px;
  }
  .ct-container {
    .ct-left {
      float: left;
      .ct-main {
        margin-top: 30px;
        display: flex;
        align-items: baseline;
        .ct-temperature {
          font-size: 86px;
          color: #fff;
          line-height: 86px;
        }
        .ct-name {
          font-size: 28px;
          color: #fff;
          line-height: 45px;
          margin-right: 24px;
        }
        .ct-api {
          position: relative;
          margin-right: 24px;
          cursor: pointer;
          border-radius: 18px;
          height: 18px;
          line-height: 18px;
          font-size: 14px;
          color: #fff;
          padding: 3px 10px 3px 3px;
          .aqi-icon {
            display: inline-block;
            height: 18px;
            width: 18px;
            border-radius: 50%;
            background: #fff url("../assets/icon/all.png");
            background-size: 234px 212px !important;
            margin-right: 4px;
            vertical-align: -3px;
          }
          .ct-api-detail {
            background: #fff;
            position: absolute;
            top: 40px;
            left: -100px;
            height: 169px;
            width: 254px;
            border-radius: 6px;
            .arrow {
              border: 10px solid transparent;
              border-bottom-color: #a3d765;
              position: absolute;
              left: 46%;
              top: -19px;
            }
            .ct-api-title {
              border-radius: 6px 6px 0 0;
              height: 42px;
              line-height: 42px;
              font-size: 18px;
              color: #fff;
              text-align: center;
              background: #a3d765;
            }
            table {
              width: 100%;
              padding: 10px;
              tr {
                height: 63px;
                &.line1 {
                  border-bottom: 1px solid #efefef;
                }
                td {
                  text-align: center;
                  .val {
                    font-size: 14px;
                    color: #555;
                    line-height: 24px;
                  }
                  .title {
                    font-size: 12px;
                    color: #9f9f9f;
                    line-height: 24px;
                  }
                }
              }
            }
          }
        }
      }
      .ct-other {
        margin-top: 20px;
        span {
          margin-right: 42px;
          color: #fff;
          height: 20px;
          line-height: 20px;
          font-size: 18px;
        }
        .icon-wind {
          display: inline-block;
          height: 20px;
          width: 20px;
          background: url("../assets/icon/all.png");
          background-size: 234px 212px !important;
          margin-right: 6px;
          vertical-align: -4px;
        }
        .ct-humidity {
          &::before {
            content: "";
            display: inline-block;
            height: 20px;
            width: 20px;
            background: url("../assets/icon/all.png");
            background-position: -191px -119px;
            background-size: 234px 212px !important;
            margin-right: 10px;
            vertical-align: middle;
          }
        }
        .ct-kPa {
          &::before {
            content: "";
            display: inline-block;
            height: 20px;
            width: 20px;
            background: url("../assets/icon/all.png");
            background-position: -191px -96px;
            background-size: 234px 212px !important;
            margin-right: 10px;
            vertical-align: middle;
          }
        }
      }
    }
    .ct-img {
      float: right;
      margin-right: 100px;
      width: 150px;
    }
  }
}
</style>