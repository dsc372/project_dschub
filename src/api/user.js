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