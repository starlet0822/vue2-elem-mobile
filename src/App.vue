<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import "../src/assets/styles/reset.less";
// 全局样式
#app {
  padding: 46px 0;
  width: 100%;
  height: 100%;
  
  /deep/.van-nav-bar {
    // background-color: #3190e8;
    background-color: var(--themeColor);
    /deep/.van-nav-bar__text,
    .van-nav-bar__title,
    .van-icon {
      color: #fff;
    }
  }
}
</style>
