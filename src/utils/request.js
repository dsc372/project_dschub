import axios from "axios"
import store from "@/store/index"
import router from "@/router"
import { Toast } from "vant"

const refreshTokenReq = axios.create({
  baseURL: "http://toutiao.itheima.net/",
})

const request = axios.create({
  baseURL: "http://toutiao.itheima.net/",
})

request.interceptors.request.use(
  function (config) {
    const { user } = store.state
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
      config.headers["Content-Type"] = "application/json"
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
      if (status === 400) {
        Toast.fail("客户端请求参数异常")
      } else if (status === 401) {
        const { user } = store.state
        if (!user || !user.token) {
          redirectToLogin()
          return Promise.reject(error)
        }
        try {
          let res = await refreshTokenReq({
            //避免refreshToken时调用request的响应拦截器
            method: "PUT",
            url: "/v1_0/authorizations",
            headers: {
              Authorization: `Bearer ${user.refresh_token}`,
            },
          })
          user.token = res.data.data.token
          store.commit("setUser", user)
          error.config.headers={}//不写的话会有一个莫名其妙的bug
          return request(error.config)
        } catch (error) {
          redirectToLogin()
          return Promise.reject(error)
        }
      } else if (status === 403) {
        Toast.fail("没有操作权限")
      } else if (status >= 500) {
        Toast.fail("服务器异常")
      }
    }
    return Promise.reject(error)
  }
)

function redirectToLogin() {
  router.replace("/login")
}

export default request
