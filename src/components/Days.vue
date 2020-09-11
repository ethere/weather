<template>
  <div class="days">
    <div class="d-top">
      <span class="title">7日天气预报</span>
      <a href="#" class="link-15">15日天气预报</a>
    </div>
    <ul class="d-datas">
      <li v-for="item in day7Info" :key="item.date">
        <div class="item-top">
          <p class="day">{{item.week}}</p>
          <p class="date">{{item.date}}</p>
          <p class="weather">{{item.day_weather}}</p>
          <img :src="item.day_weather_pic" alt />
        </div>
        <div class="item-bottom">
          <img :src="item.night_weather_pic" alt />
          <p class="weather">{{item.night_weather}}</p>
          <p class="wind">{{item.night_wind_direction}} {{item.night_wind_power}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return {
      weekMap:['周日','周一','周二','周三','周四','周五','周六']
    }
  },
  computed:{
    day7Info(){
      let list = this.$store.state.day7Datas.filter(item=>{
        return item;
      })
      const week = new Date().getDay();
      list = list.map((item,i)=>{
        const month = item.day.slice(4,6);
        const day = item.day.slice(6,8);
        item.date = month + '月' + day + '日';
        if(i === 0){
          item.week = '今天'
        }else if(i === 1){
          item.week = '明天'
        }else if(i === 2){
          item.week = '后天'
        }else{
          item.week = this.weekMap[(week + i)%7]
        };
        return item;
      })
      return list;
    }
  }
}
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
    .link-15 {
      float: right;
      background: #f8faff;
      border: 1px solid #dce5f0;
      border-radius: 37px;
      font-size: 12px;
      color: #384c78;
      line-height: 26px;
      height: 26px;
      width: 100px;
      text-align: center;
      margin-right: 30px;
      text-decoration: none;
    }
  }
  .d-datas {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: stretch;
    li {
      text-align: center;
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
      }
      .weather {
        font-size: 14px;
        color: #384c78;
        line-height: 14px;
        height: 14px;
        margin-bottom: 20px;
      }
      .item-bottom {
        .weather{
            margin-top: 20px;
        }
        .wind {
          font-size: 12px;
          color: #8a9baf;
          line-height: 12px;
          height: 12px;
        }
      }
      img {
        width: 30px;
        height: 30px;
        align-items: center;
      }
    }
  }
}
</style>