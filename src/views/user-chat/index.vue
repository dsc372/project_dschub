<template>
    <div>
        <van-nav-bar class="app-nav-bar" title="小智同学" left-arrow @click-left="$router.back()"></van-nav-bar>
        <van-cell-group class="message-list" ref="messageList">
            <van-cell v-for="msg in messageList" :key="msg.timestamp" :title="msg.msg" />
        </van-cell-group>
        <van-cell-group class="bottom">
            <van-field v-model="currentMessage" placeholder="请输入消息内容" :border="false" />
            <van-button size="small" class="button" @click="onSend">发送</van-button>
        </van-cell-group>
    </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem,setItem } from '@/utils/storage'
import { Toast } from 'vant'
export default {
    name: 'UserChat',
    data() {
        return {
            currentMessage: '',
            socket: null,
            messageList: getItem('messageList')||[],
        }
    },
    watch:{
        messageList(){
            setItem('messageList',this.messageList)
            this.$nextTick(()=>{
                this.scrollToBottom()//消息列表滚动到底部
            })
        }
    },
    methods: {
        onSend() {
            const msg = {
                msg: this.currentMessage,
                timestamp: Date.now()
            }
            this.socket.emit('message', msg)
            this.messageList.push(msg)
            this.currentMessage=''
        },
        scrollToBottom(){
            const list=this.$refs['messageList']
            list.scrollTop=list.scrollHeight
        }
    },
    created() {
        const socket = io('http://toutiao.itheima.net', {
            query: {
                token: getItem('user')
            },
            transports: ['websocket']
        })
        this.socket = socket
        socket.on('connect', () => {
            Toast.success('小智同学连接成功')
        }) 
        socket.on('message', (data) => {
            this.messageList.push(data)
        })
        socket.on('disconnect', () => {
            Toast.success('小智同学断开连接成功')
        })
    },
    beforeDestroy(){
        this.socket.disconnect()
    }
}
</script>

<style lang="less" scoped>
.message-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
}

.bottom {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 8px;

    .button {
        width: 60px;
        background-color: #333;
        color: #fff;
    }
}
</style>