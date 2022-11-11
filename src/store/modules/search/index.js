import { searchList } from "../../../api/request";

const state = {
    searchList:[],
    searchKey:''
};
const mutations = {
    set_Search_List(state,list){
        state.searchList = list
    },
    set_Search_Key(state,key) {
        state.searchKey = key
    }
};
const actions = {
    async setSearchList({commit},{title,page}){
        let list = await searchList({title,page})
        if (list && list.data && list.data.data) {
            list = list.data.data
            return commit('set_Search_List',list)
        }else {
            return -1
        }
    }

};
const getters = {
    searchList(state){
        return state.searchList
    },
    searchKey(state) {
        return state.searchKey
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}