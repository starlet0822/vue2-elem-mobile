<template>
  <div class="address-add">
    <!-- 头部 -->
    <v-header
      title="新增地址"
      left_icon="arrow-left"
      @handleclickleft="onClickLeft"
    ></v-header>
    <!-- 新增表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="addressForm.name"
        name="name"
        placeholder="请填写你的姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        @click="handleClick"
        v-model="address.keyword"
        name="address"
        placeholder="小区/写字楼/学校等"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="addressForm.address_detail"
        name="address_detail"
        placeholder="请填写详细送餐地址"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="addressForm.phone"
        name="phone"
        placeholder="请填写联系方式"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="addressForm.phone_bk"
        name="phone_bk"
        placeholder="备用联系方式（选填）"
      />
      <div style="margin: 16px">
        <van-button size="small" block type="info" native-type="submit">
          新增地址
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
import api from "../../api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      addressForm: {
        user_id: "",
        name: "",
        address: "",
        address_detail: "",
        phone: "",
        phone_bk: "",
        geohash: "",
        tag: "",
        sex: 1,
        poi_type: 0,
        tag_type: 2,
      },
    };
  },
  computed: {
    ...mapState(["address"]),
  },

  components: {
    VHeader,
  },
  methods: {
    onClickLeft() {
      // 返回上一页
      this.$router.go(-1);
    },
    handleClick() {
      // 跳转到搜索地址
      this.$router.push({ path: "/my/info/address/add/addDetail" });
    },
    // 表单提交
    onSubmit(values) {
      console.log("submit", values);
      let formObj = {
        user_id: localStorage.getItem("user_id"),
        ...values,
        geohash: "23.124901,113.361601",
        tag: "公司",
        sex: 1,
        poi_type: 0,
        tag_type: 4,
      };
      // 发送请求
      api.address.addAddress(formObj).then((res) => {
        if (!res.status) {
          this.$toast.fail(res.message);
          return;
        }
        // 添加成功则跳转
        this.$router.push({ path: "/my/info/address" });
      });
    },
  },
};
</script>

<style>
</style>