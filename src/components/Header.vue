<template>
  <div class="header">
    <div>
      <img src="../assets/img/logo.png" />
    </div>
    <div class="city-container">
      <div class="current-city" @mouseenter="focusCity=true" @mouseleave="focusLeave">
        <span class="belongs" v-if="curProvince">{{curProvince}}</span>
        <span class="city">{{curCity}}</span>
      </div>
      <div class="focus-city" v-show="focusCity" @mouseenter="detailEnter" @mouseleave="detailLeave">
        <dl>
          <dt>关注的城市</dt>
          <dd v-for="(item,index) in focusDatas" :key="item.city" @mouseenter="hovEnter(index)" class="clearFix">
            <div class="ct-location">
              <span>{{item.city}}</span>
              <button
                @click="setDefaultCity(item.city)"
                :class="{defaultStyle : defaultCity == item.city}"
              >{{defaultCity == item.city ? hovIndex == index ? '取消默认' : '默认' : '设为默认'}}</button>
            </div>
            <div class="ct-weather">
              <img :src="item.weather_pic" class="wt-icon" />
              <span>{{item.weather}}</span>
            </div>
            <div class="ct-temperature">
              {{item.temperature}}
              <i class="icon-del" @click="delFocus(index)"></i>
            </div>
          </dd>
        </dl>
      </div>
      <span class="focus-text" @click="addFocus">[{{focusText}}]</span>
      <div class="city-search">
        <input type="text" placeholder="搜索市、区、县等" @click="ctPanel" data-panel v-model="chooseCity" />
        <div class="searchCity" v-show="chooseCity">
          <span @click="changeCity">{{chooseCity}}</span>
        </div>
        <city-panel v-show="cityPanel&&!chooseCity" :history="history" />
      </div>
    </div>
  </div>
</template>
<script>
import CityPanel from "./CityPanel";
import axios from "../http.js";
export default {
  name: "Header",
  components: {
    CityPanel,
  },
  data() {
    return {
      focusCity: false,
      cityPanel: false,
      isFocus: false,
      hovIndex: null,
      chooseCity: "",
      history: "",
      defaultCity: "",
      leaveTimer: null,
    };
  },
  created() {
    this.$store.commit("setFocusList");
    this.defaultCity = localStorage.getItem("defaultCity");
  },
  methods: {
    focusLeave() {
      this.leaveTimer = setTimeout(() => {
        this.focusCity = false;
      }, 300);
    },
    hovEnter(index){
      this.hovIndex = index;
      this.detailEnter()
    },
    detailEnter() {
      clearTimeout(this.leaveTimer);
    },
    detailLeave() {
      this.hovIndex = null;
      this.focusLeave()
    },
    changeCity() {
      this.$store.dispatch("update", this.chooseCity);
      this.history = this.chooseCity;
      this.chooseCity = "";
    },
    setDefaultCity(city) {
      if (this.defaultCity === city) {
        localStorage.removeItem("defaultCity");
        this.defaultCity = null;
      } else {
        localStorage.setItem("defaultCity", city);
        this.defaultCity = city;
      }
    },
    addFocus() {
      if (this.focusText === "已关注") return;
      this.$store.commit("addFocusList");
    },
    fcNone() {},
    fcBlock() {
      this.focusCity = true;
      if (this.cityPanel) {
        this.cityPanel = false;
      }
    },
    delFocus(index) {
      this.$store.commit("delFocusCity", index);
    },
    ctPanel() {
      this.cityPanel = true;
      document.onclick = (e) => {
        if (e.target.dataset.panel === undefined) {
          this.cityPanel = false;
        }
      };
    },
  },
  computed: {
    focusText() {
      if (this.focusList.indexOf(this.$store.state.curCity) > -1) {
        return "已关注";
      } else {
        return "添加关注";
      }
    },
    curCity() {
      return this.$store.state.curCity;
    },
    curProvince() {
      const province = this.$store.state.curProvince;
      if (province && province !== this.curCity) {
        return province;
      } else {
        return "";
      }
    },
    focusDatas() {
      return this.$store.state.focusDatas;
    },
    focusList() {
      return this.$store.state.focusList;
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  padding: 0 70px;
  padding-top: 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .city-container {
    position: relative;
    .current-city {
      cursor: pointer;
      float: left;
      &::before {
        content: "";
        display: inline-block;
        height: 16px;
        width: 16px;
        background-image: url("../assets/icon/all.png");
        background-position: -216px 86px;
        background-size: 234px 212px !important;
        margin-right: 7px;
        vertical-align: baseline;
      }
      .belongs,
      .city {
        margin-right: 3px;
        font-size: 16px;
        color: #fff;
      }
    }
    .focus-city {
      width: 418px;
      min-height: 86px;
      position: absolute;
      top: 40px;
      left: 5px;

      border-radius: 4px;
      background-color: #fff;
      padding: 10px;
      dl {
        dt {
          font-size: 12px;
          color: #9f9f9f;
          height: 17px;
          line-height: 17px;
          padding-left: 20px;
        }
        dd {
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          color: #555;
          letter-spacing: 0;
          padding-left: 20px;
          padding-right: 10px;

          &:hover {
            background-color: #f4f4f4;
            .ct-location {
              button {
                opacity: 1;
                &.defaultStyle {
                  color: #777;
                  background: #f7f7f7;
                  border: 1px solid #cecece;
                }
              }
            }
            .ct-temperature {
              .icon-del {
                opacity: 1;
              }
            }
          }
          .ct-location {
            float: left;
            width: 130px;
            button {
              font-size: 12px;
              color: #777;
              background: #f7f7f7;
              border: 1px solid #cecece;
              border-radius: 4px;
              height: 18px;
              line-height: 18px;
              padding: 0 4px;
              margin-left: 5px;
              cursor: pointer;
              opacity: 0;
              &.defaultStyle {
                border: 1px solid #63b6f6;
                border-radius: 3px;
                color: #63b6f6;
                text-align: center;
                opacity: 1;
              }
            }
          }
          .ct-weather {
            float: left;
            .wt-icon {
              height: 20px;
              margin-right: 10px;
            }
          }
          .ct-temperature {
            float: right;
            .icon-del {
              background-image: url("../assets/icon/all.png");
              background-position: -216px 68px;
              background-size: 234px 212px !important;
              margin-right: 7px;
              width: 20px;
              height: 17px;
              margin-left: 15px;
              vertical-align: -3px;
              display: inline-block;
              cursor: pointer;
              opacity: 0;
            }
          }
        }
      }
    }
    .focus-text {
      float: left;
      font-size: 14px;
      color: #fff;
      opacity: 0.7;
      margin-right: 20px;
      cursor: pointer;
      margin-top: 1px;
    }
    .city-search {
      float: left;
      color: #555;
      position: relative;
      margin-top: -5px;
      input {
        border: none;
        outline: none;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 49px;
        padding: 5px 13px;
        width: 251px;
        height: 20px;
        color: rgba(255, 255, 255, 0.7);
        line-height: 20px;
        font-size: 14px;
      }
      ::-webkit-input-placeholder {
        color: #eee;
      }
      .searchCity {
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        cursor: pointer;
        left: 0;
        top: 35px;
        padding: 15px;
        background-color: #fff;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
        border-radius: 5px;
      }
    }
  }
}
</style>