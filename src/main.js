// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import echarts from "echarts";
import "babel-polyfill"
 
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
/* eslint-disable no-new */
Vue.use(ElementUI)

Vue.prototype.axios=axios;
 axios.defaults.baseURL = "http://localhost:8080/" 
//axios.defaults.baseURL = "http://115.28.209.225:8080/crm_system-0.0.1-SNAPSHOT"
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
