<template>
    <div class="article-container">
        <van-nav-bar class="app-nav-bar article-top" title="文章详情" left-arrow @click-left="$router.back()"></van-nav-bar>
        <h1 class="title">{{ articleInfo.title }}</h1>
        <van-cell center class="user-info">
            <div slot="title" class="user-name">{{ author.name }}</div>
            <van-image slot="icon" round class="user-avatar" :src="author.avatar_url"></van-image>
            <div slot="label" class="pubdate">
                {{ articleInfo.updateAt }}
                <span class="del-article" v-if="userId && userId === author.id"
                    @click.stop="onDelArticle(articleInfo.articleId)">删除</span>
            </div>
            <van-button size="small" class="follow-btn" @click="onFollow" :loading="isFollowLoading">{{ showFollow ? '已关注' : '+关注'}}</van-button>
        </van-cell>
        <div class="content markdown-body" v-html="articleInfo.content" ref="article-content"></div>
        <div class="img-list" v-if="articleInfo.images">
            <div class="img-item" v-for=" (img, index) in articleInfo.images" :key="index">
                <van-image :src="img" fit="cover" class="img"></van-image>
            </div>
        </div>
        <CommentList :source="$route.params.articleId" :commentList="commentList" @onReplyClick="onReplyClick"
            @onDelSuccess="onDelSuccess"></CommentList>
        <div class="article-bottom">
            <van-button class="comment-btn" type="default" round size="small" @click="onComment">写评论</van-button>
            <van-icon name="comment-o" :info="articleInfo.commentCount" color="#777"></van-icon>
            <van-icon :name="showCollect ? 'star' : 'star-o'" color="#777" @click="onCollect"></van-icon>
            <van-icon :name="showLike ? 'good-job' : 'good-job-o'" color="#777" :info="articleInfo.likeCount"
                @click="onLike"></van-icon>
            <van-icon name="share-o" color="#777" class="share-btn"></van-icon>
        </div>
        <!-- 发布评论 -->
        <van-popup v-model="showCommtentPopup" position="bottom">
            <PostComment :targetId="$route.params.articleId" type="a" @post-success="onPostSuccess"></PostComment>
        </van-popup>
        <!-- 评论回复 -->
        <van-popup v-model="showAllCommtentPopup" position="bottom" :style="{ height: '70%' }">
            <CommentReply :comment="replyComment" v-if="showAllCommtentPopup" :articleId="$route.params.articleId"
                @post-success="onPostSuccess" @onDelSuccess="onDelSuccess"></CommentReply>
        </van-popup>
    </div>
</template>

<script>
import '@/views/articleInfo/github-markdown-light.css'
import { getItem } from '@/utils/storage';
import { reqAddLike, reqArticleInfo, reqDelArticle, reqDelLike } from '@/api/article'
import { Toast } from 'vant'
import CommentList from './components/comment-list'
import PostComment from './components/post-comment/index.vue'
import CommentReply from './components/comment-reply/index.vue'
export default {
    name: "articleInfo",
    data() {
        return {
            articleInfo: {},
            author: {},
            isFollowLoading: false,
            showCommtentPopup: false,
            showAllCommtentPopup: false,
            commentList: [],
            replyComment: {},
            showFollow: false,
            showLike: false,
            showCollect: false,
            userId: null
        };
    },
    methods: {
        async getArticleInfo() {
            try {
                let res = await reqArticleInfo(this.$route.params.articleId);
                this.articleInfo = res.data.articleDetail;
                this.author = this.articleInfo.author
                this.articleId = this.articleInfo.articleId
                this.showLike = this.articleInfo.isLiked === 1
            }
            catch (error) {
                Toast.fail("获取文章详情失败");
            }
        },
        onDelArticle(articleId) {
            this.$dialog.confirm({
                message: '是否确认删除',
            })
                .then(async () => {
                    // on confirm
                    await reqDelArticle(articleId)
                    this.$router.back()
                })
                .catch(() => {
                    // on cancel
                });
        },
        async onFollow() {
            try {
                this.isFollowLoading = true;
                this.showFollow = !this.showFollow
                this.isFollowLoading = false;
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
                this.showCollect = !this.showCollect
                Toast.success("操作成功");
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
                if (!this.showLike) {
                    await reqAddLike(this.articleInfo.articleId)
                    this.articleInfo.likeCount++
                } else {
                    await reqDelLike(this.articleInfo.articleId)
                    this.articleInfo.likeCount--
                }
                this.showLike = !this.showLike
                Toast.success("操作成功");
            }
            catch (error) {
                Toast.fail("修改点赞信息失败");
            }
        },
        onComment() {
            this.showCommtentPopup = true
        },
        onPostSuccess(commentInfo = null) {
            this.showCommtentPopup = false
            if (commentInfo) {
                this.commentList.unshift(commentInfo)
            }
            this.articleInfo.commentCount++
        },
        onReplyClick(comment) {
            this.showAllCommtentPopup = true
            this.replyComment = comment
        },
        onDelSuccess(replyCount) {
            this.articleInfo.commentCount-=(replyCount+1)
        }
    },
    created() {
        this.getArticleInfo();
        this.userId = getItem('userId')
    },
    components: { CommentList, PostComment, CommentReply }
}
</script>

<style lang="less" scoped>
.article-top {
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
        width: 200px;
        margin-top: -7px;
        font-size: 12px;
        color: #b4b4b4;
    }

    .del-article {
        margin-left: 7px;
        font-size: 12px;
        color: #b4b4b4;
    }

    .follow-btn {
        width: 60px;
        height: 25px;
    }
}

.markdown-body {
    padding: 14px;
    background-color: #fff;
}

.img-list {
    padding: 10px;
    background-color: #fff;

    .img-item {
        .img {
            margin-bottom: 10px;
        }
    }
}

.article-bottom {
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

    .comment-btn {
        margin-left: 10px;
        width: 130px;
    }

    .share-btn {
        margin-right: 13px;
    }
}</style>