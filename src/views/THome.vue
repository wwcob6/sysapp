<template>
  <el-container class="home-container">
    <!--      头部-->
    <el-header>
      <div>
        <img src="../assets/teacher.jpg">
        <span>教师管理</span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <!--      主体-->
    <el-container class="home-container">
      <!--        侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--          侧边栏菜单-->
        <el-menu background-color="#323744"
                 text-color="#fff"
                 active-text-color="#517eb7"
                 :unique-opened="true"
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 router
                 :default-active="activePath"
        >
          <!--            一级菜单-->
          <el-menu-item :index="item.path" v-for="(item,index) in menuList"
                      :key="index"
                      @click="saveNavState(item.path)">
            <!--              一级菜单模板区域-->
            <template slot="title">
              <!--                i室图标-->
              <i :class="icons[index]"> </i>
              <!--                文本-->
              <span>  {{item.name}}</span>
            </template>
            <!--              二级菜单-->
<!--            <el-menu-item :index="'/'+item1.path" v-for="item1 in item.children"-->
<!--                          :key="item1.id"-->
<!--                          @click="saveNavState('/'+item1.path)">-->
<!--              <template slot="title">-->
<!--                <i class="el-icon-menu"></i>-->
<!--                <span>{{item1.authName}}</span>-->
<!--              </template>-->
<!--            </el-menu-item>-->
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Home",
    data(){
      return{
        isCollapse: false,
        activePath: '',
        menuList: [
          {name:'学生管理',
            path:'/smanage'
        },
          {name:'实验管理',
            path:'/tmanage'
          },
          /*{name:'视频监控',
            path:'/vsurveil'
          },*/
          {name:'信息查询',
            path:'/sinfo'
          },
          {name:'密码修改',
            path:'/passchange'
          }],
        icons: {
          '0' : 'iconfont icon-user',
          '1' : 'iconfont icon-tijikongjian',
          '2' : 'iconfont icon-shangpin',
          '3' : 'iconfont icon-danju',
          '4' : 'iconfont icon-baobiao'
        }
      }
    },
    destroyed(){
      window.sessionStorage.clear()
    },
    created() {
      // this.getMenuList();
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods:{
      loginOut(){
        window.sessionStorage.clear()
        this.$router.push('login')
      },
      //点击按钮 切换菜单的折叠与展开
      toggleCollapse(){
        this.isCollapse = !this.isCollapse;
      },
      //保存链接激活状态
      saveNavState(active){
        window.sessionStorage.setItem('activePath',active)
        this.activePath = active
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-container{
    height: 100%;
    min-width: 2500px!important;
  }
  html,body,#app{
    width:100%;
    height: 100%;
    margin: 0;
    padding: 0;
    min-width: 1366px;
  }
  .home-container{
    height: 100%;
   
  }
  .el-header{
    background-color: #373c41;
    height: 10% !important;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #ffffff;
    font-size: 20px;
    >div{
      display: flex;
      align-items: center;
      span{
        padding-left: 15px;
      };
      img{
        width: 60px;
        height: 60px;
      }
    }
  }
  .el-aside{
    /*height: 90% !important;*/
    background-color: #323744;
    .el-menu{
      border-right: none;
    }
  }
  .el-main{
    /*height: 90% !important;*/
    background-color: #eaedf2;
  }
 section{
   padding: 0;
   margin: 0;
 }
  .toggle-button{
    background-color: #485164;
    font-size: 10px;
    line-height: 24px;
    color: #dddddd;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>