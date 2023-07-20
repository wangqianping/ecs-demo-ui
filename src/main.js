import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

import axios from 'axios'

import Router from 'vue-router'
import router from './router'

import store from './store';


// 请求拦截器，每次请求都会先执行这里的代码
axios.interceptors.request.use(
  (config) => {
    // 请求头携带sessionStorage里面的token
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
  },
  function (err) {
    // 对请求错误做些什么
    this.$message.error({
      message: err.message,
      center: true
    })
  }
)

Vue.prototype.$http = axios
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Router)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
