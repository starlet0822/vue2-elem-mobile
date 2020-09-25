import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 路由懒加载
const Cities = () => import(/* webpackChunkName: "cities" */ '../views/cities/Cities.vue')

const routes = [
  {
    path: '/',
    name: 'Cities',
    component: Cities
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // }
]

const router = new VueRouter({
  routes
})

export default router
