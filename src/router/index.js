import Vue from 'vue'
import VueRouter from 'vue-router'
import browser from '../utils/browser'

Vue.use(VueRouter)

// 解决重复路由的报错
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}



// 判断用户是PC端还是移动端
let device
if (browser().mobile || browser().android || browser.ios || document.body.clientWidth < 787) { // 判断是否是移动端
    console.log('这里是移动端')
    device = 'H5'
} else {
    console.log('这里是pc端')
    device = 'PC'
}
Vue.prototype.$device = device

let routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import(`../pages/${device}/homePage.vue`),
    },
    {
        path: '/detail',
        component: () => import(`../pages/${device}/detailPage.vue`)
    },
    {
        path: '/comic',
        component: () => import(`../pages/${device}/comicPage.vue`)
    },
    {
        path: '/label',
        component: () => import(`../pages/${device}/labelPage.vue`)
    },
    {
        path: '/search',
        component: () => import(`../pages/${device}/searchPage.vue`)
    },
    {
        path: '/login',
        component: () => import(`../pages/${device}/loginPage.vue`)
    },
    {
        path: '/register',
        component: () => import(`../pages/${device}/registerPage.vue`)
    },
    {
        path: '/forget',
        component: () => import(`../pages/${device}/forgetPage.vue`)
    },
    {
        path: '/collect',
        component: () => import(`../pages/${device}/collectPage.vue`)
    },
    {
        path: '/history',
        component: () => import(`../pages/${device}/historyPage.vue`)
    },
    {
        path: '/safe',
        component: () => import(`../pages/${device}/safePage.vue`)
    },
    {
        path: '/404',
        component: () => import(`../pages/${device}/page404.vue`)
    }
]

if(device === 'H5') {
    routes = [
        ...routes,
        {
            path:'/updatePassword',
            component: ()=>import(`../pages/H5/userUpdatePassword.vue`)
        }
    ]
}

const router = new VueRouter({
    mode: 'hash',
    routes
})



export default router