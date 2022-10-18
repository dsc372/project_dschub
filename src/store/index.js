import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY='user'

export default new Vuex.Store({
  state: {
    user:getItem(USER_KEY)//当前用户的登录状态
  },
  getters: {
  },
  mutations: {
    setUser(state,data){
      state.user=data
      setItem(USER_KEY,data)
    }
  },
  actions: {
  },
  modules: {
  }
})
