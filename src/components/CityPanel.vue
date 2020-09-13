<template>
  <div class="city-panel">
    <div class="cp-curCity">
      <p class="cp-title">当前定位</p>
      <span>{{$store.state.curCity}}</span>
    </div>
    <dl class="cp-history-city clearFix" v-show="historyCity.length">
      <dt class="cp-title">
        <span>历史记录</span>
        <span class="cp-clear" @click="clearHistory">清除</span>
      </dt>
      <dd v-for="city in historyCity" :key="city">
        <span @click="addHistory(city)">{{city}}</span>
      </dd>
    </dl>
    <dl class="cp-hotCitys clearFix">
      <dt class="cp-title">热门城市</dt>
      <dd v-for="city in hotCitys" :key="city">
        <span @click="addHistory(city)">{{city}}</span>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  props: ["history"],
  data() {
    return {
      hotCitys: [
        "北京",
        "上海",
        "武汉",
        "长沙",
        "广州",
        "西安",
        "合肥",
        "成都",
        "哈尔滨",
        "深圳",
        "厦门",
      ],
      historyCity: ["长沙", "上海", "武汉"],
    };
  },
  methods: {
    clearHistory() {
      this.historyCity = [];
    },
    addHistory(city) {
      if (this.historyCity.indexOf(city) === -1) {
        this.historyCity.unshift(city);
        if (this.historyCity.length === 5) {
          this.historyCity.pop();
        }
      }
      this.$store.dispatch("update", city);
    },
  },
  watch: {
    history() {
      this.addHistory(this.history);
    },
  },
  created() {
    let result = localStorage.getItem("historyCitys");
    if (result) {
      this.historyCity = result;
    } else {
      localStorage.setItem("historyCitys", []);
    }
  },
};
</script>
<style lang="less" scoped>
.city-panel {
  position: absolute;
  left: 0;
  top: 35px;
  padding: 20px 20px 10px;
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  .cp-title {
    font-size: 12px;
    color: #9f9f9f;
    height: 18px;
    line-height: 18px;
    margin-bottom: 8px;
    .cp-clear {
      float: right;
      width: 40px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      border-radius: 9px;
      background-color: #f0f0f0;
      font-size: 12px;
      color: #868686;
      cursor: pointer;
      margin-right: 20px;
    }
  }
  .cp-curCity {
    margin: 0 10px;
    margin-bottom: 10px;
    span {
      &::after {
        content: "";
        display: inline-block;
        height: 16px;
        width: 16px;
        background-image: url("../assets/icon/all.png");
        background-position: -210px 52px;
        background-size: 234px 212px !important;
        margin-right: 7px;
        vertical-align: -2px;
      }
    }
  }

  dl {
    margin: 0 10px;
    dd {
      float: left;
      width: 25%;
      height: 28px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: border-box;
      span {
        display: inline-block;
        height: 22px;
        line-height: 22px;
        padding: 0 4px;
        &:hover {
          background: #f3f3f3;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>