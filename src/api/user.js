import request from "@/utils/request";

export const reqLogin =(data)=>{
    return request({
        method:'POST',
        url:'/login',
        data,
        contentType: "application/json;charset=utf-8",
    })
}

export const reqUserInfo=()=>{
    return request({
        method:'GET',
        url:'/user/getUserInfo',
    })
}

export const reqChannels=()=>{
    return request({
        method:'GET',
        url:'/lable/getLableList'
    })
}

export const reqUpdateUserName=(data)=>{
    return request({
        method:'PATCH',
        url:'/user/updateUserName',
        data,
        contentType: "application/json;charset=utf-8",
    })
}

export const reqUpdateUserPhoto=(data)=>{
    return request({
        method:'PATCH',
        url:'/upload/avatar',
        data,
        contentType:'multipart/form-data'
    })
}

export const reqMyArticleList=(offset,size)=>{
    return request({
        method:'GET',
        url:`/article/getArticleListByUserId?offset=${offset}&size=${size}`
    })
}
