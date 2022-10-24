1.修改vant组件库样式要删除style标签中的scoped
2.van-form中的所有button都会触发表单验证，故发送验证码按钮要click.prevent,然后this.$refs.loginForm.validate('mobile'),返回promise
3.localStorage（持久化）和vuex（为了使用方便）结合存储token
4.编辑频道后，若未登录则存在道本地，登录了存到用户信息中
5.如果登录了，channels为用户的channels，若未登录但local storage中有channels用local storage中的channels，否则就请求默认的
6.搜索关键词高亮：给关键词包裹html标签，然后设置颜色，用v-html指令
highlight(val) {
    return val?val.replace(new RegExp(this.searchText, 'gi'), `<span style="color:red;"{this.searchText}</span>`):val
}
*7.回复评论中的内容相同是因为popup组件是懒渲染,通过v-if解决
<van-popup v-model="showAllCommtentPopup" position="bottom">
    <CommentReply :comment="replyComment" v-if="showAllCommtentPopup"></CommentReply>
</van-popup>