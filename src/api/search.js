import request from "@/utils/request";

export const reqSearchSuggestion=(keyWord)=>{
    return request({
        method:'GET',
        url:'/v1_0/suggestion',
        params:{
            q:keyWord
        }
    })
}

export const reqSearchResult=(params)=>{
    return request({
        method:'GET',
        url:'/v1_0/search',
        params
    })
}