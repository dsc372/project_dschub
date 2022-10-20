<template>
    <div class="article-list">
        <van-pull-refresh v-model="isPullDownLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <ArticleItem v-for="article in articleList" :key="article.art_id" :article="article"/>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>

import { reqArticles } from '@/api/article'
import { Toast } from 'vant';
import ArticleItem from '@/components/article-item/index.vue';
export default {
    name: "artcle-list",
    props: {
        channel: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            articleList: [],
            loading: false,
            finished: false,
            timestamp: null,
            isPullDownLoading: false,
            refreshSuccessText: "",
        };
    },
    methods: {
        async onLoad() {
            try {
                let res = await reqArticles({
                    channel_id: this.channel.id,
                    timestamp: this.timestamp || Date.now(),
                });
                this.articleList.push(...res.data.data.results);
                this.loading = false;
                if (res.data.data.results.length) {
                    this.timestamp = res.data.data.pre_timestamp;
                }
                else {
                    this.finished = true;
                }
            }
            catch (error) {
                Toast.fail("获取文章列表失败");
            }
        },
        async onRefresh() {
            try {
                let res = await reqArticles({
                    channel_id: this.channel.id,
                    timestamp: Date.now(),
                });
                this.articleList.unshift(...res.data.data.results);
                this.isPullDownLoading = false;
                this.refreshSuccessText = `更新了${res.data.data.results.length}条数据`;
            }
            catch (error) {
                Toast.fail("刷新失败");
            }
        }
    },
    components: { ArticleItem }
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