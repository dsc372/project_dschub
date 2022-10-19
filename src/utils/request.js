import axios from 'axios'
import store from '@/store/index'

const request= axios.create({
    baseURL:'http://toutiao.itheima.net/'
})

request.interceptors.request.use(function(config){
    const {user} =store.state
    if(user){
        config.headers.Authorization=`Bearer ${user.token}`
    }
    return config
},function(error){
    return Promise.reject(error)
})

export default request