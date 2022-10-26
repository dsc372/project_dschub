<template>
    <div class="my-container">
        <van-cell-group class="my-info" style="margin-top:0 ;">
            <van-cell title="单元格" value="内容" center class="base-info" :border="false">
                <van-image slot="icon" round fit="cover" :src="userInfo.photo" class="avatar" />
                <div slot="title" class="name-info">
                    <div class="name">{{                                           userInfo.name                                           }}</div>
                    <div class="welcome">ID:{{                                           userInfo.name                                           }}</div>
                </div>
                <div class="change-info" @click="$router.push('/user/profile')">
                    <van-icon name="setting-o" color="#aaa" size="20"></van-icon>
                    <van-icon name="arrow" color="#aaa" size="20"></van-icon>
                </div>
            </van-cell>
            <van-grid :border="false" class="data-info">
                <van-grid-item text="头条" class="data-info-item">
                    <span slot="icon">{{                                           userInfo.art_count                                           }}</span>
                </van-grid-item>
                <van-grid-item text="关注" class="data-info-item">
                    <span slot="icon">{{                                           userInfo.follow_count                                           }}</span>
                </van-grid-item>
                <van-grid-item text="粉丝" class="data-info-item">
                    <span slot="icon">{{                                           userInfo.fans_count                                           }}</span>
                </van-grid-item>
                <van-grid-item text="获赞" class="data-info-item">
                    <span slot="icon">{{                                           userInfo.like_count                                           }}</span>
                </van-grid-item>
            </van-grid>
        </van-cell-group>
        <van-grid :column-num="2" class="nav-grid">
            <van-grid-item icon="star-o" text="收藏" />
            <van-grid-item icon="underway-o" text="历史" />
        </van-grid>
        <van-cell title="消息通知" is-link to="/" />
        <van-cell title="小智同学" is-link to="/user/chat" />
        <van-cell title="退出登录" class="logout-btn" @click="onLogout" />
    </div>
</template>

<script>
import { reqUserInfo } from '@/api/user'
import { Toast } from 'vant';
export default {
    name: 'my',
    data() {
        return {
            userInfo: {},
        }
    },
    methods: {
        onLogout() {
            this.$dialog.confirm({
                message: '是否确认退出',
            })
                .then(() => {
                    // on confirm
                    this.$store.commit('setUser', null)
                    this.$store.commit('removeCachePage', 'tabbar')
                    this.$router.push('/login')
                })
                .catch(() => {
                    // on cancel
                });
        },
        async getUserInfo() {
            const user = this.$store.state.user
            if (user) {
                try {
                    let res = await reqUserInfo(user.token)
                    this.userInfo = res.data.data
                } catch (error) {
                    if (error.response.status !== 401) {
                        Toast.fail({
                            message: '获取用户信息失败'
                        })
                        this.$router.push('/login')
                    }
                }
            }else{
                this.$router.replace('/login')
            }
        }
    },
    created() {
        this.getUserInfo()
    }
}
</script>

<style lang="less" scoped>
.my-container {
    .my-info {
        margin-bottom: 10px;

        .base-info {
            box-sizing: border-box;
            height: 115px;
            padding-top: 38px;
            padding-bottom: 11px;

            .avatar {
                height: 66px;
                width: 66px;
                border: 1px solid #eee;
            }

            .name-info {
                margin-left: 11px;
                font-size: 18px;

                .welcome {
                    font-size: 15px;
                    color: #aaa;
                }
            }
        }

        .data-info-item {
            font-size: 18px;
        }
    }

    .nav-grid {
        margin-bottom: 10px;
    }

    .logout-btn {
        margin-top: 10px;
        text-align: center;
        color: #d86262;
    }
}
</style>