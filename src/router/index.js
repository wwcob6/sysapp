import Vue from 'vue'

import TreeTable from 'vue-table-with-tree-grid'
import VueRouter from 'vue-router'
// 公用
import test from "../views/test";
import MyIndex from '../components/Test/MyIndex.vue'
import Hello from "../views/Hello";
import Login from "../views/Login";
import Register from "../views/Register";
//管理
import AdminHome from "../components/Admin/AdminHome.vue";
import ChangeAllPass from "../components/Admin/ChangeAllPass.vue"
import AddDevs from "../components/Admin/AddDevs.vue"
import AddShiyan from "../components/Admin/AddShiyan.vue"
//教师路由
import THome from "../views/THome";
import StudentManage from "../components/Teacher/StudentManage";
import TestManage from "../components/Teacher/TestManage";
import VideoSurveillance from "../components/Teacher/VideoSurveillance";
import StudentInfo from "../components/Teacher/StudentInfo";
import PasswordChange from "../components/Teacher/PasswordChange";
//学生路由
import SHome from "../views/SHome";
// import MySelf from "../components/Student/MySelf";
import ChangeMiMa from "../components/Student/ChangeMiMa";
import Grade from "../components/Student/Grade";
import MyInfo from "../components/Student/MyInfo";
import SearchTest from "../components/Student/SearchTest";
import StartTest from "../components/Student/StartTest";
import PickClass from "../components/Student/PickClass";
import HelloStu from "../views/HelloStu";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/test',
    component:test
  },
  {
    path: '/myindex',
    name:'MyIndex',
    component: MyIndex
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/iamadmin',
    component: AdminHome,
    redirect:"/changeAllPass",
    children:[
      {
        path:'/changeAllPass',
        component:ChangeAllPass
      },
      {
        path:'/AddDevs',
        component:AddDevs
      },
      {
        path:'/AddShiyan',
        component:AddShiyan
      },

    ]
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/thome',
    component: THome,
    redirect: '/hello',
    children:[
      {
        path: '/hello',
        component: Hello,
      },{
      path: '/smanage',
      component: StudentManage,
    },
      {
        path: '/tmanage',
        component: TestManage,
      },
      {
        path: '/vsurveil',
        component: VideoSurveillance,
      },
      {
        path: '/sinfo',
        component: StudentInfo,
      },
      {
        path:'/passchange',
        component: PasswordChange,
      },

    ]
  },
  {
    path: '/shome',
    component: SHome,
    redirect: '/helloSTu',
    children: [
      {
        path:'/helloSTu',
        component: HelloStu,
      },
      {
        path:'/check',
        component: SearchTest,
      },
      {
        path:'/start',
        component: StartTest,
      },
      {
        path:'/myinfo',
        component: MyInfo,
      },{
        path:'/grade',
        component: Grade,
      },{
        path:'/schangepass',
        component: ChangeMiMa,
      },{
        path:'/pickclass',
        component: PickClass,
      }
    ]
  },


]

const router = new VueRouter({
  mode: 'hash',
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 挂在路由守卫
router.beforeEach((to,from,next) => {
  //to将要访问的路径
  //from代表从哪个路径调过来
  //next 是一个函数表示放行
  // next() 放行 next（‘/login')强制跳转
  if (to.path === '/register') return next();
  if (to.path === '/login') return next();
  if (to.path === '/iamadmin') return next();
  if (to.path === '/changeAllPass') return next();
  if (to.path === '/test') return next();
  if (to.path === '/myindex') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
Vue.component('tree-table',TreeTable)
export default router
