import axios from 'axios'
import store from "../store";
import router from "../router";
import { MessageBox,Message } from 'element-ui'
import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from './axiosInitHelper'



// 创建axios实例
const $http = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
$http.interceptors.request.use((config) => {
  const inter = window.sessionStorage.getItem('token')===store.getters.getToken
  if(!inter&&config.isCheck){
    console.log(config.isCheck);
    $http.post('fixed',
      {token:window.sessionStorage.getItem('token')},
      {isCheck:false}).then(res => {
        if(res.data == 1){
          store.commit('storeToken',window.sessionStorage.getItem('token'))
        }else{
          Message.error('token被修改,请重新登录！！')
          router.push('/login')
        }
    })
  }
  if (config.showLoading) {
    showFullScreenLoading(config.text)
  }return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
$http.interceptors.response.use((response) => {
  if (response.config.showLoading) {
    tryHideFullScreenLoading()
  }
  return response
}, (error) => {
  tryHideFullScreenLoading()
  return Promise.reject(error)
})

const defaultConfig = { showLoading: true,text: 'loading',isCheck:true }
export default {
  get: (url, config) => $http.get(url, { ...defaultConfig, ...config }),
  put: (url, data, config) => $http.put(url, data, { ...defaultConfig, ...config }),
  post: (url, data, config) => $http.post(url, data, { ...defaultConfig, ...config }),
  patch: (url, data, config) => $http.patch(url, data, { ...defaultConfig, ...config }),
  delete: (url, data, config) => $http.delete(url, { ...defaultConfig, ...config })
}
