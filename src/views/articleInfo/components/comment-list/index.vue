<template>
    <div class="comment-list">
        <van-cell :title="type === 'c' ? '所有回复' : '全部评论'"></van-cell>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad(type)">
            <CommentItem v-for="(comment, index) in commentList" :key="comment.commentId" :comment="comment"
                @onCommentReply="$emit('onReplyClick', $event)" @onDelCommentForList="onDelCommentForList(index,$event)" :showReply="showReply">
            </CommentItem>
        </van-list>
    </div>
</template>

<script>
import { reqComments, reqReplies } from '@/api/comment'
import { Toast } from 'vant';
import CommentItem from '../comment-item/index.vue';
export default {
    name: "CommentList",
    data() {
        return {
            loading: false,
            finished: false,
            offset: 0,
            size: 5,
        };
    },
    props: {
        source: {
            type: [Number, String, Object],
            required: true,
        },
        type: {
            type: String,
            default: 'a'
        },
        commentList: {
            type: Array,
            default: () => []
        },
        showReply: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        async onLoad(type) {
            let res = new Array()
            try {
                if (type === 'a') {
                    res = await reqComments(this.offset, this.size, this.source);
                } else if (type === 'c') {
                    res = await reqReplies(this.offset, this.size, this.source)
                }
                this.commentList.push(...res.data.comment);
                this.loading = false;
                if (res.data.comment.length)
                    this.offset += this.size
                else
                    this.finished = true;
            }
            catch (error) {
                Toast.fail("加载评论失败");
            }
        },
        onDelCommentForList(index,event){
            this.commentList.splice(index,1)
            this.$emit('onDelSuccess',event)
        }
    },
    components: { CommentItem }
}
</script>

<style lang="less" scoped>
.comment-list {
    margin-bottom: 50px;
}
</style>