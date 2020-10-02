<template>
  <div class="city-search">
    <v-header
      :title="cityObj.name"
      left_text=""
      right_text="切换城市"
      left_icon="arrow-left"
      right_icon=""
      @handleclickleft="onClickLeft"
      @handleclickright="onClickRight"
    ></v-header>
   
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="keyword"
        name="keyword"
        placeholder="输入学校、商务楼、地址"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" size="small">
          提交
        </van-button>
      </div>
    </van-form>
    <!-- 历史记录 -->
    <section class="search-history" v-show="poisList.length == 0">
      <v-title text="搜索历史"></v-title>
      <!-- <ul class="search-list">
            <li class="list-item" v-for="(item,index) in 3" :key="index">
                <p class="pois-name">22</p>
                <p class="pois-desc ellipsis">22</p>
            </li>
        </ul> -->
      <!-- <div class="clear-all df-row">
            <van-button type="danger" size="small">清除所有</van-button>
        </div> -->
    </section>
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
    <!--  -->
  </div>
</template>

<script>
import api from "../../api";
import VHeader from "@/components/VHeader";
import VTitle from "@/components/VTitle";

export default {
  data() {
    return {
      cityObj: {},
      city_id: "",
      keyword: "",
      poisList: [],
    };
  },
  components: {
    VHeader,
    VTitle,
  },
  created() {
    let id = this.$route.params.city_id;
    console.log(id);
    this.getCity(id);
  },
  methods: {
    onSubmit(values) {
      //   console.log('submit', values);
      let { keyword } = values;
      let city_id = this.city_id;
      // 搜索地址
      api.pois
        .getPois({
          city_id,
          keyword,
          type: "search",
        })
        .then((res) => {
          // console.log(res)
          this.poisList = res;
        });
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {},
    // 点击 地址
    handleClickItem(item) {
      // 获取当前点击地址的经纬度
      let { longitude, latitude } = item;
      let geohash = latitude+','+longitude; // 拼接成字符串
      // console.log("geohash", geohash);
      // 跳转到 misite 页面
      this.$router.push({ path: "/home", query: { geohash } });
    },
    // 获取 城市定位
    getCity(id) {
      api.cities.getCity({ id }).then((res) => {
        // console.log(res);
        this.cityObj = res;
        this.city_id = res.id;
      });
    },
  },
};
</script>

<style lang='less' scoped>
.city-search {
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
}
</style>