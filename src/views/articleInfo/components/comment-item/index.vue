<template>
    <van-cell class="comment-item-container">
        <van-image class="comment-item-img" round :src="comment.aut_photo" slot="icon"></van-image>
        <div slot="title">
            <div class="comment-item-title-top">
                <div class="comment-item-aut-name">{{comment.aut_name}}</div>
                <div class="comment-item-like">
                    <van-icon :name="comment.is_liking?'good-job':'good-job-o'" color="#999" @click="onLike"></van-icon>
                    <span>&nbsp;{{comment.like_count}}</span>
                </div>
            </div>
            <div class="comment-item-content">{{comment.content}}</div>
            <div class="comment-item-bottom">
                <span class="comment-item-pubdate">{{comment.pubdate}}</span>
                <span class="comment-item-reply" @click="$emit('onCommentReply',comment)">查看全部{{comment.reply_count}}条回复</span>
            </div>
        </div>
    </van-cell>
</template>

<script>
import {reqAddCommentLike,reqDelCommentLike} from '@/api/comment'
import {Toast} from 'vant'
export default {
    name: 'Comment-item',
    props: {
        comment: {
            type: Object,
            required: true,
        }
    },
    data(){
        return{
        }
    },
    methods:{
        async onLike() {
            console.log(1)
            try {
                Toast.loading({
                    message: "操作中",
                    forbidClick: true
                });
                if (this.comment.is_liking) {
                    await reqDelCommentLike(this.comment.com_id);
                    this.comment.is_liking = false;
                    this.comment.like_count--
                }
                else {
                    await reqAddCommentLike(this.comment.com_id);
                    this.comment.is_liking = true;
                    this.comment.like_count++
                }
                Toast.success("操作成功");
            }
            catch (error) {
                Toast.fail("修改点赞信息失败");
            }
        }
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
    }

    .comment-item-reply {
        font-size: 10px;
        color: #999;
    }

}
</style>