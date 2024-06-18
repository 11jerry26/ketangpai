// 配置开发服务器的代理设置，实现跨域请求。
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {  //匹配所有以'/api'开头的请求路径
        target: 'http://localhost:8088', //代理目标的基础路径
        secure:false,
        changOrigin: true, //允许跨域
        pathRewrite: { //重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      }
    }
  }
})
