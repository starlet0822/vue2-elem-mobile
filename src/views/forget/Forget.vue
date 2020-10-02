<template>
  <div class="forget-page">
    <!-- 头部 -->
    <v-header
      title="重置密码"
      left_icon="arrow-left"
      @handleclickleft="onClickLeft"
    ></v-header>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
        required
        :rules="[{ required: true, message: '请填写账号' }]"
        v-model="resetForm.username"
        name="username"
        placeholder="账号"
      />
      <van-field
        required
        :rules="[{ required: true, message: '请填写旧密码' }]"
        v-model="resetForm.oldpassWord"
        name="oldpassWord"
        placeholder="旧密码"
      />
      <van-field
        required
        :rules="[{ required: true, message: '请填写新密码' }]"
        v-model="resetForm.newpassword"
        name="newpassword"
        placeholder="请输入新密码"
      />
      <van-field
        required
        :rules="[{ required: true, message: '请填写新密码' }]"
        v-model="resetForm.confirmpassword"
        name="confirmpassword"
        placeholder="请确认密码"
      />
      <van-field
        required
        :rules="[{ required: true, message: '请填写验证码' }]"
        name="captcha_code"
        v-model="resetForm.captchasCode"
        placeholder="验证码"
      >
        <template #button>
          <img :src="captchasCodeImg" class="imgcode" @click="refreshCode" />
          <van-button
            type="info"
            size="small"
            native-type="button"
            @click="refreshCode"
            >看不清<br />换一张</van-button
          >
        </template>
      </van-field>

      <!-- 提交按钮 -->
      <div style="margin: 16px">
        <van-button size="small" block type="info" native-type="submit">
          确认修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
import api from "../../api";

export default {
  data() {
    return {
      // userInfo:{},
      resetForm: {
        username: null,
        oldpassWord: null,
        newpassword: null,
        confirmpassword: null,
        captchasCode: null,
      },
      captchasCodeImg: null,
    };
  },
  components: {
    VHeader,
  },
  created() {
    this.getUserInfoFn();
    this.getCaptchasFn();
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo) == null ? {} : JSON.parse(userInfo);
    // console.log(this.userInfo);
    this.resetForm.username = userInfo.username;
  },
  methods: {
    onClickLeft() {
      // 返回上一页
      this.$router.go(-1);
    },
    // 获取用户信息
    getUserInfoFn() {
      api.user
        .getUserInfo({
          user_id: null,
        })
        .then((res) => {});
    },
    // 获取验证码
    getCaptchasFn() {
      api.user.getCaptchas({}).then((res) => {
        this.captchasCodeImg = res.code;
      });
    },
    // 刷新验证码
    refreshCode() {
      this.getCaptchasFn();
    },
    // 登录事件
    onSubmit(resetForm) {
      console.log(resetForm);
      // TODO:验证码失效
      api.user.changePassword(resetForm).then((res) => {
        if (!res.status) {
          // 失败
          this.$toast.fail(res.message);
          this.refreshCode();
          return;
        }
        // 成功
        this.$toast.success(res.success);
        this.$router.go(-1);
      });
    },
  },
};
</script>

<style lang='less' scoped>
.forget-page {
  /deep/.van-field__button {
    display: flex;
    justify-content: space-between;
    .imgcode {
      width: 50%;
    }
  }
}
</style>