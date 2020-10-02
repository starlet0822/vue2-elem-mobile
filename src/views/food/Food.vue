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
      <van-dropdown-menu active-color="#1989fa">
        <!-- 分类 -->
        <van-dropdown-item title="分类" ref="item">
          <section class="category-con df">
            <!-- 左侧菜单项 -->
            <van-sidebar v-model="activeKey">
              <van-sidebar-item
                :badge="item.count"
                v-for="item in categoryList"
                :key="item.id"
              >
                <template #title>
                  <van-icon
                    size="20"
                    :name="'https://fuss10.elemecdn.com/' + item.image_url"
                  />
                  <span class="item-name">{{ item.name }}</span>
                </template>
              </van-sidebar-item>
            </van-sidebar>
            <!-- 右侧内容 -->
            <div class="right-con">
              <van-cell-group>
                <template
                  v-for="(item2, index) in categoryList[activeKey]
                    .sub_categories"
                >
                  <van-cell
                    v-if="index !== 0"
                    :title="item2.name"
                    :value="item2.count"
                    :key="item2.id"
                  />
                </template>
              </van-cell-group>
            </div>
          </section>
        </van-dropdown-item>
        <!-- 排序 -->
        <van-dropdown-item title="排序" ref="item">
          <van-cell
            :title="item.title"
            v-for="item in orderbyList"
            :key="item.id"
            @click="handleItem(item.id)"
          >
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #icon>
              <van-icon
                :name="item.icon"
                :color="item.color"
                class="item-icon"
              />
            </template>
          </van-cell>
        </van-dropdown-item>
        <!-- 筛选 -->
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
      activeKey: 0,
      //   items: [{ text: "分组 1" }, { text: "分组 2" }],
      orderbyList: [
        {
          id: 4,
          title: "智能排序",
          icon: "exchange",
          color: "#3190e8",
        },
        {
          id: 5,
          title: "距离最近",
          icon: "location-o",
          color: "#97cee9",
        },
        {
          id: 6,
          title: "销量最高",
          icon: "fire-o",
          color: "#f5acac",
        },
        {
          id: 1,
          title: "起送价最低",
          icon: "gold-coin-o",
          color: "#e9bf3a",
        },
        {
          id: 2,
          title: "配送速度最快",
          icon: "clock-o",
          color: "#9be3db",
        },
        {
          id: 3,
          title: "评分最高",
          icon: "star-o",
          color: "#f2c683",
        },
      ],

      switch1: false,
      switch2: false,

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
  computed: {
    subCategories() {
      return this.categoryList[this.activeKey].sub_categories.splice(0, 1);
    },
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
    z-index: 99;
    left: 0;
    top: 46px;
    .category-con {
      font-size: 12px;
      height: 360px;
      overflow: hidden;
      .van-sidebar {
        flex: 1;
        // width: 50vw;
        .van-sidebar-item {
          padding: 10px;
        }
        .van-sidebar-item--select::before {
          background-color: var(--themeColor);
        }
        /deep/.van-sidebar-item__text {
          display: flex;
          align-items: center;
          .item-name {
            margin-left: 0.6rem;
            line-height: 20px;
          }
          .van-info {
            right: 20px;
            background-color: var(--themeColor);
          }
        }
      }
      .right-con {
        flex: 1;
        //   width: 50vw;
        overflow: auto;
        .van-cell {
          padding: 8px;
        }
      }
    }
    .item-icon {
      font-size: 16px;
      margin-right: 0.5rem;
      line-height: inherit;
    }
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