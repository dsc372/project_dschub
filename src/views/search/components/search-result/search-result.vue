<template>
    <div class="search-result">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ArticleItem v-for="article in searchResult" :key="article.art_id" :article="article"></ArticleItem>
        </van-list>
    </div>
</template>

<script>
import {reqSearchResult} from '@/api/search'
import { Toast } from 'vant'
import ArticleItem from '@/components/article-item/index.vue'
export default {
    name: "search-result",
    data() {
        return {
            searchResult: [],
            loading: false,
            finished: false,
            page: 1,
            prePage: 10
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
                const res = await reqSearchResult({
                    page: this.page,
                    per_page: this.prePage,
                    q: this.searchText,
                });
                this.searchResult.push(...res.data.data.results);
                this.loading = false;
                if (res.data.data.results.length) { //本次请求还有数据
                    this.page++;
                }
                else {
                    this.finished = true;
                }
            }
            catch (error) {
                Toast.fail("获取搜索结果失败");
            }
        },
    },
    components: { ArticleItem }
}
</script>

<style lang="scss" scoped>

</style>