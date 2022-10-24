import request from '@/utils/request'

export const reqComments = (params)=>{
    return request({
        method:'GET',
        url:'/v1_0/comments',
        params
    })
}

export const reqAddComment=(data)=>{
    return request({
        method:'POST',
        url:'/v1_0/comments',
        data
    })
}

export const reqAddCommentLike=(commentId)=>{
    return request({
        method:'POST',
        url:'/v1_0/comment/likings',
        data:{
            target:commentId
        }
    })
}

export const reqDelCommentLike=(commentId)=>{
    return request({
        method:'DELETE',
        url:`/v1_0/comment/likings/${commentId}`
    })
}