<template>
    <div class="search-container">
        <form action="/">
            <van-search v-model="searchText" placeholder="请输入搜索关键字" show-action @cancel="onCancel" @focus="isResultShow=false" @input="onInput"></van-search>
        </form>
        <search-result v-if="isResultShow" :searchText="searchText"></search-result>
        <search-suggestion v-else-if="searchText" :searchSuggestionList="searchSuggestion" :searchText="searchText" @search="onSearch"></search-suggestion>
        <search-history v-else :searchHistory="searchHistory" @search="onSearch"></search-history>
    </div>
</template>

<script>
import SearchHistory from './components/search-history/search-history.vue';
import SearchResult from './components/search-result/search-result.vue';
import searchSuggestion from './components/search-suggestion/search-suggestion.vue';
import {setItem,getItem} from '@/utils/storage'
import { reqAllChannels} from '@/api/channel'
import {debounce} from 'lodash'
export default {
    name: 'search',
    components: { searchSuggestion, SearchHistory, SearchResult },
    data() {
        return {
            searchText:'',
            searchSuggestion: [],
            searchHistory:getItem('search-history')||[],
            isResultShow: false,
            allSearchSuggestion:[]
        }
    },
    methods: {
        onSearch(searchText) {
            this.searchText=searchText
            const index =this.searchHistory.indexOf(searchText)
            if(index!==-1){
                this.searchHistory.splice(index,1)
            }
            this.searchHistory.unshift(searchText)
            setItem('search-history',this.searchHistory)
            this.isResultShow = true
        },
        onInput:debounce(async function(val) {
            if (this.searchText !== '') {
                this.searchSuggestion.length=0
                if(this.allSearchSuggestion.indexOf(val)!==-1){
                    this.searchSuggestion.push(val)
                }
            }
        },500),
        onCancel(){
            this.searchText='',
            this.isResultShow=false
            this.$router.back()
        },
        async onGetAllSearchSuggestion(){
            const res = await reqAllChannels()
            this.allSearchSuggestion  = res.data.allLables
        }
    },
    created(){
        this.onGetAllSearchSuggestion()
    }
}
</script>

<style lang="less" scoped>
.search-result {
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
}
</style>