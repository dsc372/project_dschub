import request from "@/utils/request";

export const reqAllChannels=()=>{
    return request({
        method:'GET',
        url:'/lable/getAllLables'
    })
}

export const reqAddChannels=(data)=>{
    return request({
        method:'POST',
        url:'/lable/addLable',
        data,
        contentType: "application/json;charset=utf-8"
    })
}

export const reqDelChannels=(data)=>{
    return request({
        method:'DELETE',
        url:'/lable/deleteLable',
        data,
        contentType: "application/json;charset=utf-8"
    })
}