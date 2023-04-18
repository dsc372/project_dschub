import axios from "axios"
import store from "@/store/index"
import router from "@/router"
import { Toast } from "vant"

const request = axios.create()

request.interceptors.request.use(
  function (config) {
    const { user } = store.state
    if (user) {
      config.headers.Authorization = `Bearer ${user}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  function (response) {
    //2xx状态进这里
    return response
  },
  async function (error) {
    if (error.response.status) {
      const status = error.response.status
      if (status === 401&&error.response.data==='登陆已过期，请重新登录') {
        const { user } = store.state
        if (!user || !user.token) {
          redirectToLogin()
          Toast.fail("登录过期，请重新登录")
          return Promise.reject(error)
        }
      } else if (status >= 500) {
        Toast.fail("服务器异常")
      }else{
        Toast.fail(error.response.data)
      }
    }
    return Promise.reject(error)
  }
)

function redirectToLogin() {
  router.replace("/login")
}

export default request
