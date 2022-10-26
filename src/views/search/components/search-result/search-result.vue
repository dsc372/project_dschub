<template>
    <div class="search-result" ref="articleList">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ArticleItem v-for="article in searchResult" :key="article.art_id" :article="article"></ArticleItem>
        </van-list>
    </div>
</template>

<script>
import {reqSearchResult} from '@/api/search'
import { Toast } from 'vant'
import ArticleItem from '@/components/article-item/index.vue'
import {debounce} from 'lodash'
export default {
    name: "search-result",
    components: { ArticleItem },
    data() {
        return {
            searchResult: [],
            loading: false,
            finished: false,
            page: 1,
            prePage: 10,
            scrollTop:0,
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
    mounted(){
        const articleList=this.$refs['articleList']
        articleList.onscroll=debounce(()=>{
            this.scrollTop=articleList.scrollTop
        },50)
    },
    activated(){
        console.log(1)
        this.$refs['articleList'].scrollTop=this.scrollTop
    }
}
</script>

<style lang="scss" scoped>

</style>