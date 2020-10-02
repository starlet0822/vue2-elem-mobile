<template>
  <div class="misite-page">
    <v-header
      :title="poisObj.name"
      left_text=""
      right_text=""
      left_icon="search"
      right_icon="user-o"
      @handleclickleft="onClickLeft"
      @handleclickright="onClickRight"
    ></v-header>
    <!-- 分类导航 -->
    <van-swipe>
      <van-swipe-item v-for="(item, index) in cateObj" :key="index">
        <van-grid :column-num="4">
          <van-grid-item
            v-for="value in item"
            :key="value.id"
            :icon="'https://fuss10.elemecdn.com' + value.image_url"
            :text="value.title"
            @click="handleItem(value)"
          />
        </van-grid>
      </van-swipe-item>
    </van-swipe>
    <!-- 店铺标题 -->
    <div class="shop-title df">
      <van-icon name="shop-o" />
      <v-title text="附近商家"></v-title>
    </div>
    <!-- 店铺列表 -->
    <!-- <section class="shop-list">
      <div class="shop-item df" v-for="item in shopList" :key="item.id">
        <div class="shop-img">
          <img :src="'https://elm.cangdu.org/img/' + item.image_path" />
        </div>
        <div class="shop-info df-col">
          <div class="shop-info-t df-sb">
            <div class="shop-name-wrap df">
              <van-tag type="primary" color="#ffd930" text-color="#000"
                >品牌</van-tag
              >
              <h5 class="shop-name ellipsis">{{ item.name }}</h5>
            </div>
            <div class="tag-group df">
              <van-tag
                plain
                type="primary"
                color="#ccc"
                v-for="item2 in item.supports"
                :key="item2.id"
                >{{ item2.icon_name }}</van-tag
              >
            </div>
          </div>
          <div class="shop-info-m df-sb">
            <div class="shop-rate">
              <van-rate
                readonly
                v-model="item.rating"
                :size="10"
                color="#ff9a0d"
                void-icon="star"
                void-color="#eee"
              />&nbsp;{{ item.rating }}
              <span class="month-sale">月售{{ item.recent_order_num }}单</span>
            </div>
            <div class="shop-tips">
              <van-tag type="primary">蜂鸟专送</van-tag>
              <van-tag plain type="primary">准时达</van-tag>
            </div>
          </div>
          <div class="shop-info-b df-sb">
            <div class="delivery-cost">
              ￥{{ item.float_minimum_order_amount }}起送&nbsp;/&nbsp;{{
                item.piecewise_agent_fee.tips
              }}
            </div>
            <div class="time-wrap">
              <p>
                {{ item.distance }}&nbsp;/&nbsp;<span class="time">{{
                  item.order_lead_time
                }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <v-shop-list :data="shopList"></v-shop-list>
  </div>
</template>

<script>
import api from "../../api";
import VHeader from "@/components/VHeader.vue";
import VTitle from "@/components/VTitle";
import VShopList from "@/components/common/ShopList";

export default {
  data() {
    return {
      geohash: "",
      poisObj: {},
      cateObj: {},
      value: 4,
      shopList: [],
    };
  },
  components: {
    VTitle,
    VHeader,
    VShopList,
  },
  created() {
    let { geohash } = this.$route.query;
    // console.log(geohash);
    this.geohash = geohash;

    localStorage.setItem("geohash", this.geohash);
    // let _geohash = `${geohash.latitude},${geohash.longitude}`
    this.getPoisGeohash(this.geohash);
    this.getIndexEntryList();
    this.getShopsList();
  },
  methods: {
    onClickLeft() {
      // 自身重载刷新
      this.$router.push({ path: "/search" });
    },
    onClickRight() {
      // 跳转到我的页面
      this.$router.push({ path: "/my" });
    },

    // 获取地址经纬度
    getPoisGeohash(geohash) {
      api.pois.getGeohash({ geohash }).then((res) => {
        this.poisObj = res;
      });
    },
    // 获取食品分类数据
    getIndexEntryList() {
      api.home.getIndexEntry().then((res) => {
        // TODO:处理成两半？？
        let cateList = [...res];
        let half = Math.ceil(cateList.length / 2);
        let firstArr = cateList.splice(0, half);
        let secondArr = cateList.splice(-half);
        this.cateObj = { firstArr, secondArr };
        console.log(this.cateObj);
      });
    },
    // 获取商铺列表
    getShopsList() {
      let _geohash = this.geohash.split(",");
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
    // // 点击每一项
    handleItem(item) {
      console.log(item);
      let geohash = localStorage.getItem("geohash");
      this.$router.push({
        path: "/food",
        query: { geohash, title: item.title, restaurant_category_id: 239 },
      });
    },
  },
};
</script>

<style lang='less' scoped>
.misite-page {
  /deep/ .van-swipe__indicators {
    bottom: 6px;
    .van-swipe__indicator.van-swipe__indicator--active {
      background-color: #1989fa;
    }
    .van-swipe__indicator {
      background-color: #666;
      width: 8px;
      height: 8px;
    }
  }

  .shop-title {
    align-items: center;
    padding-left: 5px;
    color: #999;
    h4 {
      padding-left: 5px;
      color: #999;
    }
  }
  // .shop-list {
  //   padding: 5px;
  //   .shop-item {
  //     padding: 10px 0;
  //     border-bottom: 1px solid #eee;
  //     .shop-img {
  //       // flex: 1;
  //       width: 54px;
  //       height: 54px;
  //       margin-right: 0.6rem;
  //     }
  //   }
  //   .shop-info {
  //     flex: 1;
  //     // flex: 3;
  //     justify-content: space-between;
  //   }
  //   .shop-info-t {
  //     .shop-name-wrap {
  //       .shop-name {
  //         width: 8rem;
  //         margin-left: 5px;
  //         font-size: 14px;
  //         font-weight: 600;
  //       }
  //     }
  //   }
  //   .shop-info-m {
  //     .shop-rate {
  //       margin: 12px 0;
  //       color: #ff9a0d;
  //       /deep/ .van-rate__item:not(:last-child) {
  //         padding-right: 2px;
  //       }
  //       .month-sale {
  //         font-size: 12px;
  //         color: #666;
  //         //  margin-bottom: -4px;
  //       }
  //     }
  //     /deep/ .van-tag {
  //       // line-height: 0;
  //       font-size: 10px;
  //       padding: 0 2px;
  //     }
  //   }
  //   .shop-info-b {
  //     color: #666;
  //     font-size: 12px;
  //     .delivery-cost {
  //       // width: 100px;
  //       margin-right: 5px;
  //       font-size: 12px;
  //     }
  //     .time-wrap {
  //       color: #666;
  //       .time {
  //         color: var(--themeColor);
  //         font-size: 12px;
  //       }
  //     }
  //   }
  // }
}
</style>