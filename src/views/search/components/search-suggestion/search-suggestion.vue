<template>
    <div class="search-suggestion-history">
        <van-cell v-if="searchSuggestionList.length===0" title="暂无搜索建议" icon="search"></van-cell>
        <van-cell v-for="(suggestion,index) in searchSuggestionList" :key="index" icon="search" @click="$emit('search',suggestion)">
            <div slot="title" v-html="highlight(suggestion)||'暂无搜索建议'"></div>
        </van-cell>
    </div>
</template>

<script>
export default {
    name: 'search-suggestion',
    props: {
        searchSuggestionList: {
            type: Array,
            required: true
        },
        searchText: {
            type: String,
            required: true,
        }
    },
    methods: {
        highlight(val) {
            return val?val.replace(new RegExp(this.searchText, 'gi'), `<span style="color:red;">${this.searchText}</span>`):val
        }
    }
}
</script>
<style lang="scss" scoped>

</style>