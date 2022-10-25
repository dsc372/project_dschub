<template>
    <div class="edit-photo">
        <img class="img" :src="imgUrl" ref="img">
        <van-nav-bar left-text="取消" right-text="确认" class="toolbar" @click-left="$emit('onClose')" @click-right="onConfirm"></van-nav-bar>
    </div>
</template>

<script>
import {reqUpdateUserPhoto} from '@/api/user'
import { Toast } from 'vant';
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
    name: 'EditPhoto',
    props: {
        newPhoto: {
            type: File,
            required: true,
        }
    },
    data(){
        return{
            imgUrl:window.URL.createObjectURL(this.newPhoto),
            cropper:null
        }
    },
    methods:{
        getCroppedCanvas(){
            return new Promise(resolve=>{
                this.cropper.getCroppedCanvas().toBlob((blob)=>{resolve(blob)})
            })
        },
        async onConfirm() {
            try {
                Toast.loading({
                    message: "操作中",
                    forbidClick: true
                });
                const file=await this.getCroppedCanvas()
                const fd=new FormData()
                fd.append('photo',file)
                let res=await reqUpdateUserPhoto(fd)
                console.log(res)
                this.$emit('editPhotoSuccess',file)
                Toast.success("操作成功");
            }
            catch (error) {
                Toast.fail("修改头像信息失败");
            }
        },
    },
    mounted(){
        const image=this.$refs.img
        this.cropper=new Cropper(image,{
            viewMode:1,
            aspectRatio:1,
            background:false,
        })
    }
}
</script>

<style lang="less" scoped>
.toolbar{
    position:fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
}
.img{
    display: block;
    max-width: 100%;
}
.edit-photo{
    height: 100%;
    background-color: #000;
}
</style>