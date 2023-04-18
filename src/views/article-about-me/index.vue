<template>
    <div>
        <van-nav-bar class="app-nav-bar article-top" :title="title" left-arrow @click-left="$router.back()"></van-nav-bar>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" style="margin-top:46px">
            <ArticleItem v-for="article in articleList" :key="article.art_id" :article="article"></ArticleItem>
        </van-list>
    </div>
</template>

<script>
import { reqMyArticleList } from '@/api/user'
import ArticleItem from '@/components/article-item/index.vue'
import { reqLikeArticles } from '@/api/article'
export default {
    components: { ArticleItem },
    data() {
        return {
            title: '',
            offset: 0,
            size: 10,
            loading: false,
            finished: false,
            articleList: []
        }
    },
    methods: {
        async onLoad() {
            try {
                let res=[]
                if(this.title==='我的文章'){
                    res = await reqMyArticleList(this.offset, this.size);
                }else{
                    res=await reqLikeArticles(this.offset, this.size)
                }
                this.articleList.push(...res.data.articleList);
                this.loading = false;
                if (res.data.articleList.length) {
                    this.offset += this.size
                } else {
                    this.finished = true;
                }
            }
            catch (error) {
                Toast.fail(`获取${this.title}失败`);
            }
        },
    },
    created() {
        this.title = this.$route.name === 'myArticle' ? '我的文章' : '我的点赞'
    }
}
</script>

<style lang="less" scoped>
.article-top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
</style>