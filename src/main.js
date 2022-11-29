import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/index'
import 'font-awesome/css/font-awesome.css' //字体图标库
import _ from 'lodash'
import { getSessionStorage } from './utils/sessionStorage'
import { getLocalStorage } from './utils/localStorage'
import browser from './utils/browser'

Vue.prototype._ = _

Vue.config.productionTip = false

// 路由守卫
router.beforeEach(async (to, from, next) => {
  if (to.path == '/detail') {
    await store.dispatch('detail/setDetailData', to.query.comicId)
    next()
  } else if (to.path == '/search') {
    console.log(to.query);
    // 判断是否是移动端
    if (browser().mobile || browser().android || browser.ios || document.body.clientWidth < 787) { // 判断是否是移动端
      // 是移动端
      if (from.path == '/detail') {
        await store.dispatch('search/setSearchList', {
          title: to.query.key,
          page: to.query.page
        })
      }
    }
    else {
      await store.dispatch('search/setSearchList', {
        title: to.query.key,
        page: to.query.page
      })
    }
    next()
  } else if (to.path == '/collect' || to.path == '/history' || to.path == '/safe') {
    let user = getSessionStorage('user') || getLocalStorage('user')
    if (user !== null && getSessionStorage('isLogin')) {
      next()
    } else {
      router.push({ path: '/login' })
    }
  } else {
    console.log(to); next()
  }
})

new Vue({
  render: h => h(App),
  store,
  router,
  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
