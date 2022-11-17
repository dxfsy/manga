import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/index'
import 'font-awesome/css/font-awesome.css' //字体图标库
import _ from 'lodash'
import { getSessionStorage } from './utils/sessionStorage'
import { getLocalStorage } from './utils/localStorage'
Vue.prototype._ = _

Vue.config.productionTip = false

// 路由守卫
router.beforeEach(async (to,from,next)=> {
  if(to.path=='/detail') {
      await store.dispatch('detail/setDetailData',to.query.comicId)
      next()
  }else if(to.path=='/search') {
    console.log(to.query);
    await store.dispatch('search/setSearchList',{
      title: to.query.key,
      page: to.query.page
    })
    next()
  }else if(to.path=='/collect' || to.path=='/history' || to.path=='/safe'){
    let user = getSessionStorage('user') || getLocalStorage('user')
    if(user!==null && getSessionStorage('isLogin')) {
      next()
    }else {
      router.push({path:'/login'})
    }
  }else {
    console.log(to);next()
  }
})

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
