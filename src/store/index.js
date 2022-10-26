import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY='user'

export default new Vuex.Store({
  state: {
    user:getItem(USER_KEY),//当前用户的登录状态，
    cachePages:['search','tabbar']
  },
  getters: {
  },
  mutations: {
    setUser(state,data){
      state.user=data
      setItem(USER_KEY,data)
    },
    addCachePage(state,pageName){
      if(!state.cachePages.includes(pageName)){
        state.cachePages.push(pageName)
      }
    },
    removeCachePage(state,pageName){
      const index=state.cachePages.indexOf(pageName)
      if(state.cachePages.indexOf(pageName)!==-1){
        state.cachePages.splice(index,1)
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
