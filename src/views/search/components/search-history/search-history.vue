<template>
    <div class="search-history-container">
        <van-cell title="搜索历史">
            <div @click="onDelete('all')">全部删除</div>
        </van-cell>
        <van-cell :title="history" v-for="(history,index) in searchHistory" :key="index" @click="$emit('search',history)">
            <template #right-icon>
                <van-icon name="cross" class="search-icon" color="#ccc" @click="onDelete(index)"/>
            </template>
        </van-cell>
    </div>
</template>

<script>
import {setItem} from '@/utils/storage'
export default {
    name: 'search-history',
    props:{
        searchHistory:{
            type:Array,
            required:true,
        }
    },
    methods:{
        onDelete(index){
            if(index==='all')this.searchHistory.splice(0,this.searchHistory.length)
            else this.searchHistory.splice(index,1)
            setItem('search-history',this.searchHistory)
        }
    }
}
</script>

<style lang="less" scoped>
/deep/ .van-icon::before {
    vertical-align: middle;
}
</style>