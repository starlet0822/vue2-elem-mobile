<template>
  <van-nav-bar title="" left-text="ele.me">
    <template #right>
      <van-icon name="user-o" size="18" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.van-nav-bar {
  background-color: #3190e8;
  /deep/ .van-nav-bar__text,
  .van-icon {
    color: #fff;
  }
}
</style>