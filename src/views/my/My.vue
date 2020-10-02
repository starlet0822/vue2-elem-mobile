<template>
  <div class="my-page">
    <!-- 头部 -->
    <v-header
      title="我的"
      left_text=""
      right_text=""
      left_icon="arrow-left"
      right_icon=""
      @handleclickleft="onClickLeft"
    ></v-header>
    <!-- 用户信息 -->
    <div class="user-wrap df">
      <div class="user-avatar">
        <img
          :src="
            userInfo.avatar
              ? 'http://elm.cangdu.org/img/'+userInfo.avatar
              : '~@/assets/images/base.jpg'
          "
          alt=""
        />
      </div>
      <div class="user-info df-sb">
        <section>
          <div class="user-nickNname" v-if="userInfo.username" @click="handleInfo">
            {{ userInfo.username }}
          </div>
          <div class="user-nickNname" v-else @click="loginFn">登录 / 注册</div>
          <div class="user-telphone df-sb">
            <van-icon name="phone-o" />
            <span>暂无绑定手机号码</span>
          </div>
        </section>
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 工具 -->
    <van-grid :border="false" :column-num="3">
      <van-grid-item>
        <div class="item df-col">
          <div class="balance fs24">{{ userInfo.balance || 0 }}<i>元</i></div>
          <div class="pt12">我的余额</div>
        </div>
      </van-grid-item>
      <van-grid-item>
        <div class="item df-col">
          <div class="gift_amount fs24">
            {{ userInfo.gift_amount || 0 }}<i>个</i>
          </div>
          <div class="pt12">我的优惠</div>
        </div>
      </van-grid-item>
      <van-grid-item>
        <div class="item df-col">
          <div class="point fs24">{{ userInfo.point || 0 }}<i>分</i></div>
          <div class="pt8">我的积分</div>
        </div>
      </van-grid-item>
    </van-grid>
    <!-- 功能列表 -->
    <section class="lists">
      <van-cell
        :title="item.title"
        :icon="item.icon"
        v-for="item in lists"
        :key="item.id"
        is-link
        :to="item.to"
      >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon :name="item.name" class="arrow-icon" />
        </template>
      </van-cell>
    </section>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";

export default {
  data() {
    return {
      userInfo: {},
      lists: [
        {
          id: 1,
          title: "我的订单",
          icon: "orders-o",
          name: "arrow",
          to: "/order",
        },
        { id: 2, title: "积分商城", icon: "bag-o", name: "arrow", to: "/" },
        {
          id: 3,
          title: "饿了么会员卡",
          icon: "vip-card-o",
          name: "arrow",
          to: "/vipcard",
        },
        { id: 4, title: "服务中心", icon: "service-o", name: "arrow", to: "/" },
        { id: 6, title: "下载饿了么APP", icon: "scan", name: "arrow", to: "/" },
      ],
    };
  },
  created() {
    let userInfo = localStorage.getItem("userInfo");
    // console.log(userInfo);
    this.userInfo = JSON.parse(userInfo) == null ? {} : JSON.parse(userInfo);
  },
  computed: {},
  components: {
    VHeader,
  },
  methods: {
    onClickLeft() {
      // 返回上一页
      this.$router.go(-1);
    },
    loginFn() {
      this.$router.push({ path: "/login" });
    },
    // 进入用户详情页
    handleInfo(){
      // console.log('ss')
      this.$router.push({ path: "/my/info" });
    }
  },
};
</script>

<style lang='less' scoped>
.my-page {
  .user-wrap {
    background-color: #3190e8;
    color: #fff;
    padding: 14px;
    align-items: center;
    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      // border: 1px solid #000;
      overflow: hidden;
      margin-right: 14px;
    }
    .user-info {
      flex: 1;
      .user-nickNname {
        font-weight: 600;
      }
      .user-telphone {
        font-size: 12px;
        padding-top: 6px;
        > span {
          margin-left: 0.2rem;
        }
      }
    }
  }
  /deep/.van-grid-item__content {
    padding: 8px;
  }
  .item {
    align-items: center;
    font-size: 12px;
    .fs24 {
      font-weight: 666;
      font-size: 24px;
      i {
        font-size: 12px;
        font-weight: normal;
        color: #000;
      }
    }
    .balance {
      color: #ff9919;
    }
    .gift_amount {
      color: #ff5f3e;
    }
    .point {
      color: #6ac20b;
    }
    .pt12 {
      padding-top: 8px;
    }
  }
  .lists {
    // overflow: hidden;
    border-top: 10px solid #f5f5f5;
    border-bottom: 10px solid #f5f5f5;
    .custom-title {
      margin-right: 4px;
      vertical-align: middle;
    }

    .arrow-icon {
      font-size: 16px;
      line-height: inherit;
    }
  }
}
</style>