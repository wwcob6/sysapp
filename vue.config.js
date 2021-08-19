const path = require('path');
const resolve = (dir) => path.join(__dirname, dir); // 给public路径添加别名

/*// 引入等比适配插件
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16
})*/

module.exports = {
  /*lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },*/
  // publicPath: '/app/', // base目录，等同于router.js的base字段
  assetsDir: "static", // 打包后静态资源目录，注意public文件下目录（别名）配置，index.html的icon路径
  publicPath:"./",
  outputDir:"dist",
  indexPath:"index.html",
  filenameHashing:true,

      devServer: {
        open: true,
        // disableHostCheck: false,
        host: "localhost",
        port: 8081,
        https: false,
        // hotOnly: false,

        // 静态资源文件夹
        // assetsSubDirectory: 'static',

        // 发布路径
        // assetsPublicPath: '/',		这里有错

        // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
        // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
        // 使用方法：https://vuejs-templates.github.io/webpack/proxy.html
        proxy: {
          '/api': {
            // target: 'http://192.168.1.111:9999/', // 接口的域名
            target: 'http://101.69.255.131:9000', // 接口的域名
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
            pathRewrite: {
              '^/api': ''
            }
          }
        },
      },


  }