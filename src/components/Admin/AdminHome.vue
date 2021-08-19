<template>
  <div >
    <el-container >
      <el-header style="background-color: #545c64">
        <div style="width: 100%;height:100% ;float:left">
          <el-menu
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            router
            active-text-color="#ffd04b"
            :default-active="$route.path"
          >
            <el-menu-item index="/changeallpass">修改密码</el-menu-item>
            <el-menu-item index="/AddDevs" :disabled="admin"
              >添加设备</el-menu-item
            >
            <el-menu-item index="/AddShiyan" :disabled="admin"
              >添加实验</el-menu-item
            >
          </el-menu>
        </div>
        <!-- <div class="login" >
          <el-input style="width: 30%;" placeholder="请输入账号"></el-input>
          <el-input style="width: 30%;" placeholder="请输入密码"></el-input>
          <el-button @click="">登录</el-button>
        </div> -->
        <!-- <el-input>账号</el-input> -->
      </el-header>
      <el-main style="height:78%">
        <router-view @logined="login"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin: true,
    };
  },
  created() {
    window.sessionStorage.setItem("token", "admin");
  },
  methods:{
    login(msg){
      this.admin = false;
    }
  }
};
</script>

<style scoped lang="less">
  .login{
    display: flex;
    align-content: center;
    justify-content:center;
    width: 40%; 
    height:100%; 
    background-color: #545c64;
    float:left;
  }
</style>