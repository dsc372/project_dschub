<template>
    <div class="create-body">
        <van-nav-bar title="发表文章" left-text="返回" right-text="确认" left-arrow @click-left="onClickLeft"
            @click-right="onClickRight" />
        <div>
            <div class="create-filed">
                <van-field v-model="title" maxlength="25" placeholder="请输入文章标题" label="标题" show-word-limit autosize />
            </div>
            <div class="create-filed">
                <van-field v-model="content" rows="7" maxlength="1000" type="textarea" placeholder="请输入文章内容" label="内容"
                    show-word-limit />
            </div>
            <div class="create-filed">
                <van-field v-model="fieldValue" is-link readonly label="标签" placeholder="请选择文章标签"
                    @click="showPopup = true" />
                <van-popup v-model="showPopup" round position="bottom">
                    <van-cascader v-model="cascaderValue" title="请选择文章标签" :options="lables" @close="showPopup = false"
                        @finish="onFinish" />
                </van-popup>
            </div>
            <div class="create-filed">
                <van-uploader v-model="fileList" multiple :max-count="3" :disabled="fileList.length === 3" />
            </div>
        </div>
    </div>
</template>

<script>
import { reqAllChannels } from '@/api/channel'
import { reqAddArticle, reqAddArticlePhoto } from '@/api/article'
import { Toast } from 'vant';
export default {
    name: 'create-article',
    data() {
        return {
            title: '',
            content: '',
            fieldValue: '',
            cascaderValue: '文章标签',
            showPopup: false,
            lables: [],
            fileList: [],
        }
    },
    methods: {
        async onClickRight() {
            try {
                Toast.loading({
                    message: "操作中",
                    forbidClick: true
                });

                if(this.title===''){
                    Toast.fail("标题不能为空");
                    return
                }else if(this.content===''){
                    Toast.fail("内容不能为空");
                    return
                }else if(this.fieldValue===''){
                    Toast.fail("标签不能为空");
                    return
                }

                const res = await reqAddArticle({
                    title: this.title,
                    content: this.content,
                    lable: this.fieldValue
                })
                const articleId = res.data.articleId

                if (this.fileList.length > 0) {
                    const fd = new FormData()
                    this.fileList.forEach(item => {
                        fd.append('picture', item.file)
                    })
                    await reqAddArticlePhoto(articleId, fd)
                }

                this.title = ''
                this.content = '',
                    this.fieldValue = ''
                Toast.success('文章发表成功')
                this.$emit('onClose',true)
            }
            catch (error) {
                Toast.fail("修改昵称失败");
            }
        },
        onClickLeft() {
            this.$emit('onClose',false)
        },
        onFinish({ selectedOptions }) {
            this.showPopup = false;
            this.fieldValue = selectedOptions.map((option) => option.text).join('/');
        },
        async onGetAllLables() {
            try {
                let res = await reqAllChannels()
                const allLables = res.data.allLables
                allLables.forEach(item => {
                    this.lables.push({ text: item })
                })
            } catch (error) {
                Toast.fail('获取全部标签信息失败')
            }
        }
    },
    created() {
        this.onGetAllLables()
    }
}
</script>

<style lang="less" scoped>
.create-body {
    height: 100%;
    background-color: #eee;

    /deep/.van-field__label {
        width: 40px;
    }

    .create-filed {
        padding: 10px;
    }
}
</style>