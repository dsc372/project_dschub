<template>
    <div class="search-result">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="res in searchResult" :key="res.art_id" :title="res.title" />
        </van-list>
    </div>
</template>

<script>
import {reqSearchResult} from '@/api/search'
import { Toast } from 'vant'
export default {
    name: 'search-result',
    data() {
        return {
            searchResult: [],
            loading: false,
            finished: false,
            page:1,
            prePage:10
        }
    },
    props:{
        searchText:{
            type:String,
            required:true
        }
    },
    methods: {
    async onLoad() {
      try {
        const res=await reqSearchResult({
            page:this.page,//页码
            per_page:this.prePage,//没页大小
            q:this.searchText,
        })
        this.searchResult.push(...res.data.data.results)
        this.loading=false
        if(res.data.data.results.length){//本次请求还有数据
            this.page++
        }else{
            this.finished=true
        }
      } catch (error) {
        Toast.fail('获取搜索结果失败')
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>