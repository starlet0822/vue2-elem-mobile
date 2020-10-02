<template>
  <div class="address">
    <!-- 头部 -->
    <v-header
      title="地址列表"
      left_icon="arrow-left"
      @handleclickleft="onClickLeft"
    ></v-header>
    <!-- 地址列表 -->
    <section class="address-list">
      <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        @add="onAdd"
        @edit="onEdit"
      />
    </section>
    <!-- 空 -->
    <van-empty
      v-if="!addressList.length"
      description="暂无地址哦！"
    ></van-empty>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
import api from "../../api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      chosenAddressId: "",
      addressList: [],
    };
  },
  created() {
    this.getAddressList();
  },
  computed: {
    ...mapState(["address"]),
  },
  components: {
    VHeader,
  },
  methods: {
    onClickLeft() {
      // 返回我的
      this.$router.push({ path: "/my/info" });
    },
    // 获取收货地址列表
    getAddressList() {
      let user_id = localStorage.getItem("user_id");
      api.address
        .addressesList({
          user_id,
        })
        .then((res) => {
          // TODO:递归深拷贝修改字段名
          // let address = JSON.parse(JSON.stringify(res).replace(/phone/,'tel').replace(/is_user_default/,'isDefault'))

          let temp = res.map((v) => {
            return {
              id: v.id,
              name: v.name,
              tel: v.phone,
              address: v.address,
              isDefault: v.is_user_default,
            };
          });
          this.addressList = temp;
          this.chosenAddressId = this.addressList[0].id;
        });
    },
    onAdd() {
      // 清空输入框
      this.address.keyword = "";
      this.$router.push({ path: "/my/info/address/add" });
    },
    onEdit(item, index) {
      // console.log("编辑地址:" + item.id);
      let user_id = localStorage.getItem("user_id");
      let address_id = item.id;
      this.$dialog
        .confirm({
          title: "编辑地址",
          message: "是否删除该地址？",
        })
        .then(() => {
          api.address
            .removeAddress({
              user_id,
              address_id,
            })
            .then((res) => {
              if (res.status) {
                // this.$toast.success({message:res.success});
                window.location.reload(); // 重新刷新页面
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang='less' scoped>
.address {
  .address-list {
    .van-address-list {
      padding: 10px;
    }
  }
}
</style>