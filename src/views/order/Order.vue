<template>
  <div class="order-page">
    <!-- 头部 -->
    <v-header
      title="订单列表"
      left_text=""
      right_text=""
      left_icon="arrow-left"
      right_icon=""
      @handleclickleft="onClickLeft"
    ></v-header>
    <!-- 搜索框 -->
    <!-- <van-search
      v-model="value"
      show-action
      placeholder="请输入商家或美食名称"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch(value)">搜索</div>
      </template>
    </van-search> -->
  </div>
</template>

<script>
import VHeader from "@/components/VHeader.vue";

export default {
  components:{VHeader},
  methods: {
    onClickLeft() {
      // 返回上一个页面
      this.$router.go(-1);
    },
  },
};
</script>

<style lang='less' scoped>
.order-page {
  // padding-top: 46px;
  
}
</style>