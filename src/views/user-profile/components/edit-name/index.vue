<template>
    <div>
        <van-nav-bar title="修改昵称" left-text="返回" right-text="确认" left-arrow @click-left="onClickLeft"
            @click-right="onClickRight" />
        <div class="edit-name-filed">
            <van-field v-model="message" rows="1" maxlength="15" type="textarea" placeholder="请输入新昵称" />
        </div>

    </div>
</template>

<script>
import { reqUpdateUserName } from '@/api/user'
import { Toast } from 'vant';
export default {
    name: 'EditName',
    props: {
        preName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            message: this.preName,
        }
    },
    methods: {
        async onClickRight() {
            try {
                Toast.loading({
                    message: "操作中",
                    forbidClick: true
                });
                await reqUpdateUserName({ newName: this.message })
                this.$emit('editNameSuccess', this.message)
                Toast.success("操作成功");
            }
            catch (error) {
                if (error && error.response && error.response.status === 409) {
                    Toast.fail("该昵称已存在");
                } else {
                    Toast.fail("修改昵称失败");
                }

            }
        },
        onClickLeft(){
            this.$emit('onClose')
        }
    },
}
</script>

<style lang="less" scoped>
.edit-name-filed {
    padding: 10px;
}
</style>