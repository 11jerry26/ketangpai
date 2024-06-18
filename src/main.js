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
import axios from "axios";
//引入Vue2Editor富文本
import Vue2Editor from "vue2-editor";

// 发送axios请求时，携带跨域请求的凭证（例如，Cookie）
axios.defaults.withCredentials=true

// 将axios实例挂载到Vue的原型上，这样在Vue组件中就可以通过this.$axios来使用axios发送请求了。
Vue.prototype.$axios = axios

//关闭Vue的生产提示
Vue.config.productionTip = false

//应用ElementUI
Vue.use(ElementUI)
//应用Vue2Editor富文本
Vue.use(Vue2Editor)

//应用VueRouter插件
Vue.use(VueRouter)


//创建vm
new Vue({
  el: '#app',
  render: h => h(App),
  router:router
})

Storage.prototype.setExpire=(key, value, expire) =>{
  let obj={
    data:value,
    time:Date.now(),
    expire:expire
  };
  localStorage.setItem(key,JSON.stringify(obj));
}

// 封装LocalStorage的方法
Storage.prototype.getExpire= key =>{
  let val =localStorage.getItem(key);
  if(!val){
    return val;
  }
  val =JSON.parse(val);
  if(Date.now()-val.time>val.expire){
    localStorage.removeItem(key);
    return null;
  }
  return val.data;
}
