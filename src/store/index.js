import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {}

const mutations = {

    SET_TOKEN(state, token) {
        state.token = token;
        localStorage.setItem("token",token);
    },

    SET_USER(state, userInfo) {
        state.userInfo.token = userInfo.token;
        state.userInfo.id = userInfo.id;
        state.userInfo.name = userInfo.name;
        state.userInfo.isAdmin = userInfo.isAdmin;
        state.userInfo.account = userInfo.account;
        state.userInfo.profilePhoto = userInfo.profilePhoto;
        localStorage.setItem("profilePhoto",userInfo.profilePhoto);
        localStorage.setItem("id",userInfo.id);
    },

    LogOut(state) {
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("token");
    }
}

const state = {
    token: '',
    userInfo: {
        token: null,
        id: null,
        name: null,
        account: null,
        isAdmin: false,
        profilePhoto: null
    }
}

const getters = {
    TOKEN() {
        return localStorage.getItem("token");
    },
    PROFILE_PHOTO(){
        return localStorage.getItem("profilePhoto");
    },
    USER(state){
        return state.userInfo    
    },
    USER_ID(){
        return localStorage.getItem("id");
    }
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})