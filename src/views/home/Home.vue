<template>
  <div class="home">
    <!-- 内容 -->
    <router-view></router-view>
    <!-- 底部tab栏 -->
    <van-tabbar v-model="$store.state.active" >
      <van-tabbar-item
        name="/misite"
        :to="{ path: '/misite', query: { geohash: '23.10647,113.32446' } }"
        icon="home-o"
        >外卖</van-tabbar-item
      >
      <van-tabbar-item name="/search" to="/search" icon="search"
        >搜索</van-tabbar-item
      >
      <van-tabbar-item name="/order" to="/order" icon="orders-o"
        >订单</van-tabbar-item
      >
      <van-tabbar-item name="/my" to="/my" icon="user-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      // active: '',
      geohash: "",
      // icon: {
      //   active: 'https://img.yzcdn.cn/vant/user-active.png',
      //   inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
      // },
    };
  },
  components: {},
  created() {
    let geohash = localStorage.getItem("geohash");
    // console.log(geohash);
    this.geohash = geohash;
    
  },
  
  
};
</script>

<style lang="less" scoped>
.home {
  // padding-bottom: 50px !important;
  background-color: #fff;
}
</style>
