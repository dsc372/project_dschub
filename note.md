1.修改vant组件库样式要删除style标签中的scoped
2.van-form中的所有button都会触发表单验证，故发送验证码按钮要click.prevent,然后this.$refs.loginForm.validate('mobile'),返回promise
3.localStorage（持久化）和vuex（为了使用方便）结合存储token