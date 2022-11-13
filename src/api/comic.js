import _axios from './_axios'

export function homeList(){
    return _axios({
        method:'get',
        url:`${process.env.VUE_APP_BASE_URL}/comic/home`
    })  
}

export function labelList(){
    return _axios({
        method:'get',
        url:`${process.env.VUE_APP_BASE_URL}/comic/labels`
    })
}

export function detailList(data){
    return _axios({
        method:'post',
        url:`${process.env.VUE_APP_BASE_URL}/comic/detail`,
        data
    })
}

export function getComic(data){
    return _axios({
        method:'post',
        url:`${process.env.VUE_APP_BASE_URL}/comic/page`,
        data
    })
}

export function searchList({title,page}){
    return _axios({
        method:'get',
        url:`${process.env.VUE_APP_BASE_URL}/comic/search?title=${title}&page=${page}`
    })
}

export function labels(){
    return _axios({
        method:'get',
        url:`${process.env.VUE_APP_BASE_URL}/comic/labels`
    })
}

export function labelListData(data){
    return _axios({
        method:'post',
        url:`${process.env.VUE_APP_BASE_URL}/comic/label`,
        data
    })
}

export function chapterList(data){
    return _axios({
        method:'post',
        url:`${process.env.VUE_APP_BASE_URL}/comic/chapter`,
        data
    })
}

