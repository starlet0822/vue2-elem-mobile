<template>
  <div class="search-page">
    <v-header
      title="搜索"
      left_text=""
      right_text=""
      left_icon="arrow-left"
      right_icon=""
      @handleclickleft="onClickLeft"
    ></v-header>
    <!-- 搜索框 -->
    <van-search
      v-model="value"
      show-action
      placeholder="请输入商家或美食名称"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch(value)">搜索</div>
      </template>
    </van-search>
  </div>
</template>

<script>
import api from '../../api'
import VHeader from "@/components/VHeader.vue";

export default {
  data() {
    return {
      value:'',

    };
  },
  components: {
    VHeader
  },
  methods: {
    onClickLeft() {
      // 返回上一个页面
      this.$router.go(-1);
    },
    onSearch(keyword){
      // console.log(keyword)
      // 搜索请求 TODO:接口有问题
      api.search.getSearchList({
        geohash:"31.38098,121.50146",
        keyword
      }).then(res=>{

      })
    },
  },
};
</script>

<style lang='less' scoped>
.search-page {
  // padding-top: 46px;
  
}
</style>