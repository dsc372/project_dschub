<template>
    <div class="home-container">
        <van-nav-bar class="app-nav-bar" right-text="+" @click-right="onClickRight">
            <van-button slot="title" round class="search-btn" to="/search"  @click-right="onClickRight">
                <van-icon name="search" size="20"></van-icon>
            </van-button>
        </van-nav-bar>
        <van-tabs v-model="active" color="#333">
            <van-tab v-for="channel in channels" :key="channel" :title="channel">
                <ArticleList :channel="channel"></ArticleList>
            </van-tab>
            <!-- 让汉堡按钮不遮住最右边的元素 -->
            <div slot="nav-right" class="tab-marigin-right"></div>
            <div slot="nav-right" class="tab-nav-right">
                <van-icon name="wap-nav" @click="showPopup_e=true" color="#333" size="20"></van-icon>
            </div>
        </van-tabs>
        <van-popup v-model="showPopup_e" position="bottom" closeable :style="{ height: '70%' }">
            <ChannelEdit :userChannels="channels"></ChannelEdit>
        </van-popup>
        <van-popup v-model="showPopup_c" position="bottom" :style="{ height: '100%' }">
            <CreateArticle @onClose="onCreateClose"></CreateArticle>
        </van-popup>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { reqChannels } from '@/api/user'
import { reqAllChannels} from '@/api/channel'
import { Toast } from 'vant';
import CreateArticle from './components/create-article/index.vue'
import ArticleList from './components/article-list/index.vue';
import ChannelEdit from './components/channel-edit/index.vue';
export default {
    name: "home",
    data() {
        return {
            active: "a",
            channels: [],
            showPopup_e: false,
            showPopup_c: false,
        };
    },
    computed: {
        ...mapState(['user'])
    },
    components: {
        ArticleList,
        ChannelEdit,
        CreateArticle,
    },
    methods: {
        async getChannels() {
            if (this.user) {
                try {
                    let res = await reqChannels();
                    this.channels =res.data.lableList;
                }
                catch (error) {
                    Toast.fail("获取用户频道失败");
                }
            } else {
                let res = await reqAllChannels()
                this.channels  = res.data.allLables
            }
        },
        onClickRight(){
            this.showPopup_c=true
        },
        onCreateClose(isCreated){
            this.showPopup_c=false
            if(isCreated){
                location.reload()
            }
        }
    },
    created() {
        this.getChannels();
    }
}
</script>

<style lang="less" scoped>
.home-container {
    /deep/ .van-nav-bar__title {
        max-width: unset;
    }

    .search-btn {
        height: 32px;
        width: 230px;
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