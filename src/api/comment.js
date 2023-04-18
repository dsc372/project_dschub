import request from '@/utils/request'

export const reqComments = (offset,size,article_id)=>{
    return request({
        method:'GET',
        url:`/comment/getCommentList/${article_id}?offset=${offset}&size=${size}`,
    })
}

export const reqReplies = (offset,size,comment_id)=>{
    return request({
        method:'GET',
        url:`/comment/getReplyList/${comment_id}?offset=${offset}&size=${size}`,
    })
}

export const reqAddComment=(data)=>{
    return request({
        method:'POST',
        url:'/comment/createComment',
        data
    })
}

export const reqAddReply=(target,data)=>{
    return request({
        method:'POST',
        url:`/comment/replyComment/${target}`,
        data
    })
}

export const reqDelComment=(commentId)=>{
    return  request({
        method:'DELETE',
        url:`/comment/deleteComment/${commentId}`
    })
}