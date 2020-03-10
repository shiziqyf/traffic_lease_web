import Vue from 'vue'
import Vuex from 'vuex'


//1.安装插件
Vue.use(Vuex)

//创建对象

const store = new Vuex.Store({
    state: {
        token: '',
        userInfo: null
    },
    mutations: {
        login(state,data) {
            state.token = data.token
            state.userInfo = data.userInfo
        },
        outLogin(state) {
            state.userInfo = null
        },
    
    }
})

export default store