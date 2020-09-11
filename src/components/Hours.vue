<template>
  <div class="hours">
    <div class="h-top">
      <span class="title">逐小时预报</span>
      <a class="origin" href="#">数据来源于中国天气网</a>
      <a class="h-next" @click="getNext"></a>
      <a class="h-prev" @click="getPrev"></a>
    </div>
    <ul class="h-datas" :style="{transform:offset}">
      <li v-for="hour in hourDatas" :key="hour.time">
        <span class="h-time">{{hour.time}}</span>
        <i class="h-weather-icon"></i>
        <span class="h-weather-temp">{{hour.temperature}}°</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Hours",
  data(){
    return {
      offset: ''
    }
  },
  methods:{
    getPrev(){
      this.offset = 'translateX(0px)';
    },
    getNext(){
      this.offset = 'translateX(-1140px)';
    }
  },
  computed:{
    hourDatas(){
      return this.$store.getters.hourList;
    }
  }
};
</script>
<style lang="less" scoped>
.hours {
  height: 143px;
  margin: 130px 70px 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.08);
  width: 1140px;
  padding: 20px 30px 27px;
  overflow: hidden;
  .h-top {
    height: 21px;
    line-height: 21px;
    margin-bottom: 22px;

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
    .origin {
      font-size: 12px;
      color: #8a9baf;
      text-decoration: none;
    }
    .h-next,
    .h-prev {
      float: right;
      width: 22px;
      height: 22px;
      margin-right: 8px;
      cursor: pointer;
    }
    .h-prev {
      background-image: url(../assets/icon/all.png);
      background-position: -136px -154px;
    }
    .h-next {
      background-image: url(../assets/icon/all.png);
      background-position: -191px 0;
      background-size: 234px 212px !important;
    }
  }
  .h-datas {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    transition: 1s;
    height: calc(100% - 43px);
    li {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      flex: 0 0 95px;
      .h-weather-icon {
        height: 30px;
        width: 30px;
        background: url("../assets/icon/03.png");
        background-size: 30px 30px;
      }
    }
  }
}
</style>