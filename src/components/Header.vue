<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/img/logo.png" />
    </div>
    <div class="city-container">
      <div class="current-city" @mouseenter="fcBlock" @mouseleave="fcNone">
        <span class="belongs" v-if="province">{{province}}</span>
        <span class="city">{{curCity}}</span>
      </div>
      <span class="focus" @click="addFocus">[{{focusText}}]</span>
      <div
        class="focus-city"
        v-show="focusCity"
        @mouseenter="focusCity=true"
        @mouseleave="focusCity=false"
      >
        <dl>
          <dt>关注的城市</dt>
          <dd v-for="(city,index) in focusList" :key="city">
            <div class="ct-location">
              <span>{{city}}</span>
              <button>设为默认</button>
            </div>
            <div class="ct-weather">
              <img src='../assets/icon/03.png' class="wt-icon" />
              <span>多云</span>
            </div>
            <div class="temperature">
              22°/29°
              <i class="icon-del" @click="delFocus(index)"></i>
            </div>
          </dd>
        </dl>
      </div>
      <div class="city-search">
        <input type="text" placeholder="搜索市、区、县等" @click="ctPanel" data-panel/>
        <city-panel v-show="cityPanel" />
      </div>
    </div>
  </div>
</template>
<script>
import CityPanel from "./CityPanel";
export default {
  name: "Header",
  props:['cityInfo'],
  components: {
    CityPanel,
  },
  data() {
    return {
      focusCity: false,
      cityPanel: false,
      isFocus: false,
      focusList: [],
      curCity:'北京',
      province: ''
    };
  },
  watch:{
    'cityInfo.city':{
      handler:'setCityInfo',
      immediate: true
    }
  },
  created(){
    let result = localStorage.getItem('focusList');
    if(result instanceof Array){
       this.focusList = result
    }else{
      localStorage.setItem('focusList',[])
    };
  },
  methods: {
    setCityInfo(){
      this.curCity = this.cityInfo.city;
      this.province = this.cityInfo.city !== this.cityInfo.province && this.cityInfo.province;
    },
    addFocus() {
      if (this.focusText === "已关注") return;
      this.focusList.push(this.$store.state.curCity);
      localStorage.setItem('focusList',this.focusList);
    },
    fcNone() {
      setTimeout(() => {
        this.focusCity = false;
      }, 0);
    },
    fcBlock() {
      this.focusCity = true;
      if (this.cityPanel) {
        this.cityPanel = false;
      }
    },
    delFocus(index) {
      this.focusList.splice(index,1);
      localStorage.setItem('focusList',this.focusList)
    },
    ctPanel(){
      this.cityPanel = true;
      document.onclick = e=>{
        if(e.target.dataset.panel === undefined){
          this.cityPanel = false;
        }
      }
    }
  },
  computed: {
    focusText() {
      if (this.focusList.indexOf(this.$store.state.curCity) > -1) {
        return "已关注";
      } else {
        return "添加关注";
      }
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
    display: flex;
    position: relative;
    align-items: center;
    .current-city {
      cursor: pointer;
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
      span {
        margin-right: 3px;
        font-size: 16px;
        color: #fff;
      }
    }
    .focus {
      font-size: 14px;
      color: #fff;
      opacity: 0.7;
      margin-right: 20px;
      cursor: pointer;
      margin-top: 1px;
    }
    .focus-city {
      position: absolute;
      top: 40px;
      left: 4px;
      width: 100%;
      border-radius: 4px;
      background-color: #fff;
      padding: 10px 0px;
      dl {
        dt {
          font-size: 12px;
          color: #9f9f9f;
          height: 17px;
          line-height: 17px;
          padding-left: 20px;
        }
        dd {
          display: flex;
          justify-content: space-between;
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
              }
            }
            .temperature {
              .icon-del {
                opacity: 1;
              }
            }
          }

          .ct-location {
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
            }
          }
          .ct-weather{
            .wt-icon{
              height: 20px;
              margin-right: 5px;
            }
          }

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
    .city-search {
      color: #555;
      position: relative;
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
    }
  }
}
</style>