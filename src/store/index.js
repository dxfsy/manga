import Vue from 'vue'
import Vuex from 'vuex'
import detail from './modules/detail'
import search from './modules/search'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        detail,
        search
    }
})