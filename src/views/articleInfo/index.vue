<template>
    <div class="article-container">
        <van-nav-bar class="app-nav-bar article-top" title="文章详情" left-arrow @click-left="$router.back()"></van-nav-bar>
        <h1 class="title">{{articleInfo.title}}</h1>
        <van-cell center class="user-info">
            <div slot="title" class="user-name">{{articleInfo.aut_name}}</div>
            <van-image slot="icon" round class="user-avatar" :src="articleInfo.aut_photo"></van-image>
            <div slot="label" class="pubdate">{{articleInfo.pubdate}}</div>
            <van-button size="small" class="follow-btn" @click="onFollow" :loading="isFollowLoading">{{articleInfo.is_followed?'已关注':'+ 关注'}}</van-button>
        </van-cell>
        <div class="content markdown-body" v-html="articleInfo.content" ref="article-content"></div>
        <CommentList :source="$route.params.articleId" :commentList="commentList" @onReplyClick="onReplyClick"></CommentList>
        <div class="article-bottom">
            <van-button class="comment-btn" type="default" round size="small" @click="onComment">写评论</van-button>
            <van-icon name="comment-o" :info="articleInfo.comm_count" color="#777"></van-icon>
            <van-icon :name="articleInfo.is_collected?'star':'star-o'" color="#777" @click="onCollect"></van-icon>
            <van-icon :name="articleInfo.attitude===1?'good-job':'good-job-o'" color="#777" @click="onLike"></van-icon>
            <van-icon name="share-o" color="#777" class="share-btn"></van-icon>
        </div>
        <!-- 发布评论 -->
        <van-popup v-model="showCommtentPopup" position="bottom">
            <PostComment :targetId="$route.params.articleId" @post-success="onPostSuccess"></PostComment>
        </van-popup>
        <!-- 评论回复 -->
        <van-popup v-model="showAllCommtentPopup" position="bottom">
            <CommentReply :comment="replyComment" v-if="showAllCommtentPopup" :articleId="$route.params.articleId"></CommentReply>
        </van-popup>
    </div>
</template>

<script>
import '@/views/articleInfo/github-markdown-light.css'
import {reqArticleInfo,reqAddCollect,reqDelCollect,reqAddLike,reqDelLike} from '@/api/article'
import {reqAddFollow,reqDelFollow} from '@/api/user'
import {Toast} from 'vant'
import CommentList from './components/comment-list'
import PostComment from './components/post-comment/index.vue'
import CommentReply from './components/comment-reply/index.vue'
export default {
    name: "articleInfo",
    data() {
        return {
            articleInfo: {},
            isFollowLoading: false,
            showCommtentPopup:false,
            showAllCommtentPopup:false,
            commentList:[],
            replyComment:{},
        };
    },
    methods: {
        async getArticleInfo() {
            try {
                let res = await reqArticleInfo(this.$route.params.articleId);
                this.articleInfo = res.data.data;
                this.articleId=this.articleInfo.art_id
            }
            catch (error) {
                Toast.fail("获取文章详情失败");
            }
        },
        async onFollow() {
            try {
                this.isFollowLoading = true;
                if (this.articleInfo.is_followed) {
                    await reqDelFollow(this.articleInfo.aut_id);
                }
                else {
                    await reqAddFollow(this.articleInfo.aut_id);
                }
                this.isFollowLoading = false;
                this.articleInfo.is_followed = !this.articleInfo.is_followed;
            }
            catch (error) {
                this.isFollowLoading = false;
                Toast.fail("修改关注信息失败");
            }
        },
        async onCollect() {
            try {
                Toast.loading({
                    message: "操作中",
                    forbidClick: true
                });
                if (this.articleInfo.is_collected) {
                    await reqDelCollect(this.articleInfo.art_id);
                }
                else {
                    await reqAddCollect(this.articleInfo.art_id);
                }
                Toast.success("操作成功");
                this.articleInfo.is_collected = !this.articleInfo.is_collected;
            }
            catch (error) {
                Toast.fail("修改收藏信息失败");
            }
        },
        async onLike() {
            try {
                Toast.loading({
                    message: "操作中",
                    forbidClick: true
                });
                if (this.articleInfo.attitude === 1) {
                    await reqDelLike(this.articleInfo.art_id);
                    this.articleInfo.attitude = 0;
                }
                else {
                    await reqAddLike(this.articleInfo.art_id);
                    this.articleInfo.attitude = 1;
                }
                Toast.success("操作成功");
            }
            catch (error) {
                Toast.fail("修改点赞信息失败");
            }
        },
        onComment(){
            this.showCommtentPopup=true
        },
        onPostSuccess(new_obj){
            this.showCommtentPopup=false
            this.commentList.unshift(new_obj)
            this.articleInfo.comm_count++
        },
        onReplyClick(comment){
            this.showAllCommtentPopup=true
            this.replyComment=comment
        }
    },
    created() {
        this.getArticleInfo();
    },
    components: { CommentList, PostComment, CommentReply }
}
</script>

<style lang="less" scoped>
.article-top{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
.title {
    margin: 46px 0 0 0;
    padding: 14px;
    font-size: 20px;
    color: #3a3a3a;
    background-color: #fff;
}

.user-info {
    .user-avatar {
        width: 35px;
        height: 35px;
        margin-right: 10px;

    }

    .user-name {
        font-size: 15px;
        color: #333;
    }

    .pubdate {
        margin-top: -7px;
        font-size: 12px;
        color: #b4b4b4;
    }
    .follow-btn{
        width: 60px;
        height: 25px;
    }
}

.markdown-body {
    padding: 14px;
    background-color: #fff;
}

.article-bottom{
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    align-items: center;
    .comment-btn{
        margin-left: 10px;
        width: 130px;
    }
    .share-btn{
        margin-right: 13px;
    }
}
</style>