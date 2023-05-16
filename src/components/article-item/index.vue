<template>
    <van-cell class="article-item" :to="{ name: 'article', params: { articleId: article.articleId } }">
        <div slot="title" class="title van-multi-ellipsis--l3">{{ article.title }}</div>
        <div slot="label">
            <div class="cover-wrap" v-if="article.images && article.images.length === 3">
                <div class="cover-wrap-item" v-for=" (img, index) in article.images" :key="index">
                    <van-image :src="img" fit="cover" class="cover-item"></van-image>
                </div>
            </div>
            <div class="label-wrap">
                <span>{{ article.author.name }}</span>
                <span>{{ article.lable }}</span>
                <span>{{ article.commentCount }}评论</span>
                <span>{{ article.likeCount }}点赞</span>
                <br v-if="article.images && (article.images.length === 1 || article.images.length === 2)">
                <span>{{ article.updateAt }}</span>
                <span v-if="userId&&userId===article.author.id" @click.stop="onDelArticle(article.articleId)">删除</span>
            </div>
        </div>
        <van-image v-if="article.images && (article.images.length === 1 || article.images.length === 2)" class="right-cover"
            :src="article.images[0]" fit="cover">
        </van-image>
    </van-cell>
</template>

<script>
import { getItem } from '@/utils/storage';
import { reqDelArticle } from '@/api/article';
export default {
    name: 'article-item',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showPopover: false,
            actions: ['查看详情', '删除'],
            userId:null
        }
    },
    methods: {
        onDelArticle(articleId){
            this.$dialog.confirm({
                message: '是否确认删除',
            })
                .then(async() => {
                    // on confirm
                    await reqDelArticle(articleId)
                    this.$emit('onDelActicle')
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
.article-item {
    .title {
        font-size: 16px;
        color: #3a3a3a;
    }

    /deep/ .van-cell__value {
        flex: unset;
        margin-left: 12px;
        height: 73px;
    }

    .right-cover {
        width: 116px;
        height: 73px;
    }

    .cover-wrap {
        display: flex;
        margin: 15px 0;

        .cover-wrap-item {
            flex: 1;
            height: 73px;

            &:not(:last-child) {
                padding-right: 5px;
            }
        }

        .cover-item {
            width: 100%;
            height: 100%;
        }
    }

    .label-wrap {
        font-size: 11px;
        color: #b4b4b4;
    }

    .label-wrap span {
        margin-right: 12px;
    }
}
</style>