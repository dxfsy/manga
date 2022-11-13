// import { setLocalStorage } from "../../utils/localStorage";
import { getLocalStorage, setLocalStorage } from "../../../utils/localStorage";
import { getSessionStorage, setSessionStorage } from "../../../utils/sessionStorage";

const state = {
    user: getLocalStorage('user') || getSessionStorage('user')
}
const mutations = {
    set_Token(state,{token,username,autoLogin}) {
        state.token = token
        if(autoLogin) {
            setLocalStorage('user',{token,username})
        }else {
            setSessionStorage('user',{token,username})
        }
    }
}
const actions = {
    
}
const getters = {
    token(state){
        return state.token
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}