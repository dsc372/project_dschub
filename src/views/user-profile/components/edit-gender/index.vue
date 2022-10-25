<template>
    <div>
        <van-picker cancel-button-text="取消" show-toolbar :columns="columns" title="修改性别" @confirm="onConfirm"
            @cancel="onCancel" :default-index="genderIndex" />
    </div>
</template>

<script>
import { Toast } from 'vant';
import { reqUpdateUserProfile } from '@/api/user'
export default {
    name: 'EditGender',
    data() {
        return {
            columns: ['男', '女'],
        };
    },
    props: {
        genderIndex: {
            type: Number,
            required: true,
        }
    },
    methods: {
        async onConfirm(value, index) {
            try {
                Toast.loading({
                    message: "操作中",
                    forbidClick: true
                });
                await reqUpdateUserProfile({ gender: index })
                this.$emit('editGenderSuccess', index)
                Toast.success("操作成功");
            }
            catch (error) {
                Toast.fail("修改性别信息失败");
            }
        },
        onCancel() {
            this.$emit('onClose')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>