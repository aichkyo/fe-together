<template>
  <div class="slide-pager-guide">
    <div class="content-box">
      <div class="arrow-img">
        <img src="./image/turn-left.png">
        <img src="./image/turn-right.png">
      </div>

      <div class="tips">左右滑动可切换上下篇</div>

      <van-button type="primary"
                  style="width: 128px; height: 40px;"
                  @click="$emit('markRead')">知道了</van-button>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="less" scoped>
  .slide-pager-guide {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 999;
    // opacity: 1;
    /* 中性色/蒙层#000000-70% */
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;

    .content-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .arrow-img {
      display: flex;
      align-items: center;
      justify-content: space-around;
      > img {
        width: 28%;
      }
    }
    .tips {
      margin: 60px 0;
      font-size: 32px;
      color: #ffffff;
    }
  }
</style>