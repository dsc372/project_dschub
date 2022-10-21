import request from "@/utils/request";

export const reqAllChannels=()=>{
    return request({
        method:'GET',
        url:'/v1_0/channels'
    })
}

export const reqAddChannels=(data)=>{
    return request({
        method:'PATCH',
        url:'/v1_0/user/channels',
        data
    })
}

export const reqDelChannels=(id)=>{
    return request({
        method:'DELETE',
        url:`/v1_0/user/channels/${id}`
    })
}