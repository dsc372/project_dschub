<template>
    <div class="user-profile">
        <van-nav-bar class="app-nav-bar" title="个人信息" left-arrow @click-left="$router.back()"></van-nav-bar>
        <input type="file" hidden accept="image/*" ref="file" @change="onFileChange">
        <van-cell title="头像" is-link @click="$refs.file.click()">
            <van-image width="30" height="30" round fit="cover" :src="userProfile.photo"></van-image>
        </van-cell>
        <van-cell title="昵称" is-link :value="userProfile.name" @click="onEditClick('showEditName')"></van-cell>
        <van-cell title="性别" is-link :value="userProfile.gender === 1 ? '女' : '男'"
            @click="onEditClick('showEditGender')"></van-cell>
        <van-cell title="生日" is-link :value="userProfile.birthday" @click="onEditClick('showEditBirth')"></van-cell>
        <van-popup v-model="showPopup" position="bottom" :style="{ height: showEditName||showEditPhoto ? '100%' : '50%' }">
            <EditName :preName="userProfile.name" @editNameSuccess="onEditNameSuccess" v-if="showEditName"
                @onClose="showPopup = false"></EditName>
            <EditGender :genderIndex="userProfile.gender" @editGenderSuccess="onEditGenderSuccess" v-if="showEditGender"
                @onClose="showPopup = false"></EditGender>
            <EditBirth :preBirth="userProfile.birthday" v-if="showEditBirth" @onClose="showPopup = false"
                @editBirthSuccess="onEditBirthSuccess"></EditBirth>
            <EditPhoto :newPhoto="newPhoto" v-if="showEditPhoto" @editPhotoSuccess="onEditPhotoSuccess" @onClose="showPopup = false"></EditPhoto>
        </van-popup>
    </div>
</template>

<script>
import { reqUserProfile } from '@/api/user'
import EditName from './components/edit-name/index.vue'
import EditGender from './components/edit-gender/index.vue'
import EditBirth from './components/edit-birth/index.vue'
import EditPhoto from './components/edit-photo/index.vue'
import { Toast } from 'vant'
export default {
    name: 'UserProfile',
    components: { EditName, EditGender, EditBirth,EditPhoto },
    data() {
        return {
            userProfile: {},
            showPopup: false,
            showEditName: false,
            showEditGender: false,
            showEditBirth: false,
            showEditPhoto:false,
            newPhoto:null
        }
    },
    watch: {
        showPopup() {
            if (this.showPopup === false) {
                this.showEditGender = false
                this.showEditName = false
                this.showEditBirth = false
                this.showEditPhoto=false
            }
        }
    },
    methods: {
        async getUserProfile() {
            try {
                let res = await reqUserProfile()
                this.userProfile = res.data.data
            } catch (error) {
                Toast.fail('获取用户资料失败')
            }
        },
        onEditClick(type) {
            this[type] = true
            this.showPopup = true
        },
        onEditNameSuccess(newName) {
            this.showEditName = false
            this.showPopup = false
            this.userProfile.name = newName
        },
        onEditGenderSuccess(index) {
            this.showEditGender = false
            this.showPopup = false
            this.userProfile.gender = index
        },
        onEditBirthSuccess(newBirth) {
            this.showEditBirth = false
            this.showPopup = false
            this.userProfile.birthday = newBirth
        },
        onEditPhotoSuccess(file){
            this.showEditPhoto=false
            this.showPopup=false
            this.userProfile.photo=window.URL.createObjectURL(file)
        },
        onFileChange(){
            this.showEditPhoto=true
            this.showPopup=true
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