<template>
    <van-cell class="comment-item-container">
        <van-image class="comment-item-img" round :src="comment.author.avatar_url" slot="icon"></van-image>
        <div slot="title">
            <div class="comment-item-title-top">
                <div class="comment-item-aut-name">{{comment.author.name}}</div>
                <div class="comment-item-like">
                    <van-icon :name="showLike?'good-job':'good-job-o'" color="#999" @click="onLike"></van-icon>
                    <span>&nbsp;{{showLike?1:0}}</span>
                </div>
            </div>
            <div class="comment-item-content">{{comment.content}}</div>
            <div class="comment-item-bottom">
                <span class="comment-item-pubdate">{{comment.updateAt}}</span>
                <span class="comment-item-del" v-if="userId&&userId===comment.author.id" @click.stop="onDelComment(comment.commentId)">删除</span>
                <span v-if="showReply" class="comment-item-reply" @click="$emit('onCommentReply',comment)">查看全部{{comment.replyCount||0}}条回复</span>
            </div>
        </div>
    </van-cell>
</template>

<script>
import {Toast} from 'vant'
import { getItem } from '@/utils/storage';
import {reqDelComment} from '@/api/comment'
export default {
    name: 'Comment-item',
    props: {
        comment: {
            type: Object,
            required: true,
        },
        showReply: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return{
            showLike:false,
            userId:null
        }
    },
    methods:{
        async onLike() {
            try {
                Toast.loading({
                    message: "操作中",
                    forbidClick: true
                });
                this.showLike=!this.showLike
                Toast.success("操作成功");
            }
            catch (error) {
                Toast.fail("修改点赞信息失败");
            }
        },
        onDelComment(commentId){
            this.$dialog.confirm({
                message: '是否确认删除',
            })
                .then(async() => {
                    // on confirm
                    const res=await reqDelComment(commentId)
                    this.$emit('onDelCommentForList',res.data.replyCount)
                })
                .catch(() => {
                    // on cancel
                });
        }
    },
    created(){
        this.userId=getItem('userId')
    }
}
</script>

<style lang="less" scoped>
.comment-item-container {
    .comment-item-img {
        margin-right: 10px;
        width: 36px;
        height: 36px;
    }

    .comment-item-title-top {
        display: flex;
        justify-content: space-between;
    }

    .comment-item-aut-name {
        font-size: 14px;
        color: #406599;
    }

    .comment-item-content {
        font-size: 16px;
        color: #222;
    }
    .comment-item-like{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;
    }

    .comment-item-bottom {
        display: flex;
        justify-content: space-between;
    }

    .comment-item-pubdate {
        font-size: 10px;
        color: #999;
    }
    .comment-item-del{
        margin-left: -30px;
        font-size: 10px;
        color: #999;
    }

    .comment-item-reply {
        font-size: 10px;
        color: #999;
    }

}
</style>