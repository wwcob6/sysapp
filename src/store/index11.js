
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    path:'.'
  },
  //方法
  mutations: {
    setPath(state,path){
      state.path = path
    }
  },
  actions: {
  },
  modules: {
  }
})