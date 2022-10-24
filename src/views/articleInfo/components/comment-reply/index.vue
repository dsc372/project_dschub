<template>
    <div class="comment-replay">
        <van-nav-bar :title="comment.reply_count+'条回复'"></van-nav-bar>
        <CommentItem :comment="comment"></CommentItem>
        <CommentList :source="comment.com_id" :type="'c'" :commentList="commentList"></CommentList>
        <div class="article-bottom">
            <van-button class="comment-btn" type="default" round size="small" @click="onComment">写评论</van-button>
        </div>
        <van-popup v-model="showCommtentPopup" position="bottom">
            <PostComment :targetId="comment.com_id" :articleId="articleId" @post-success="onPostSuccess"></PostComment>
        </van-popup>
    </div>
</template>

<script>
import CommentItem from '../comment-item/index.vue';
import CommentList from '../comment-list/index.vue';
import PostComment from '../post-comment/index.vue';
    export default {
    name: "CommentReply",
    components: { CommentItem, CommentList, PostComment },
    props:{
        comment:{
            type:Object,
            required:true,
        },
        articleId:{
            type:[Number,String,Object],
            default:null,
        }
    },
    data(){
        return{
            showCommtentPopup:false,
            commentList:[],
        }
    },
    methods:{
        onComment(){
            this.showCommtentPopup=true
        },
        onPostSuccess(new_obj){
            this.showCommtentPopup=false
            this.commentList.unshift(new_obj)
            this.comment.reply_count++
        },
    }
}
</script>

<style lang="less" scoped>
.article-bottom{
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    align-items: center;
    .comment-btn{
        width: 130px;
    }
}
</style>