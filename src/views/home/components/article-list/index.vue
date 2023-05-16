<template>
    <div class="article-list" ref="articleList">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ArticleItem v-for="(article,index) in articleList" :key="article.art_id" :article="article" @onDelActicle="onDelActicle(index)"/>
        </van-list>
    </div>
</template>

<script>

import { reqArticles } from '@/api/article'
import { Toast } from 'vant';
import ArticleItem from '@/components/article-item/index.vue';
export default {
    name: "artcle-list",
    components: { ArticleItem },
    props: {
        channel: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            articleList: [],
            offset:0,
            size:10,
            loading: false,
            finished: false,
        };
    },
    methods: {
        async onLoad() {
            try {
                let res = await reqArticles(this.offset,this.size,this.channel);
                this.articleList.push(...res.data.articleList);
                this.loading = false;
                if (res.data.articleList.length) {
                    this.offset+=this.size
                }else {
                    this.finished = true;
                }
            }
            catch (error) {
                Toast.fail("获取文章列表失败");
            }
        },
        onDelActicle(index){
            this.articleList.splice(index,1)
        }
    }
}
</script>

<style lang="less" scoped>
.article-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;
}
</style>