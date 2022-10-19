import Vue from 'vue'
import VueRouter from 'vue-router'
import {getItem} from '@/utils/storage'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/login')
  },
  {
    path:'/',
    component:()=>import('@/views/tabbar'),
    children:[
      {
        path:'',//默认子路由
        name:'home',
        component:()=>import('@/views/home')
      },
      {
        path:'/qa',//默认子路由
        name:'qa',
        component:()=>import('@/views/qa')
      },
      {
        path:'/video',//默认子路由
        name:'video',
        component:()=>import('@/views/video')
      },
      {
        path:'/my',//默认子路由
        name:'my',
        component:()=>import('@/views/my'),
        beforeEnter: (to, from, next) => {
            if(getItem('user')){
              next()
            }else{
              if(from.path==='/login')next('/')
              else {
                next('/login')
              }
            }
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
