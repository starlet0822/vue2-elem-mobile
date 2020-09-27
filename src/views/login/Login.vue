<template>
  <div class="login-page">
    <!-- 头部 -->
    <v-header
      title="密码登录"
      left_icon="arrow-left"
      @handleclickleft="onClickLeft"
    ></v-header>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
        required
        :rules="[{ required: true, message: '请填写账号' }]"
        v-model="userForm.username"
        name="username"
        placeholder="账号"
      />
      <van-field
        required
        :rules="[{ required: true, message: '请填写密码' }]"
        v-model="userForm.password"
        :type="isSHowPwd ? 'text' : 'password'"
        name="password"
        placeholder="密码"
      >
        <template #button>
          <van-icon
            size="24"
            :name="!isSHowPwd ? 'closed-eye' : 'browsing-history-o'"
            @click="onEyeFn"
          />
        </template>
      </van-field>
      <van-field
        required
        :rules="[{ required: true, message: '请填写验证码' }]"
        name="captcha_code"
        v-model="userForm.captchasCode"
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
      <div class="tips">
        <p class="login_tips">温馨提示：未注册过的账号，登录时将自动注册</p>
        <p class="login_tips">注册过的用户可凭账号密码登录</p>
      </div>
      <div style="margin: 16px">
        <van-button size="small" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <p class="reset" @click="resetFn">重置密码？</p>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
import api from "../../api";

export default {
  data() {
    return {
      userForm: {
        username: "",
        password: "",
        captchasCode: "",
      },
      captchasCodeImg: null,
      isSHowPwd: false,
    };
  },
  components: {
    VHeader,
  },
  created() {
    this.getUserInfoFn();
    this.getCaptchasFn();
  },

  methods: {
    onClickLeft() {
      // 返回上一页
      this.$router.go(-1);
    },
    getUserInfoFn() {
      api.user
        .getUserInfo({
          user_id: "",
        })
        .then((res) => {});
    },
    // 获取验证码
    getCaptchasFn() {
      api.user.getCaptchas({}).then((res) => {
        this.captchasCodeImg = res.code;
        // let str = res.code.split(',')
        // console.log(str[1])
        
        // var p_name = window.atob(str[1].replace('-','+').replace('_','/'));

       let p_name = decodeURIComponent(window.atob(res.code));
        console.log(p_name, "还原===》");

        // 设置 cookie
        document.cookie = `cap = ${this.captchasCodeImg}222`;
      });
    },
    // 刷新验证码
    refreshCode() {
      this.getCaptchasFn();
    },

    // 是否显示密码
    onEyeFn() {
      this.isSHowPwd = !this.isSHowPwd;
    },

    resetFn() {
      this.$router.push({ path: "/forget" });
    },

    // 登录事件
    onSubmit(userform) {
      console.log(userform);
      // TODO:登录验证码失效
      api.user.accountLogin(userform).then((res) => {});
    },
  },
};
</script>

<style lang='less' scoped>
.login-page {
  /deep/.tips {
    font-size: 12px;
    .login_tips {
      color: red;
      padding: 5px 10px;
    }
  }

  /deep/.van-field__button {
    display: flex;
    justify-content: space-between;
  }

  .imgcode {
    width: 50%;
  }
  .reset {
    font-size: 12px;
    color: #3190e8;
    text-align: right;
    padding-right: 10px;
  }
}
</style>