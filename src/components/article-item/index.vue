<template>
    <van-cell class="article-item" :to="{name:'article',params:{articleId:article.art_id}}">
        <div slot="title" class="title van-multi-ellipsis--l3">{{article.title}}</div>
        <div slot="label">
            <div class="cover-wrap" v-if="article.cover.type===3">
                <div class="cover-wrap-item" v-for=" (img,index) in article.cover.images" :key="index">
                    <van-image :src="img" fit="cover" class="cover-item"></van-image>
                </div>
            </div>
            <div class="label-wrap">
                <span>{{article.aut_name}}</span>
                <span>{{article.comm_count}}评论</span>
                <span>{{article.pubdate}}</span>
            </div>
        </div>
        <van-image v-if="article.cover.type===1" class="right-cover" :src="article.cover.images[0]" fit="cover">
        </van-image>
    </van-cell>
</template>

<script>
export default {
    name: 'article-item',
    props: {
        article: {
            type: Object,
            required: true,
        }
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