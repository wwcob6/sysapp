import './utils/rem'
import Vue from 'vue'
import App from './App.vue'
import $http from './api/axios.init'
import router from './router'
import store from './store'
import './plugins/element.js'
// import Bus from 'common/js/bus.js'
// import './plugins/element.js'
//导入全局样式
import './assets/css/global.css'
//导入字体图标
import './assets/fonts/iconfont.css'
//导入
import TreeTable from 'vue-table-with-tree-grid'
import ElementUI from 'element-ui'
// import url from '@/http/http'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import globeVariable from "./assets/js/globeVariable";
import jsPlumb from "jsplumb";

import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

// Vue.prototype.$socketIO = SocketIO;
// const baseSocket = 'https://101.69.255.131'　
// // const baseSocket = 'https://192.168.1.167'　
// Vue.prototype.socketApi = baseSocket
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO.connect(baseSocket, {
//       path: '',
//       transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
//   })
// }));

Vue.prototype.$jsPlumb = jsPlumb.jsPlumb
Vue.prototype.$http = $http
Vue.prototype.gvari = globeVariable
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
