<template>
  <div class="live">
    <div class="l-top">
      <span class="title">生活指数</span>
      <a class="l-prev"></a>
      <a class="l-next"></a>
    </div>
    <ul class="l-datas" v-if="liveInfo">
      <li>
        <div class="ct-sub">
          <i class="icon icon-clothes"></i>
          <p class="content">穿衣 {{liveInfo.clothes&&liveInfo.clothes.title}}</p>
        </div>
        <div class="ct-detail">{{liveInfo.clothes&&liveInfo.clothes.desc}}</div>
      </li>
      <li>
        <div class="ct-sub">
          <i class="icon icon-sports"></i>
          <p class="content">运动 {{liveInfo.cl&&liveInfo.cl.title}}</p>
        </div>
        <div class="ct-detail">{{liveInfo.cl&&liveInfo.cl.desc}}</div>
      </li>
      <li>
        <div class="ct-sub">
          <i class="icon icon-cold"></i>
          <p class="content">感冒 {{liveInfo.cold&&liveInfo.cold.title}}</p>
        </div>
        <div class="ct-detail">{{liveInfo.cold&&liveInfo.cold.desc}}</div>
      </li>
      <li>
        <div class="ct-sub">
          <i class="icon icon-gj"></i>
          <p class="content">逛街 {{liveInfo.gj&&liveInfo.gj.title}}</p>
        </div>
        <div class="ct-detail">{{liveInfo.gj&&liveInfo.gj.desc}}</div>
      </li>
      <li>
        <div class="ct-sub">
          <i class="icon icon-uv"></i>
          <p class="content">防晒 {{liveInfo.uv&&liveInfo.uv.title}}</p>
        </div>
        <div class="ct-detail">{{liveInfo.uv&&liveInfo.uv.desc}}</div>
      </li>
      <li>
        <div class="ct-sub">
          <i class="icon icon-wc"></i>
          <p class="content">洗车 {{liveInfo.wash_car&&liveInfo.wash_car.title}}</p>
        </div>
        <div class="ct-detail">{{liveInfo.wash_car&&liveInfo.wash_car.desc}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    liveInfo() {
      return this.$store.state.liveDatas;
    },
  },
};
</script>
<style lang="less" scoped>
.live {
  margin-left: 20px;
  flex: 0 0 430px;
  .l-top {
    margin-left: 10px;
    margin-bottom: 10px;
    margin-right: 5px;
    .title {
      font-size: 18px;
      color: #344665;

      &::before {
        content: "";
        width: 10px;
        height: 10px;
        background: black;
        border-radius: 50%;
        display: inline-block;
        margin-right: 10px;
      }
    }
    .l-prev,
    .l-next {
      float: right;
      width: 22px;
      height: 22px;
      margin-right: 8px;
      cursor: pointer;
      background-size: 234px 212px !important;
    }
    .l-prev {
      background-image: url(../assets/icon/all.png);
      background-position: -191px 0;
    }
    .l-next {
      background-image: url(../assets/icon/all.png);
      background-position: -136px -154px;
    }
    &::after {
      content: "";
      clear: both;
      display: block;
    }
  }
  .l-datas {
    li {
      height: 140px;
      width: 200px;
      background: #fff;
      box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.08);
      border-radius: 10px;
      overflow: hidden;
      float: left;
      margin-left: 15px;
      margin-bottom: 20px;
      .ct-sub,
      .ct-detail {
        width: 100%;
        height: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        color: #384c78;
        transition: all 1s;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .ct-sub {
        .icon {
          height: 34px;
          width: 34px;
          margin-bottom: 20px;
          background-image: url(../assets/icon/all.png);
          background-size: 234px 212px !important;
          &.icon-clothes {
            background-position: -80px -37px;
          }
          &.icon-sports {
            background-position: -37px -43px;
          }
          &.icon-cold {
            background-position: -74px -154px;
          }
          &.icon-gj {
            background-position: -33px -115px;
          }
          &.icon-uv {
            background-position: 0 -43px;
          }
          &.icon-wc {
            background-position: -154px -111px;
          }
        }
        .content {
          font-size: 16px;
          line-height: 22px;
        }
        &:hover,
        &:hover + div {
          transform: translateY(-100%);
        }
      }
      .ct-detail {
        font-size: 13px;
        line-height: 1.5;
      }
    }
    &::after {
      content: "";
      clear: both;
      display: block;
    }
  }
}
</style>