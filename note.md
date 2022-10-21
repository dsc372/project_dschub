1.修改vant组件库样式要删除style标签中的scoped
2.van-form中的所有button都会触发表单验证，故发送验证码按钮要click.prevent,然后this.$refs.loginForm.validate('mobile'),返回promise
3.localStorage（持久化）和vuex（为了使用方便）结合存储token
4.编辑频道后，若未登录则存在道本地，登录了存到用户信息中
5.如果登录了，channels为用户的channels，若未登录但local storage中有channels用local storage中的channels，否则就请求默认的