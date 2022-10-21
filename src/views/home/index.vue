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
            <!-- 让汉堡按钮不遮住最右边的元素 -->
            <div slot="nav-right" class="tab-marigin-right"></div>
            <div slot="nav-right" class="tab-nav-right">
                <van-icon name="wap-nav" @click="showPopup=true" color="#333" size="20"></van-icon>
            </div>
        </van-tabs>
        <van-popup v-model="showPopup" position="bottom" closeable get-container="body" :style="{ height: '70%' }">
            <ChannelEdit :userChannels="channels"></ChannelEdit>
        </van-popup>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { reqChannels } from '@/api/user'
import { getItem } from '@/utils/storage'
import { Toast } from 'vant';
import ArticleList from './components/article-list/index.vue';
import ChannelEdit from './components/channel-edit/index.vue';
export default {
    name: "home",
    data() {
        return {
            active: "a",
            channels: [],
            showPopup: false,
        };
    },
    computed: {
        ...mapState(['user'])
    },
    components: {
        ArticleList
    },
    methods: {
        async getChannels() {
            let localChannels = getItem('user-channels')
            if (this.user || !localChannels) {
                try {
                    let res = await reqChannels();
                    this.channels =res.data.data.channels;
                }
                catch (error) {
                    Toast.fail("获取用户频道失败");
                }
            } else {
                this.channels = localChannels
            }
        }
    },
    created() {
        this.getChannels();
    },
    components: { ArticleList, ChannelEdit }
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

    .tab-marigin-right {
        width: 33px;
        flex-shrink: 0;
    }

    .tab-nav-right {
        position: fixed;
        right: 0;
        width: 44px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 44px;
        background-color: #fff;
    }
}
</style>