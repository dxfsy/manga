import axios from "axios";
import router from '../router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const _axios =axios.create();


//拦截器，在请求或响应被 then 或 catch 处理前拦截它们
_axios.interceptors.request.use(config=>{
  // const token = sessionStorage.getItem("token");
  // if(token){
  //   Object.assign(config.headers,{
  //     Token:token
  //   })
  // }else{
  //   sessionStorage.removeItem("token");
  //   window.location.href = "/login";
  // }
  // 开启进度条
  NProgress.start()
  return config;
});
//响应拦截器
_axios.interceptors.response.use(res=>{
  if(res.data && res.data.data && (res.data.data.code === 404)){
    router.push({path:'/404'})
    NProgress.done()
    return;
  }
  // 关闭进度条
  NProgress.done()
  return res;
},err=>Promise.reject(error))

export default _axios