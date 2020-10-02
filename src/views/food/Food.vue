<template>
  <div class="food-page">
    <!-- 头部 -->
    <v-header
      :title="title"
      left_icon="arrow-left"
      @handleclickleft="onClickLeft"
    ></v-header>
    <!-- 筛选工具 -->
    <section class="tools">
      <van-dropdown-menu>
        <!-- <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" /> -->
        <van-dropdown-item title="分类" ref="item"> 分类 </van-dropdown-item>
        <van-dropdown-item title="排序" ref="item">
          <van-cell
            :title="item.title"
            icon="location-o"
            v-for="item in orderbyList"
            :key="item.id"
            @click="handleItem(item.id)"
          />
        </van-dropdown-item>
        <van-dropdown-item title="筛选" ref="item">
          <v-title text="配送方式"></v-title>
          <van-tag
            plain
            type="primary"
            :color="'#' + item.color"
            class="ml10"
            v-for="item in modes"
            :key="item.id"
            >{{ item.text }}</van-tag
          >
          <v-title text="商家属性（可以多选）"></v-title>
          <div class="attributes">
            <van-tag
              plain
              type="primary"
              class="ml5"
              v-for="item in attributes"
              :key="item.id"
              >{{ item.name }}</van-tag
            >
            <!-- <van-tag plain type="primary" class="ml5">标签</van-tag>
            <van-tag plain type="primary" class="ml5">标签</van-tag>
            <van-tag plain type="primary" class="ml5">标签</van-tag> -->
          </div>
          <div class="btns df-sb">
            <van-button type="default" size="small">清空</van-button>
            <van-button type="primary" size="small">确定</van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </section>
    <!-- 商铺列表 -->
    <v-shop-list :data="shopList"></v-shop-list>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
import VTitle from "@/components/VTitle";
import VShopList from "@/components/common/ShopList";
import api from "../../api";

export default {
  data() {
    return {
      title: "",
      shopList: [],
      modes: [],
      attributes: [],
      categoryList: [],
      orderbyList: [
        {
          id: 4,
          title: "智能排序",
          icon: "location-o",
        },
        {
          id: 5,
          title: "距离最近",
          icon: "location-o",
        },
        {
          id: 6,
          title: "销量最高",
          icon: "location-o",
        },
        {
          id: 1,
          title: "起送价最低",
          icon: "location-o",
        },
        {
          id: 2,
          title: "配送速度最快",
          icon: "location-o",
        },
        {
          id: 3,
          title: "评分最高",
          icon: "location-o",
        },
      ],

      switch1: false,
      switch2: false,

      value1: 0,
      value2: "a",
      value3: "A",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" },
      ],
      option3: [
        { text: "A", value: "A" },
        { text: "B", value: "B" },
        { text: "C", value: "C" },
      ],
    };
  },
  components: {
    VHeader,
    VTitle,
    VShopList,
  },
  created() {
    let { title } = this.$route.query;
    // console.log(title);
    this.title = title;
    this.getModes();
    this.getAttributesList();
    this.getCategorys();
    this.getShopsList();
  },
  methods: {
    onClickLeft() {
      // 返回上一页
      this.$router.go(-1);
    },
    onConfirm() {
      this.$refs.item.toggle();
    },
    // 点击每一项
    handleItem(id) {
      console.log(id);
    },
    // 获取配送方式
    getModes() {
      api.food
        .getDeliveryModes({
          latitude: "",
          longitude: "",
        })
        .then((res) => {
          this.modes = res;
        });
    },
    // 获取商家属性
    getAttributesList() {
      api.food
        .getAttributes({
          latitude: "",
          longitude: "",
        })
        .then((res) => {
          this.attributes = res;
        });
    },
    // 获取商铺分类
    getCategorys() {
      api.food
        .getCategory({
          latitude: "",
          longitude: "",
        })
        .then((res) => {
          this.categoryList = res;
        });
    },
    // 获取商铺列表
    getShopsList() {
      let geohash = localStorage.getItem("geohash");
      let _geohash = geohash.split(",");
      // console.log(_geohash)
      api.home
        .getShopList({
          latitude: _geohash[0],
          longitude: _geohash[1],
          offset: 0,
          limit: 20,
          restaurant_category_id: "",
          order_by: "",
          delivery_mode: [],
          support_ids: [],
          restaurant_category_ids: [],
        })
        .then((res) => {
          this.shopList = res;
        });
    },
  },
};
</script>

<style lang='less' scoped>
.food-page {
  position: relative;
  padding-top: 30px;
  .tools {
    width: 100%;
    position: fixed;
    z-index: 4444;
    left: 0;
    top: 46px;
    /deep/.van-dropdown-menu__bar {
      height: 30px;
    }
    .ml10 {
      margin-left: 10px;
    }
    .attributes {
      margin-left: 5px;
      .ml5 {
        margin-left: 5px;
      }
    }
    .btns {
      //    border-top: 10px solid #eee;
      background-color: #eee;
      padding: 6px;
      //    display: flex;
      //    justify-content: space-between;
      button {
        width: 49%;
      }
    }
  }
}
</style>