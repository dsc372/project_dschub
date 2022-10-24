import request from "@/utils/request";

export const reqArticles=(params)=>{
    return request({
        method:'GET',
        url:'/v1_0/articles',
        params
    })
}

export const reqArticleInfo=(articleId)=>{
    return request({
        method:'GET',
        url:`/v1_0/articles/${articleId}`
    })
}

export const reqAddCollect=(articleId)=>{
    return request({
        method:'POST',
        url:'/v1_0/article/collections',
        data:{
            target:articleId
        }
    })
}

export const reqDelCollect=(articleId)=>{
    return request({
        method:'DELETE',
        url:`/v1_0/article/collections/${articleId}`
    })
}

export const reqAddLike=(articleId)=>{
    return request({
        method:'POST',
        url:'/v1_0/article/likings',
        data:{
            target:articleId
        }
    })
}

export const reqDelLike=(articleId)=>{
    return request({
        method:'DELETE',
        url:`/v1_0/article/likings/${articleId}`
    })
}