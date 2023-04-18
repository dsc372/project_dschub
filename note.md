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
8.当传递给子组件的数据既要使用，又要修改，此时可以给子组件使用v-model(一个子组件只能使用一次，若要使用多个，可以考虑syns)
v-model="user.name"的作用等同于
:value="user.name"并默认监听子组件中的input事件@input="user.name=$event"
9.编辑头像，选择文件
<input type="file" hidden accept="image/*" ref="file">
<van-cell title="头像" is-link @click="$refs.file.click()">
    <van-image width="30" height="30" round fit="cover" :src="userProfile.photo">van-image>
</van-cell>
10.处理打开相同文件不触发onChange：
onFileChange(){
    this.$refs.file.value=''
}
11.修改头像要提交formdata数据
props: {
    newPhoto: {
       type: File,
        required: true,
    }
},
const fd=new FormData()
fd.append('photo',this.newPhoto)
以上是无裁剪版，裁剪版见代码
12.组件缓存
<keep-alive :include="['tabbar','search']">
  <router-view/>
</keep-alive>
但是会导致切换用户后数据仍是前一个用户的数据，需要刷新
解决方案：
在vuex中添加
cachePages:['search','tabbar']
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
在App.vue中用<keep-alive :include="cachePages">
退出登录时removeCachePage
登录时addCachePage
15.滚动位置的缓存
在article-list组件中
mounted(){
    const articleList=this.$refs['articleList']
    articleList.onscroll=debounce(()=>{
        this.scrollTop=articleList.scrollTop
    },50)
},
activated(){
    this.$refs['articleList'].scrollTop=this.scrollTop
}
16.用响应拦截器对请求错误进行拦截，针对401，进行重新登录或refresh（refresh后request(error.config)，此时请求头有个小bug）处理

17、更新头像后页面刷新

18、xhr的get方法不支持body传参

19、删除评论时，改评论角标数字时后端要返回评论回复数
