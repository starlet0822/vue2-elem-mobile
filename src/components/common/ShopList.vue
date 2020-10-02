<template>
  <!-- 店铺列表 -->
  <section class="shop-list">
    <div class="shop-item df" v-for="item in data" :key="item.id">
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      shopList: [],
    };
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  methods: {
    // 点击每一项
  },
};
</script>

<style lang='less' scoped>
.shop-list {
  padding: 5px;
  background-color: #fff;
  .shop-item {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    .shop-img {
      // flex: 1;
      width: 54px;
      height: 54px;
      margin-right: 0.6rem;
    }
  }
  .shop-info {
    flex: 1;
    // flex: 3;
    justify-content: space-between;
  }
  .shop-info-t {
    .shop-name-wrap {
      .shop-name {
        width: 8rem;
        margin-left: 5px;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
  .shop-info-m {
    .shop-rate {
      margin: 12px 0;
      color: #ff9a0d;
      /deep/ .van-rate__item:not(:last-child) {
        padding-right: 2px;
      }
      .month-sale {
        font-size: 12px;
        color: #666;
        //  margin-bottom: -4px;
      }
    }
    /deep/ .van-tag {
      // line-height: 0;
      font-size: 10px;
      padding: 0 2px;
    }
  }
  .shop-info-b {
    color: #666;
    font-size: 12px;
    .delivery-cost {
      // width: 100px;
      margin-right: 5px;
      font-size: 12px;
    }
    .time-wrap {
      color: #666;
      .time {
        color: var(--themeColor);
        font-size: 12px;
      }
    }
  }
}
</style>