<template>
  <div class="food-page">
    <!-- 头部 -->
    <v-header
      :title="title"
      left_icon="arrow-left"
      @handleclickleft="onClickLeft"
    ></v-header>
    <!-- 筛选工具 -->
    <section class="tools">
      <van-dropdown-menu active-color="#1989fa">
        <!-- 分类 TODO:未完成 -->
        <van-dropdown-item title="分类" ref="item">
          <section class="category-con df">
            <!-- 左侧菜单项 -->
            <van-sidebar v-model="activeKey">
              <van-sidebar-item
                :badge="item.count"
                v-for="item in categoryList"
                :key="item.id"
              >
                <template #title>
                  <van-icon
                    size="20"
                    :name="
                      item.image_url
                        ? 'https://fuss10.elemecdn.com/' + item.image_url
                        : '../../assets/images/base.jpg'
                    "
                  />
                  <span class="item-name">{{ item.name }}</span>
                </template>
              </van-sidebar-item>
            </van-sidebar>
            <!-- 右侧内容 -->
            <div class="right-con">
              <van-cell-group>
                <!-- <template
                  v-for="(item2, index) in categoryList[activeKey]
                    .sub_categories"
                > -->
                <template v-for="(item2, index) in categoryDetail[activeKey]">
                  <van-cell
                    v-if="index !== 0"
                    :title="item2.name"
                    :value="item2.count"
                    :key="item2.id"
                  />
                </template>
              </van-cell-group>
            </div>
          </section>
        </van-dropdown-item>
        <!-- 排序 -->
        <van-dropdown-item title="排序" ref="sort">
          <van-cell
            :title="item.title"
            v-for="item in orderbyList"
            :key="item.id"
            @click="handleItem(item.id)"
          >
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #icon>
              <van-icon
                :name="item.icon"
                :color="item.color"
                class="item-icon"
              />
            </template>
            <template #right-icon>
              <van-icon
                v-show="isActive === item.id"
                name="success"
                :color="item.color"
              />
            </template>
          </van-cell>
        </van-dropdown-item>
        <!-- 筛选 -->
        <van-dropdown-item title="筛选" ref="sure">
          <v-title text="配送方式"></v-title>
          <van-tag
            size="medium"
            plain
            type="primary"
            :color="!item.isRight ? '#999' : '#' + item.color"
            class="ml10"
            v-for="(item, index) in modes"
            :key="item.id"
            @click="handleModes(index, item.id)"
          >
            <template #default>
              <van-icon name="success" v-show="item.isRight" />
              <span>{{ item.text }}</span>
            </template>
          </van-tag>
          <v-title text="商家属性（可以多选）"></v-title>
          <div class="attributes">
            <van-tag
              plain
              :color="!item.isChecked ? '#999' : '#3190e8'"
              size="medium"
              type="primary"
              class="mlb5"
              v-for="(item, index) in attributes"
              :key="item.id"
              @click="handleAttr(index, item.id)"
            >
              <template #default>
                <i
                  :style="{
                    color: '#' + item.icon_color,
                    marginRight: 3 + 'px',
                  }"
                  >{{ item.icon_name }}</i
                >
                <span>{{ item.name }}</span>
              </template>
            </van-tag>
          </div>
          <div class="btns df-sb">
            <van-button type="default" size="small" @click="onClear"
              >清空</van-button
            >
            <van-button type="primary" size="small" @click="onConfirm"
              >确定{{
                selectNum === 0 ? "" : "(" + selectNum + ")"
              }}</van-button
            >
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </section>
    <!-- 商铺列表 -->
    <v-shop-list :data="shopList"></v-shop-list>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
import VTitle from "@/components/VTitle";
import VShopList from "@/components/common/ShopList";
import api from "../../api";

