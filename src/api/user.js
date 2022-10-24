import request from "@/utils/request";

export const reqLogin =(data)=>{
    return request({
        method:'POST',
        url:'/v1_0/authorizations',
        data
    })
}

export const reqCode =(mobile)=>{
    return request({
        method:'GET',
        url:`/v1_0/sms/codes/${mobile}`
    })
}

export const reqUserInfo=(token)=>{
    return request({
        method:'GET',
        url:'/v1_0/user',
    })
}

export const reqChannels=()=>{
    return request({
        method:'GET',
        url:'/v1_0/user/channels'
    })
}

export const reqAddFollow=(userId)=>{
    return request({
        method:'POST',
        url:'/v1_0/user/followings',
        data:{
            target:userId
        }
    })
}

export const reqDelFollow=(userId)=>{
    return request({
        method:'DELETE',
        url:`/v1_0/user/followings/${userId}`
    })
}
