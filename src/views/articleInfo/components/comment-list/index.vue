<template>
    <div class="comment-list">
        <van-cell :title="type==='c'?'所有回复':'全部评论'"></van-cell>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad(type)">
            <CommentItem v-for="comment in commentList" :key="comment.com_id" :comment="comment" @onCommentReply="$emit('onReplyClick',$event)"></CommentItem>
        </van-list>
    </div>
</template>

<script>
import {reqComments} from '@/api/comment'
import { Toast } from 'vant';
import CommentItem from '../comment-item/index.vue';
export default {
    name: "CommentList",
    data() {
        return {
            loading: false,
            finished: false,
            offset: null,
            limit: 10,
        };
    },
    props: {
        source: {
            type: [Number, String, Object],
            required: true,
        },
        type:{
            type:String,
            default:'a'
        },
        commentList:{
            type:Array,
            default:()=>[]
        }
    },
    methods: {
        async onLoad(type) {
            try {
                let res = await reqComments({
                    type: type,
                    source: this.source,
                    offset: this.offset,
                    limit: this.limit,
                });
                this.commentList.push(...res.data.data.results);
                this.loading = false;
                if (res.data.data.results.length)
                    this.offset = res.data.data.last_id;
                else
                    this.finished = true;
            }
            catch (error) {
                Toast.fail("加载评论失败");
            }
        },
    },
    components: { CommentItem }
}
</script>

<style lang="less" scoped>
.comment-list {
    margin-bottom: 50px;
}
</style>