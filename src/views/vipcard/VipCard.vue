<template>
  <div class="vip-page">
    <!-- 头部 -->
    <v-header
      title="会员中心"
      left_text=""
      left_icon="arrow-left"
      right_icon=""
      @handleclickleft="onClickLeft"
    ></v-header>
    <!-- 标题 -->
    <v-title :text="title"></v-title>
    <van-cell title="会员特权" is-link value="会员说明" />
  </div>
</template>

<script>
import VHeader from "@/components/VHeader.vue";
import VTitle from "@/components/VTitle";

export default {
  components: {
    VHeader,
    VTitle
  },
  computed:{
    title(){
      return `为账号 12333 购买会员`
    }
  },
  methods: {
    onClickLeft() {
      // 返回上一个页面
      this.$router.go(-1);
    },
  },
};
</script>

<style lang='less' scoped>
.vip-page {
  padding-top: 46px;
}
</style>