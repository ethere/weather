<template>
  <div class="live">
    <div class="l-top">
      <span class="title">生活指数</span>
      <a class="l-next" @click="getNext"></a>
      <a class="l-prev" @click="getPrev"></a>
    </div>
    <ul class="l-datas" v-if="liveInfo" :style="otherIndex">
      <li v-for="(val,indexName) in liveInfo" :key="indexName">
        <div class="ct-sub">
          <i class="icon" :class="getClass(indexName)"></i>
          <p class="content">{{indexName}} {{val&&val.title}}</p>
        </div>
        <div class="ct-detail">{{val&&val.desc}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      indexMap: {
        穿衣: "cy",
        感冒: "gm",
        洗车: "xc",
        晨练: "cl",
        紫外线: "uv",
        逛街: "gj",
        钓鱼: "dy",
        旅游: "ly",
        约会: "yh",
        化妆: "hz",
        中暑: "zs",
        晾晒: "ls",
      },
      otherIndex: {
        transform:'translateX(0)'
      }
    };
  },
  computed: {
    liveInfo() {
      return this.$store.state.liveDatas;
    },
  },
  methods: {
    getClass(name) {
      return "icon-" + this.indexMap[name];
    },
    getPrev(){
      this.otherIndex.transform = 'translateX(0)';
    },
    getNext(){
      this.otherIndex.transform = 'translateX(-420px)';
    }
  },
};
</script>
<style lang="less" scoped>
.live {
  margin-left: 20px;
  flex: 0 0 430px;
  overflow: hidden;
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
      background-position: -136px -154px;
    }
    .l-next {
      background-image: url(../assets/icon/all.png);
      background-position: -191px 0;
    }
    &::after {
      content: "";
      clear: both;
      display: block;
    }
  }
  .l-datas {
    width: 840px;
    transition: all 1s;
    li {
      height: 140px;
      width: 200px;
      background: #fff;
      box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.08);
      border-radius: 10px;
      overflow: hidden;
      float: left;
      margin-left: 10px;
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
          &.icon-cy {
            background-position: -80px -37px;
          }
          &.icon-gm {
            background-position: -74px -154px;
          }
          &.icon-xc {
            background-position: -154px -111px;
          }
          &.icon-cl {
            background-position: -37px -43px;
          }
          &.icon-uv {
            background-position: 0 -43px;
          }
          &.icon-gj {
            background-position: -33px -115px;
          }
          &.icon-dy {
            background-position: -154px -74px;
          }
          &.icon-ly {
            background-position: -117px -74px;
          }
          &.icon-yh {
            background-position: 0 -115px;
          }
          &.icon-hz {
            background-position: -112px -115px;
          }
          &.icon-zs {
            background-position: 0 -43px;
          }
          &.icon-ls {
            background-position: -74px -80px;
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