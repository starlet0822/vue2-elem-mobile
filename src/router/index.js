import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由懒加载
const Cities = () => import(/* webpackChunkName: "cities" */ '../views/cities/Cities.vue')
const City = () => import(/* webpackChunkName: "city" */ '../views/cities/City.vue')
const Misite = () => import(/* webpackChunkName: "misite" */ '../views/misite/Misite.vue')
const Home = () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue')
const Search = () => import(/* webpackChunkName: "seatch" */ '../views/search/Search.vue')
const Order = () => import(/* webpackChunkName: "order" */ '../views/order/Order.vue')
const My = () => import(/* webpackChunkName: "my" */ '../views/my/My.vue')
const VipCard = () => import(/* webpackChunkName: "vipcard" */ '../views/vipcard/VipCard.vue')
const Login = () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
const Forget = () => import(/* webpackChunkName: "forget" */ '../views/forget/Forget.vue')
const UserInfo = () => import(/* webpackChunkName: "userInfo" */ '../views/my/UserInfo.vue')
const Address = () => import(/* webpackChunkName: "address" */ '../views/my/Address.vue')
const AddressAdd = () => import(/* webpackChunkName: "address_add" */ '../views/my/AddressAdd.vue')
const AddDetail = () => import(/* webpackChunkName: "detail_add" */ '../views/my/AddDetail.vue')

const routes = [
  {
    path: '/',
    name: 'Cities',
    component: Cities
  },
  {
    path: '/city/:city_id',
    name: 'City',
    component: City
  },
  {
    path: '/home',
    redirect: '/misite',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/misite',
        name: 'Misite',
        component: Misite
      },
      {
        path: '/search',
        name: 'Search',
        component: Search
      },
      {
        path: '/order',
        name: 'Order',
        component: Order
      },
      {
        path: '/my',
        name: 'My',
        component: My
      }
    ]

  },
  {
    path: '/vipcard',
    name: 'VipCard',
    component: VipCard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/forget',
    name: 'Forget',
    component: Forget
  },
  {
    path: '/my/info',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    path: '/my/info/address',
    name: 'Address',
    component: Address
  },
  {
    path: '/my/info/address/add',
    name: 'AddressAdd',
    component: AddressAdd
  },
  {
    path: '/my/info/address/add/addDetail',
    name: 'AddDetail',
    component: AddDetail
  },
  


]


const router = new VueRouter({
  routes
})

router.afterEach((to, from) => { 
  // console.log(to.path)
  // 解决了底部高亮不对应bug
  router.app.$options.store.commit('modifActive', to.path)
  let active = router.app.$options.store.state.active
  // console.log(active)
})


export default router
