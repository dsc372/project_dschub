<template>
    <div class="home-container">
        <van-nav-bar class="app-nav-bar">
            <van-button slot="title" round class="search-btn">
                <van-icon name="search" size="20"></van-icon>
            </van-button>
        </van-nav-bar>
        <van-tabs v-model="active" color="#333">
            <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
                <ArticleList :channel="channel"></ArticleList>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import {reqChannels} from '@/api/user'
import { Toast } from 'vant';
import ArticleList from './components/article-list/index.vue';
export default {
    name: "home",
    data() {
        return {
            active: "a",
            channels: [],
        };
    },
    comments: {
        ArticleList
    },
    methods: {
        async getChannels() {
            try {
                let res = await reqChannels();
                this.channels = res.data.data.channels;
            }
            catch (error) {
                Toast.fail("获取用户频道失败");
            }
        }
    },
    created() {
        this.getChannels();
    },
    components: { ArticleList }
}
</script>

<style lang="less" scoped>
.home-container {
    /deep/ .van-nav-bar__title {
        max-width: unset;
    }

    .search-btn {
        height: 32px;
        width: 277px;
        background-color: #666;
        border: unset;
    }
}
</style>