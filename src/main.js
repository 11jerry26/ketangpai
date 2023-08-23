//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
// //引入ElementUI组件库
import ElementUI from 'element-ui';
//引入ElementUI样式
import 'element-ui/lib/theme-chalk/index.css'
//引入VueRouter
import VueRouter from "vue-router";
//引入路由器
import router from './router'

//关闭Vue的生产提示
Vue.config.productionTip = false

//应用ElementUI
Vue.use(ElementUI)

//应用VueRouter插件
Vue.use(VueRouter)

//创建vm
new Vue({
  el: '#app',
  render: h => h(App),
  router:router
})
