<template>
  <div class="live">
    <div class="l-top">
      <span class="title">生活指数</span>
      <a class="l-prev"></a>
      <a class="l-next"></a>
    </div>
    <ul class="l-datas">
      <li>
        <div class="ct-sub">
          <i class="icon"></i>
          <p class="content">穿衣 炎热</p>
        </div>
        <div class="ct-detail">Lorem ipsum dolor sit amet.</div>
      </li>
      <li>
        <div class="ct-sub">
          <i class="icon"></i>
          <p class="content">穿衣 炎热</p>
        </div>
        <div class="ct-detail">Excepturi dolore magnam quos vitae.</div>
      </li>
      <li>
        <div class="ct-sub">
          <i class="icon"></i>
          <p class="content">穿衣 炎热</p>
        </div>
        <div class="ct-detail">Maiores quisquam suscipit ipsa laborum!</div>
      </li>
      <li>
        <div class="ct-sub">
          <i class="icon"></i>
          <p class="content">穿衣 炎热</p>
        </div>
        <div class="ct-detail">Voluptatibus cum voluptates quo eaque.</div>
      </li>
      <li>
        <div class="ct-sub">
          <i class="icon"></i>
          <p class="content">穿衣 炎热</p>
        </div>
        <div class="ct-detail">Qui pariatur eum culpa nisi!</div>
      </li>
      <li>
        <div class="ct-sub">
          <i class="icon"></i>
          <p class="content">穿衣 炎热</p>
        </div>
        <div class="ct-detail">Ipsum eos necessitatibus temporibus est.</div>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
.live {
  margin-left: 20px;
  flex: 0 0 430px;
  .l-top {
    margin-left: 10px;
    margin-bottom: 20px;
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
    }
    .l-prev {
      background-image: url(../assets/icon/all.png);
      background-position: -191px 0;
      background-size: 234px 212px !important;
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
      text-align: center;
      overflow: hidden;
      float: left;
      margin-left: 15px;
      margin-bottom: 20px;
      .ct-sub,
      .ct-detail {
        width: 100%;
        height: 100%;
        color: #384c78;
        transition: all 1s;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .ct-sub {
        .icon {
        }
        .content {
          font-size: 16px;
          line-height: 22px;
        }
        &:hover,
        &:hover + div{
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