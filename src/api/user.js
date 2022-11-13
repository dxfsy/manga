import _axios from './_axios'

export function login(data){
    return _axios({
        method:'post',
        url:`${process.env.VUE_APP_BASE_URL}/user/login`,
        data
    })  
}

export function register(data){
    return _axios({
        method:'post',
        url:`${process.env.VUE_APP_BASE_URL}/user/register`,
        data
    })  
}

export function updatePassword(data){
    return _axios({
        method:'post',
        url:`${process.env.VUE_APP_BASE_URL}/user/updatePassword`,
        data
    })  
}

export function isLogin() {
    return _axios({
        method:'get',
        url:`${process.env.VUE_APP_BASE_URL}/user/isLogin`,
    })  
}