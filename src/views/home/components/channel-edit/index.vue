<template>
    <div class="channel-edit">
        <van-cell center :border="false">
            <div slot="title" class="channel-edit-title">我的频道</div>
            <van-button type="danger" plain round size="mini" @click="onEdit()">&nbsp;{{editBtnText}}&nbsp;</van-button>
        </van-cell>
        <div v-for="(channel,index) in userChannels" :key="channel.id" class="channel-item">
            <van-badge color="#ccc">
                <div class="channel-item-content">{{channel}}</div>
                <template #content>
                    <van-icon name="cross" class="badge-icon" v-if="userChannels.length>1"
                        @click="onChangeChannel(index,'del')" />
                </template>
            </van-badge>
        </div>
        <van-cell center :border="false">
            <div slot="title" class="channel-edit-title">频道推荐</div>
        </van-cell>
        <div v-for="(channel,index) in recommendChannels" :key="channel" class="channel-item">
            <van-badge color="#ccc">
                <div class="channel-item-content">{{channel}}</div>
                <template #content>
                    <van-icon name="plus" class="badge-icon" @click="onChangeChannel(index,'add')" />
                </template>
            </van-badge>
        </div>
    </div>
</template>

<script>
import { reqAllChannels, reqAddChannels, reqDelChannels } from '@/api/channel'
import { Toast } from 'vant'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
    name: 'channel-edit',
    data() {
        return {
            allChannels: [],
            showCross: false,
            editBtnText: '编辑',
        }
    },
    props: {
        userChannels: {
            type: Array,
            required: true,
        }
    },
    computed: {
        ...mapState(['user']),
        recommendChannels() {
            return this.allChannels.filter(channel => {
                return !this.userChannels.find(userChannel => {
                    return userChannel === channel
                })
            })
        }
    },
    methods: {
        async getAllChannels() {
            try {
                let res = await reqAllChannels()
                this.allChannels = res.data.allLables
            } catch (error) {
                Toast.fail('获取全部频道信息失败')
            }
        },
        async onChangeChannel(index, type) {
            if (type === 'add') {
                if (this.user) {
                    try {
                        await reqAddChannels({
                            name:this.recommendChannels[index]
                        })
                        this.userChannels.push(this.recommendChannels[index])
                    } catch (error) {
                        Toast.fail('添加频道失败')
                    }
                } else {
                    setItem('user-channels', this.userChannels)
                }
            } else if (type === 'del') {
                let channel=this.userChannels.splice(index, 1)
                if (this.user) {
                    try {
                        await reqDelChannels({
                            name:channel[0]
                        })
                    } catch (error) {
                        Toast.fail('删除频道失败')
                    }
                } else {
                    setItem('user-channels', this.userChannels)
                }
            }
        },
        onEdit() {
            this.showCross = !this.showCross,
                this.editBtnText = this.showCross ? '完成' : '编辑'
        },
    },
    created() {
        this.getAllChannels()
    }
}
</script>

<style lang="less" scoped>
.channel-edit {
    padding: 55px 0 20px 0;

    .channel-edit-title {
        font-size: 16px;
        color: #333;
    }

    .channel-item {
        display: inline-block;
        margin: 0 0 15px 20px;

        .badge-icon {
            display: block;
            font-size: 8px;
            line-height: 18px;
        }

        .channel-item-content {
            width: 70px;
            height: 43px;
            background-color: #f4f5f6;
            font-size: 14px;
            color: #222;
            line-height: 43px;
            text-align: center;
        }

    }
}
</style>