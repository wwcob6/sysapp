<template>
  <div class="shome" id="full">
    <el-container class="home-container">
    <el-header>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNyZszDbY7CJugxWtLXZpRgItIWURdKTBIXg&usqp=CAU"  alt="">
        <el-menu
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        router
        active-text-color="#ffd04b"
        :default-active="$route.path"
        >
        <el-menu-item index="/pickclass" @click="fullScreenOut('/pickclass')">选课中心</el-menu-item>
        <el-menu-item index="/check" @click="fullScreenOut('/check')">浏览实验</el-menu-item>
<!--        <el-menu-item index="/start" @click="fullScreen">做实验</el-menu-item>-->
        <el-submenu index="">
          <template slot="title" class="title">个人中心</template>
          <el-menu-item index="/myinfo" @click="fullScreenOut('/myinfo')">个人信息</el-menu-item>
          <el-menu-item index="/grade" @click="fullScreenOut('/grade')">成绩查询</el-menu-item>
          <el-menu-item index="/schangepass" @click="fullScreenOut('/schangepass')">修改密码</el-menu-item>
        </el-submenu> 
        </el-menu>
      <el-button @click="loginout" :disabled="cantOut" style="position: relative;right: 0">退出登录</el-button>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  </div>
</template>

<script>
  export default {
    name: "SHome",
    data(){
      return{
        defaultActive:'/check',
        activePath:'',
        screenShow: false,
        body: null,
      }
    },
    watch: {
      screenShow(val) {
        this.$emit('change', val)
      }
    },
    mounted() {
      window.addEventListener('resize', this.controlFun)
    },
    beforeDestroy() {
      window.sessionStorage.clear()
      window.removeEventListener('resize', this.controlFun)
    },
    created() {

      // this.fullScreen()
      this.body = document.body
      this.getStudSelfClass()
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    computed:{
      cantOut(){
        if(this.$route.path === '/start'){
          return true
        }else{
          return false
        }
      }
    },
    methods:{
      getStudSelfClass(){
        this.$http.post('/getstuselfclass',{
          token : window.sessionStorage.getItem('token')
        }).then(res => {
          // this.$store.myTest = res.data
        })
      },
      loginout(){
        this.$router.push('login')
      },
      saveNavState(active){
        window.sessionStorage.setItem('activePath',active)
        this.activePath = active
      },
      controlFun() {
        if (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
          this.screenShow = true
        } else {
          this.screenShow = false
        }
      },
      fullScreen() {
        this.$confirm('为保证实验正常进行,请实验过程浏览器全屏,且不要刷新页面。请选择其他页面退出登录', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 正常跳转
          this.saveNavState('/start');
          document.getElementById('full').classList.add('container_full_element')
          let rfs = this.body.requestFullScreen || this.body.webkitRequestFullScreen || this.body.mozRequestFullScreen || this.body.msRequestFullScreen,
            wscript
          if (typeof rfs != 'undefined' && rfs) {
            rfs.call(this.body)
            return
          }
          if (typeof window.ActiveXObject != 'undefined') {
            wscript = new ActiveXObject('WScript.Shell')
            if (wscript) {
              wscript.SendKeys('{F11}')
            }
          }
        }).catch(() => {
          // 如果取消跳转地址栏会变化，这时保持地址栏不变
          this.saveNavState('/check')
          this.$router.push('/check')
        })

      },
      fullScreenOut(path) {
        this.canOut = false;
        this.saveNavState(path)
        const a = document.getElementById('full').classList.contains('container_full_element')
        if(a) {
          document.getElementById('full').classList.remove('container_full_element')
          let exitMethod = document.exitFullscreen || //W3C
            document.mozCancelFullScreen || //FireFox
            document.webkitExitFullscreen || //Chrome等
            document.webkitExitFullscreen //IE11
          if (exitMethod) {
            exitMethod.call(document)
          } else if (typeof window.ActiveXObject !== 'undefined') { //for Internet Explorer
            let wscript = new ActiveXObject('WScript.Shell')
            if (wscript !== null) {
              wscript.SendKeys('{F11}')
            }
          }
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .home-container{
    height: 100%;
    min-width: 1366px!important;
  }
  .el-header{
    background-color: #373c41;
    align-items: center;
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    font-size: 20px;
    height: 60px!important;
    padding: 0;
    margin: 0;
    min-width: 1366px!important;
    img{
      height: 60px;
      position: absolute;
      left: 0;
      right: 0;
    }
  }
  
  .el-menu{
    /*float: right;*/
    position: relative;
    left: 50%;
    /*right: 50%;*/
   transform: translate(-50% );
    padding: 0;
    /*border-bottom: none;*/

  }
  .el-main{
    height: calc(100% - 60px);
    padding: 0;
  }
  .shome{
    width: 100%;
    min-width: 1366px!important;
    height: 100%;
  }
  .container_full_element {
    /*position: fixed;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*top: 0;*/
    /*left: 0;*/
    background-color: white;
    /*z-index: 9999;*/
  }
  section{
    padding: 0;
    margin: 0;
  }
</style>