export default {
  data() {
    return {
      // 请求参数
      delivery_mode: [],
      support_ids: [],
      // ------------
      title: "",
      attrId: "", // 属性id
      isActive: 4, // 控制是否勾中
      shopList: [],
      modes: [],
      attributes: [],
      categoryList: [],
      categoryDetail: [], // 分类右侧数据
      activeKey: 0,
      orderbyList: [
        {
          id: 4,
          title: "智能排序",
          icon: "exchange",
          color: "#3190e8",
        },
        {
          id: 5,
          title: "距离最近",
          icon: "location-o",
          color: "#97cee9",
        },
        {
          id: 6,
          title: "销量最高",
          icon: "fire-o",
          color: "#f5acac",
        },
        {
          id: 1,
          title: "起送价最低",
          icon: "gold-coin-o",
          color: "#e9bf3a",
        },
        {
          id: 2,
          title: "配送速度最快",
          icon: "clock-o",
          color: "#9be3db",
        },
        {
          id: 3,
          title: "评分最高",
          icon: "star-o",
          color: "#f2c683",
        },
      ],
    };
  },
  components: {
    VHeader,
    VTitle,
    VShopList,
  },
  created() {
    let { title } = this.$route.query;
    // console.log(title);
    this.title = title;
    this.getModes();
    this.getAttributesList();
    this.getCategorys();
    this.getShopsList();
  },
  computed: {
    // 计算选中的个数
    selectNum() {
      return this.support_ids.length + this.delivery_mode.length;
    },
  },
  methods: {
    onClickLeft() {
      // 返回上一页
      this.$router.go(-1);
    },
    // 确定
    onConfirm() {
      this.$refs.sure.toggle();
      this.getShopsList();
    },
    // 清空
    onClear() {
      // console.log('onClear')
      this.modes.forEach((v) => {
        v.isRight = false;
      });
      this.attributes.forEach((v) => {
        v.isChecked = false;
      });
      this.delivery_mode = [];
      this.support_ids = [];
    },
    // 点击配送方式
    handleModes(index, id) {
      // 修改选中状态
      this.modes[index].isRight = !this.modes[index].isRight;
      if (this.modes[index].isRight) {
        this.delivery_mode.push(this.modes[index].id);
      } else {
        let idx = this.delivery_mode.indexOf(id);
        this.delivery_mode.splice(idx, 1);
      }
    },
    // 点商家属性
    handleAttr(index, id) {
      // let { index, id } = obj;
      // 修改选中状态
      this.attributes[index].isChecked = !this.attributes[index].isChecked;
      if (this.attributes[index].isChecked) {
        // this.support_ids = this.support_ids.concat([id]);
        // this.support_ids.splice(index,0,id);
        this.support_ids.push(this.attributes[index].id);
      } else {
        let idx = this.support_ids.indexOf(id);
        this.support_ids.splice(idx, 1);
      }
    },
    // 点击每一项
    handleItem(order_by) {
      //   console.log(order_by);
      // 关闭下拉菜单
      this.isActive = order_by;
      this.$refs.sort.toggle();
      this.getShopsList(order_by);
    },
    // 获取配送方式
    getModes() {
      api.food
        .getDeliveryModes({
          latitude: "",
          longitude: "",
        })
        .then((res) => {
          res.forEach((v) => {
            v.isRight = false;
          });
          this.modes = res;
        });
    },
    // 获取商家属性
    getAttributesList() {
      api.food
        .getAttributes({
          latitude: "",
          longitude: "",
        })
        .then((res) => {
          res.forEach((v) => {
            v.isChecked = false;
          });
          // console.log(res);
          this.attributes = res;
        });
    },
    // 获取商铺分类
    getCategorys() {
      api.food
        .getCategory({
          latitude: "",
          longitude: "",
        })
        .then((res) => {
          this.categoryList = res;
          let categoryDetail = this.categoryList.reduce((arr, cur) => {
            arr.push(cur.sub_categories);
            return arr;
          }, []);
          // console.log('arr',categoryDetail)
          this.categoryDetail = categoryDetail;
        });
    },
    // 获取商铺列表
    getShopsList(order_by) {
      let geohash = localStorage.getItem("geohash");
      let _geohash = geohash.split(",");
      // console.log(_geohash)
      api.home
        .getShopList({
          latitude: _geohash[0],
          longitude: _geohash[1],
          offset: 0,
          limit: 20,
          restaurant_category_id: 239,
          order_by: order_by,
          delivery_mode: this.delivery_mode,
          support_ids: this.support_ids,
          restaurant_category_ids: [],
        })
        .then((res) => {
          this.shopList = res;
        });
    },
  },
};
</script>

<style lang='less' scoped>
.food-page {
  position: relative;
  padding-top: 30px;
  .tools {
    width: 100%;
    position: fixed;
    z-index: 99;
    left: 0;
    top: 46px;
    .category-con {
      font-size: 12px;
      height: 360px;
      overflow: hidden;
      .van-sidebar {
        flex: 1;
        // width: 50vw;
        .van-sidebar-item {
          padding: 10px;
        }
        .van-sidebar-item--select::before {
          background-color: var(--themeColor);
        }
        /deep/.van-sidebar-item__text {
          display: flex;
          align-items: center;
          .item-name {
            margin-left: 0.6rem;
            line-height: 20px;
          }
          .van-info {
            right: 20px;
            background-color: var(--themeColor);
          }
        }
      }
      .right-con {
        flex: 1;
        //   width: 50vw;
        overflow: auto;
        .van-cell {
          padding: 8px;
        }
      }
    }
    .item-icon {
      font-size: 16px;
      margin-right: 0.5rem;
      line-height: inherit;
    }
    /deep/.van-dropdown-menu__bar {
      height: 30px;
    }
    .ml10 {
      margin-left: 10px;
    }
    .attributes {
      margin-left: 5px;
      .mlb5 {
        margin-left: 0.5rem;
        margin-bottom: 0.5rem;
      }
    }
    .btns {
      //    border-top: 10px solid #eee;
      background-color: #eee;
      padding: 6px;
      //    display: flex;
      //    justify-content: space-between;
      button {
        width: 49%;
      }
    }
  }
}
</style>