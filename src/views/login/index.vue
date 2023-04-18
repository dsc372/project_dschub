<template>
    <div class="login-container" :style="'height:' + screenHeight + 'px'">
        <van-nav-bar left-arrow left-text="返回" right-text="帮助" @click-left="$router.back()" :border="false" />
        <div class="login-way">
            <div class="login-way-title">手机验证码登录</div>
            <div class="login-way-info">未注册手机将自动注册</div>
        </div>
        <van-form ref="loginForm" :show-error="false" :show-error-message="false" validate-first @submit="onLogin"
            @failed="onFailed" style="margin:10px">
            <van-field name="mobile" v-model="user.phone" left-icon="phone" placeholder="请输入手机号" :rules="formRules.phone" />
            <van-field name="code" v-model="user.verificationCode" clearable left-icon="lock" placeholder="请输入验证码"
                :rules="formRules.verificationCode">
                <template #button>
                    <van-button size="small" class="code-btn" @click.prevent="onGetCode" :disabled="isCountDownShow">
                        <span v-if="!isCountDownShow">发送验证码</span>
                        <van-count-down :time="1000 * 60" format="ss 秒" @finish="{{ isCountDownShow = false }}" v-else />
                    </van-button>
                </template>
            </van-field>
            <div class="login-btn-container">
                <van-button type="info" block class="login-btn">登录</van-button>
            </div>
        </van-form>

    </div>
</template>

<script>
import { reqLogin } from '@/api/user'
import { Toast } from 'vant'
export default {
    name: 'login',
    data() {
        return {
            screenHeight: document.documentElement.clientHeight,
            user: {
                phone: '',
                verificationCode: '',
            },
            formRules: {
                phone: [
                    { required: true, message: '手机号不能为空' },
                    { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '手机号格式错误' },
                ],
                verificationCode: [
                    { required: true, message: '验证码不能为空' },
                    { pattern: /^\d{6}$/, message: '验证码格式错误' },
                ]
            },
            isCountDownShow: false,
        }
    },
    methods: {
        async onLogin() {
            Toast.loading({
                message: '登录中',
                forbidClick: true,
                duration: 0,//0为持续展示，会被后面的Toast覆盖
            })
            try {
                let res = await reqLogin(this.user)
                this.$store.commit('setUser', res.data.token)
                this.$store.commit('setUserId', res.data.id)
                this.$store.commit('addCachePage', 'tabbar')
                this.$router.back()
                Toast.success({
                    message: '登录成功'
                })
            } catch (error) {
                if (error.response.data) {
                    Toast.fail({
                        message: error.response.data
                    })
                }else{
                    Toast.fail({
                    message: '未知错误，登陆失败'
                })
                }
            }
        },
        onFailed(error) {
            Toast.fail({
                message: error.errors[0].message
            })
        },
        async onGetCode() {
            try {
                await this.$refs.loginForm.validate('mobile')
                this.isCountDownShow = true
                Toast.success('验证码已发送')
            } catch (error) {
                let message = ''
                if (error && error.name === 'mobile') {
                    message = error.message
                } else {
                    message = '未知错误'
                }
                Toast.fail({
                    message
                })
            }
        }
    }
}
</script>

<style lang="less">
.login-container {
    background-color: #fff;
}

.login-way {
    margin: 30px 25px 30px 25px;

    .login-way-title {
        font-size: 20px;
        font-weight: 400;
    }

    .login-way-info {
        margin-top: 10px;
        font-size: 12px;
        color: #999;
    }
}

.login-nav-bar {
    border: unset;
}

.van-field__control {
    margin-left: 10px;
    height: 30px;
}

.van-icon::before {
    font-size: 20px;
    color: #999;
    vertical-align: middle;
}


.login-btn-container {
    margin-top: 20px;
    padding: 20px;

    .login-btn {
        background-color: #333;
        border: 0;
        border-radius: 8px;
        font-size: 16px;
    }
}
</style>