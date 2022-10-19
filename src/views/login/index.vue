<template>
     <div class="login-container">
        <van-nav-bar title="注册/登录" left-arrow @click-left="$router.back()" class="app-nav-bar" />
        <van-form ref="loginForm" :show-error="false" :show-error-message="false" validate-first @submit="onLogin"
            @failed="onFailed">
            <van-cell-group>
                <van-field name="mobile" v-model="user.mobile" left-icon="phone" placeholder="请输入手机号"
                    :rules="formRules.mobile" />
                <van-field name="code" v-model="user.code" clearable left-icon="lock" placeholder="请输入验证码"
                    :rules="formRules.code">
                    <template #button>
                        <van-button size="small" class="code-btn" @click.prevent="onGetCode" :disabled="isCountDownShow">
                            <span v-if="!isCountDownShow">发送验证码</span>
                            <van-count-down :time="1000*60" format="ss 秒" @finish="{{isCountDownShow=false}}" v-else/>
                        </van-button>
                    </template>
                </van-field>
            </van-cell-group>
            <div class="login-btn-container">
                <van-button type="info" block class="login-btn">登录</van-button>
            </div>
        </van-form>

    </div>
</template>

<script>
import { reqLogin, reqCode } from '@/api/user'
import { Toast } from 'vant'
export default {
    name: 'login',
    data() {
        return {
            user: {
                mobile: '',
                code: '',
            },
            formRules: {
                mobile: [
                    { required: true, message: '手机号不能为空' },
                    { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '手机号格式错误' },
                ],
                code: [
                    { required: true, message: '验证码不能为空' },
                    { pattern: /^\d{6}$/, message: '验证码格式错误' },
                ]
            },
            isCountDownShow:false,
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
                let res=await reqLogin(this.user)
                this.$store.commit('setUser',res.data.data)
                this.$router.back()
                Toast.success({
                    message: '登录成功'
                })
            } catch (error) {
                Toast.fail({
                    message: '登录失败'
                })
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
                await reqCode(this.user.mobile)
                this.isCountDownShow=true
            } catch (error) {
                let message = ''
                if (error && error.response && error.response.status === 429) {
                    message = '发送太频繁了,请稍后重试'
                } else if (error.name === 'mobile') {
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
.van-cell-group {
    margin-top: 10px;

    .van-field__control {
        margin-left: 10px;
        height: 30px;
    }

    .van-icon::before {
        font-size: 20px;
        color: #999;
        vertical-align: middle;
    }
}

.login-btn-container {
    padding: 20px;

    .login-btn {
        background-color: #333;
        border: 0;
        border-radius: 8px;
        font-size: 16px;
    }
}
</style>