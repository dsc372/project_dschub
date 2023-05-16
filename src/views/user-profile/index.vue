<template>
    <div class="user-profile">
        <van-nav-bar class="app-nav-bar" title="个人信息" left-arrow @click-left="$router.back()"></van-nav-bar>
        <input type="file" hidden accept="image/*" ref="file" @change="onFileChange">
        <van-cell title="头像" is-link @click="$refs.file.click()">
            <van-image width="30" height="30" round fit="cover" :src="userProfile.avatar_url"></van-image>
        </van-cell>
        <van-cell title="昵称" is-link :value="userProfile.name" @click="onEditClick('showEditName')"></van-cell>
        <van-cell title="手机" :value="userProfile.phone"></van-cell>
        <van-popup v-model="showPopup" position="bottom" :style="{ height: showEditName||showEditPhoto ? '100%' : '50%' }">
            <EditName :preName="userProfile.name" @editNameSuccess="onEditSuccess" v-if="showEditName"
                @onClose="showPopup = false"></EditName>
            <EditPhoto :newPhoto="newPhoto" v-if="showEditPhoto" @editPhotoSuccess="onEditSuccess" @onClose="showPopup = false"></EditPhoto>
        </van-popup>
    </div>
</template>

<script>
import { reqUserInfo } from '@/api/user'
import EditName from './components/edit-name/index.vue'
import EditPhoto from './components/edit-photo/index.vue'
import { Toast } from 'vant'
export default {
    name: 'UserProfile',
    components: { EditName,EditPhoto },
    data() {
        return {
            userProfile: {},
            showPopup: false,
            showEditName: false,
            showEditPhoto:false,
            newPhoto:null
        }
    },
    watch: {
        showPopup() {
            if (this.showPopup === false) {
                this.showEditName = false
                this.showEditPhoto=false
            }
        }
    },
    methods: {
        async getUserProfile() {
            try {
                let res = await reqUserInfo()
                this.userProfile = res.data.userInfo
            } catch (error) {
                Toast.fail('获取用户资料失败')
            }
        },
        onEditClick(type) {
            this[type] = true
            this.showPopup = true
        },
        onEditSuccess() {
            this.showPopup = false
            location.reload()
            Toast.success("操作成功");
        },
        onFileChange(){
            this.onEditClick('showEditPhoto')
            const file= this.$refs.file.files[0]
            this.newPhoto=file
            this.$refs.file.value=''
        }
    },
    created() {
        this.getUserProfile()
    }
}
</script>

<style lang="less" scoped>
.van-popup {
    background-color: #f5f7f9;
}
</style>