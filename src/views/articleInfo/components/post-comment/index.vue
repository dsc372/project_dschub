<template>
    <div class="post-comment-container">
        <van-field v-model.trim="message" rows="3" type="textarea" maxlength="100" placeholder="请输入留言"
            show-word-limit />
        <van-button size="mini" class="post-comment-btn" @click="onPost">发布</van-button>
    </div>
</template>

<script>
import {reqAddComment} from '@/api/comment'
import { Toast } from 'vant';
export default {
    name: 'PostComment',
    props:{
        targetId:{
            type:[Number,String,Object],
            required:true,
        },
        articleId:{
            type:[Number,String,Object],
            default:null,
        }
    },
    data(){
        return{
            message:'',
        }
    },
    methods:{
        async onPost(){
            Toast.loading('发布中')
            try {
                let res=await reqAddComment({
                    target:this.targetId.toString(),
                    content:this.message,
                    art_id:this.articleId===null?null:this.articleId.toString(),
                })
                this.$emit('post-success',res.data.data.new_obj)
                this.message=''
                Toast.success('发布成功')
            } catch (error) {
                Toast.fail('发布失败')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.post-comment-container{
    display: flex;
    padding:  10px;
    align-items: flex-end;
    background-color: #eee;
    .post-comment-btn{
        margin-left: 7px;
        width: 60px;
        background-color: #333;
        color: #fff;
        border: 0;
    }
}
</style>