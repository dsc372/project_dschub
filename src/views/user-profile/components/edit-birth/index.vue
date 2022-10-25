<template>
    <div>
        <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate"
            @cancel="onCancel" @confirm="onConfirm"/>
    </div>
</template>

<script>
import { reqUpdateUserProfile } from '@/api/user'
import { Toast } from 'vant';
export default {
    name: 'EditBirth',
    prop: {
        preBirth: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            minDate: new Date(1900, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(),
        };
    },
    methods: {
        onCancel() {
            this.$emit('onClose')
        },
        async onConfirm(value) {
            try {
                Toast.loading({
                    message: "操作中",
                    forbidClick: true
                });
                let newBirth=`${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()}`
                await reqUpdateUserProfile({ birthday: newBirth })
                this.$emit('editBirthSuccess',newBirth)
                Toast.success("操作成功");
            }
            catch (error) {
                Toast.fail("修改生日信息失败");
            }
        },
    }
}
</script>

<style lang="less" scoped>

</style>