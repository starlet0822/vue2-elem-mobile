import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import address from './modules/address'

export default new Vuex.Store({
  state: {
    geohash: "",
    active: '/misite',
    userInfo:{}
  },
  mutations: {
    modifActive(state, payload) {
      state.active = payload
    },
    modifUserInfo(state, payload){
      state.userInfo = payload
    }
  },
  actions: {
  },
  modules: {
    address,
  }
})
