<template>
  <div class="userInfo">
    <!-- 头部 -->
    <v-header
      title="账号信息"
      left_icon="arrow-left"
      @handleclickleft="onClickLeft"
    ></v-header>
    <!-- 信息 -->
    <section>
      <van-cell is-link class="user-avatar-wrap">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">头像</span>
        </template>
        <template #default>
          <img
            class="user-avatar"
            :src="
              userInfo.avatar
                ? 'http://elm.cangdu.org/img/' + userInfo.avatar
                : '../../assets/images/base.jpg'
            "
            alt="头像"
          />
        </template>
      </van-cell>
      <van-cell title="用户名" is-link :value="userInfo.username" />
      <van-cell title="收货地址" is-link to="/my/info/address" />
      <v-title text="账号绑定"></v-title>
      <van-cell title="手机" icon="phone-circle-o" is-link />
      <v-title text="安全设置"></v-title>
      <van-cell title="登录密码" is-link to="/forget" value="修改" />
    </section>

    <!-- 退出登录 -->
    <div style="margin: 16px">
      <van-button size="small" block type="danger" @click="logoutFn">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
import VTitle from "@/components/VTitle";
import api from '../../api'

export default {
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    let userInfo = localStorage.getItem("userInfo");
    // console.log(userInfo);
    this.userInfo = JSON.parse(userInfo) == null ? {} : JSON.parse(userInfo);
  },
  components: {
    VHeader,
    VTitle,
  },
  methods: {
    onClickLeft() {
      // 返回上一页
      this.$router.go(-1);
    },
    // 退出登录
    logoutFn() {
      this.$dialog
        .confirm({
        //   title: "标题",
          message: "是否退出登录？",
        })
        .then(() => {
          // 确定
          api.user.logout().then(res=>{
              res.status ===0 && this.$toast.success('退出成功');
              // 清除缓存
              localStorage.clear()
              this.$router.push({path:'/my'})
          })
        })
        .catch(() => {
          // 取消
        });
    },

    // 修改密码

    
  },
};
</script>

<style lang='less' scoped>
.userInfo {
  .user-avatar-wrap {
    // display: flex;
    align-items: center;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      // border: 1px solid #000;
      overflow: hidden;
      display: inline-block;
    }
  }
}
</style>