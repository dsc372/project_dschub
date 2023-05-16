<template>
    <div class="search-result" ref="articleList">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ArticleItem v-for="article in searchResult" :key="article.articleId" :article="article"></ArticleItem>
        </van-list>
    </div>
</template>

<script>
import { reqArticles } from '@/api/article'
import { Toast } from 'vant'
import ArticleItem from '@/components/article-item/index.vue'
export default {
    name: "search-result",
    components: { ArticleItem },
    data() {
        return {
            searchResult: [],
            loading: false,
            finished: false,
            offset: 0,
            size: 5,
        };
    },
    props: {
        searchText: {
            type: String,
            required: true
        }
    },
    methods: {
        async onLoad() {
            try {
                const res = await reqArticles(this.offset,this.size,this.searchText);
                this.searchResult.push(...res.data.articleList);
                this.loading = false;
                if (res.data.articleList.length) {
                    this.offset+=this.size
                }else {
                    this.finished = true;
                }
            }
            catch (error) {
                Toast.fail("获取搜索结果失败");
            }
        },
    }
}
</script>

<style lang="scss" scoped>

</style>