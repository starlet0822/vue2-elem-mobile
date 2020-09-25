<template>
  <div class="cities-list">
    <v-nav-bar></v-nav-bar>
    <div class="city-tip df">
      <div>当前定位城市:</div>
      <div>定位不准时，请在城市列表中选择</div>
    </div>
    <div class="city-row df">
      <span class="city-name">{{ curcities.name }}</span>
      <span>
        <van-icon name="arrow" />
      </span>
    </div>
    <!-- 热门城市 -->
    <section class="city-hot">
      <!-- <h4 class="title">热门城市</h4> -->
      <v-title text="热门城市"></v-title>
      <van-grid :column-num="4">
        <van-grid-item
          v-for="value in citiesHot"
          :key="value.id"
          :text="value.name"
        />
      </van-grid>
    </section>
    <!-- 城市组 -->
    <div class="city-group">
      <section
        class="city-item"
        v-for="(item, key, index) in sortgroupcity"
        :key="key"
      >
        <!-- <h4 class="title">A（按字母排序）</h4> -->
        <!-- TODO:如何做到只需要绑定一个自定义属性 -->
        <v-title
          :text="key"
          :sort="index === 0 ? '（按字母排序）' : ''"
        ></v-title>
        <van-grid :column-num="4">
          <van-grid-item
            v-for="value in item"
            :key="value.id"
            :text="value.name"
            class="ellipsis"
          />
        </van-grid>
      </section>
    </div>
  </div>
</template>

<script>
import api from "../../api";
import VNavBar from "@/components/VNavBar";
import VTitle from "@/components/VTitle";

export default {
  data() {
    return {
      curcities: {},
      citiesHot: [],
      citiesGroup: {},
    };
  },
  components: {
    VNavBar,
    VTitle,
  },
  computed: {
    //将获取的数据按照A-Z字母开头排序
    sortgroupcity() {
      let sortobj = {};
      for (let i = 65; i <= 90; i++) {
        if (this.citiesGroup[String.fromCharCode(i)]) {
          sortobj[String.fromCharCode(i)] = this.citiesGroup[
            String.fromCharCode(i)
          ];
        }
      }
      return sortobj;
    },
  },
  created() {
    this.getcitiesList();
    this.getcitiesHot();
    this.getcitiesGroup();
  },
  methods: {
    getcitiesList() {
      api.cities.getCities({ type: "guess" }).then((res) => {
        // console.log(res);
        this.curcities = res;
      });
    },
    // 获取热门城市
    getcitiesHot() {
      api.cities.getCitiesHot({ type: "hot" }).then((res) => {
        this.citiesHot = res;
      });
    },
    getcitiesGroup() {
      api.cities.getCitiesGroup({ type: "group" }).then((res) => {
        this.citiesGroup = res;
      });
    },
  },
};
</script>

<style lang='less' scoped>
.cities-list {
  background-color: #eee;
  .city-tip {
    padding: 10px;
    font-size: 12px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    &:last-child {
      color: #999;
    }
  }
  .city-row {
    padding: 10px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    .city-name {
      color: #3190e8;
    }
  }
  .city-hot {
    background-color: #fff;
    margin: 10px 0;
    /deep/ .van-grid-item__content {
      padding: 8px;
    }
    /deep/ [class*="van-hairline"]::after {
      border-color: #999;
    }
    /deep/ .van-grid-item__text {
      color: #3190e8;
    }
  }
  .city-item {
    background-color: #fff;
    margin-bottom: 10px;
    /deep/ .van-grid-item__content {
      padding: 8px;
    }
    /deep/ [class*="van-hairline"]::after {
      border-color: #999;
    }
    /* TODO:文字超出隐藏未实现 */
    /deep/ .van-grid-item__content {
      display: block;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
  }
}
</style>