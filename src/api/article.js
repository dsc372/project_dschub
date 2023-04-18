import request from "@/utils/request";

export const reqArticles=(offset,size,lable)=>{
    return request({
        method:'GET',
        url:`/article/getArticleListByLable?offset=${offset}&size=${size}&lable=${lable}`,
        contentType: "application/json;charset=utf-8",
    })
}

export const reqArticleInfo=(articleId)=>{
    return request({
        method:'GET',
        url:`/article/getArticleDetail/${articleId}`
    })
}

export const reqDelArticle=(articleId)=>{
    return request({
        method:'DELETE',
        url:`/article/deleteArticle/${articleId}`
    })
}

export const reqAddArticle=(data)=>{
    return request({
        method:'POST',
        url:'/article/createArticle',
        data
    })
}

export const reqAddArticlePhoto=(articleId,data)=>{
    return request({
        method:'POST',
        url:`/upload/picture/${articleId}`,
        data,
        contentType:'multipart/form-data'
    })
}

export const reqAddLike=(articleId)=>{
    return request({
        method:'POST',
        url:'/article/addArticleLike',
        data:{
            articleId
        },
        contentType: "application/json;charset=utf-8",
    })
}

export const reqDelLike=(articleId)=>{
    return request({
        method:'DELETE',
        url:`/article/delArticleLike/${articleId}`
    })
}

export const reqLikeArticles=(offset,size)=>{
    return request({
        method:'GET',
        url:`/article/getArticleListByLike?offset=${offset}&size=${size}`,
    })
}