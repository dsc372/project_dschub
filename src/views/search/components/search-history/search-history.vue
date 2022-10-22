<template>
    <div class="search-history-container">
        <van-cell title="搜索历史">
            <div>全部删除</div>
        </van-cell>
        <van-cell :title="history" v-for="(history,index) in searchHistory" :key="index">
            <template #right-icon>
                <van-icon name="cross" class="search-icon" color="#ccc" />
            </template>
        </van-cell>
    </div>
</template>

<script>
export default {
    name: 'search-history',
    props:{
        searchHistory:{
            type:Array,
            required:true,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>