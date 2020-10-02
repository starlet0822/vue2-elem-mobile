<template>
  <div class="add-detail">
    <!-- 头部 -->
    <v-header
      title="搜索地址"
      left_icon="arrow-left"
      @handleclickleft="onClickLeft"
    ></v-header>
    <!-- 搜索框 -->
    <van-field
      @input="handleChange"
      v-model="address.keyword"
      name="keyword"
      placeholder="请输入小区/写字楼/学校等"
    >
      <template #button>
        <van-button size="small" type="info" @click="handleSubmit"
          >确定</van-button
        >
      </template>
    </van-field>
    <!-- 提示语 -->
    <div class="tips">为了满足商家的送餐要求，建议您从列表中选择地址</div>

    <!-- 地址列表 -->
    <section class="pois-wrap">
      <ul class="pois-list">
        <li
          class="list-item"
          v-for="(item, index) in poisList"
          :key="index"
          @click="handleClickItem(item)"
        >
          <p class="pois-name">{{ item.name }}</p>
          <p class="pois-desc ellipsis">{{ item.address }}</p>
        </li>
      </ul>
    </section>
    <!-- 没有数据 -->
    <section class="nothing">
      <p>找不到地址？</p>
      <p>请尝试输入小区、写字楼或学校名</p>
      <p>详细地址（如门牌号）可稍后输入哦。</p>
    </section>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
import api from "../../api";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      keyword: "",
      poisList: [],
    };
  },
  computed: {
    ...mapState(["address"]),
  },
  components: {
    VHeader,
  },
  methods: {
    ...mapMutations(["SET_KEYWORD"]),
    onClickLeft() {
      // 返回上一页
      this.$router.go(-1);
    },
    // 监听输入框内容变化
    handleChange(value) {
      // console.log(value)
      //   this.keyword = value;
      this.SET_KEYWORD(value);
    },
    // 提交表单
    handleSubmit() {
      api.pois
        .getPois({
          type: "nearby",
          keyword: this.address.keyword,
        })
        .then((res) => {
          this.poisList = res;
        });
    },
    // 点击每一项
    handleClickItem(item) {
      // console.log(item)
      this.SET_KEYWORD(item.name);
    //   this.keyword = item.name;
      this.$router.push({
        path: "/my/info/address/add"
      });
    },
  },
};
</script>

<style lang='less' scoped>
.add-detail {
  position: relative;
  height: 100%;
  .tips {
    padding: 5px;
    color: #f56723;
    font-size: 12px;
    line-height: 1.2;
    text-align: center;
    background-color: #fff7cc;
  }
  .pois-wrap {
    .pois-list {
      .list-item {
        padding: 12px;
        font-size: 12px;
        border-top: 1px solid #ccc;
        .pois-name {
        }
        .pois-desc {
          color: #999;
          margin-top: 10px;
        }
      }
    }
    .clear-all {
      border-top: 1px solid #ccc;
      padding-top: 8px;
    }
  }
  .nothing {
    width: 100%;
    text-align: center;
    line-height: 2;
    color: #999;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>