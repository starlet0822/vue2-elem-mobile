<template>
  <header class="header-wrap">
    <van-nav-bar
      :title="title"
      :left-text="left_text"
      :right-text="right_text"
      fixed
    >
      <!-- 标题 -->
      <template #title>
        <div class="">{{ title }}</div>
      </template>
      <!-- 左侧内容 -->
      <template #left>
        <span class="van-nav-bar__text" @click="onClickLeft">{{
          left_text
        }}</span>
        <van-icon :name="left_icon" size="18" @click="onClickLeft" />
      </template>
      <!-- 右侧内容 -->
      <template #right>
        <span class="van-nav-bar__text" @click="onClickRight">{{
          right_text
        }}</span>
        <van-icon class="van-icon" :name="right_icon" size="18" @click="onClickRight" />
      </template>
    </van-nav-bar>
  </header>
</template>

<script>
export default {
  // 配置自定义属性
  props: ["title", "left_text", "right_text", "left_icon", "right_icon"],

  // 也可以使用对象写法
  // props: {
  //   title: {
  //     type: String,
  //     default: "",
  //   },
  //   ...
  // },

  methods: {
    // 点击左侧
    onClickLeft() {
      this.$emit("handleclickleft");
    },
    // 点击右侧
    onClickRight() {
      this.$emit("handleclickright");
    },
  },
};
</script>
    
<style lang="less" scoped>
.header-wrap {
  // /deep/.van-nav-bar {
  //   // background-color: #3190e8;
  //   background-color: var(--themeColor);
  //   /deep/.van-nav-bar__text,
  //   .van-nav-bar__title,
  //   .van-icon {
  //     color: #fff;
  //   }
  // }
}
</style>