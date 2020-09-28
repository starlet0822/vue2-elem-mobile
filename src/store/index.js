import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    geohash: "",
    active: '/misite'
  },
  mutations: {
    modifActive(state, payload) {
      state.active = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
