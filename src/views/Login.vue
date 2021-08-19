<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>

      <!--      登陆表单-->
      <el-form ref="loginFormRef" :model="form" :rules="loginFormRules" label-width="0px" class="login_form" >
        <!--        用户名-->

        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model.number="form.username"> </el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-3702mima"
                    v-model="form.password"
                    type="password"></el-input>
        </el-form-item>
        <el-alert
                title="忘记密码请联系管理员"
                type="warning" show-icon :closable="false">
        </el-alert>
        <!--        按钮-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login1">教师登录</el-button>
          <el-button type="primary" @click="login2">学生登录</el-button>
          <el-button type="primary" @click="login3">注册</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        config: {isCheck: false},
        //登陆表单数据对象
        form :{
          username: 1111,
          password: '1111'
        },
        loginFormRules :{
          //验证用户输入
          //验证用户输入
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { type: 'number', message: '必须为数字值' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入登陆密码', trigger: 'blur' },
            // { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      window.sessionStorage.clear()
    },
    methods:{
      reset(){
        this.$refs.loginFormRef.resetFields();
        this.form.password = '';
        this.form.username = '';
        window.sessionStorage.clear()
      },
      login1(){
        this.$refs.loginFormRef.validate( async (valid) => {
          if(!valid) return;
          await this.$http.post("/tlogin",this.form,this.config).then(res =>
            {
              if(res.data.success!==true) return this.$message.error(res.data.message)
              // this.$message.success('登陆成功');
              window.sessionStorage.setItem('token',res.data.token);
              this.$store.commit('storeToken',res.data.token)
              this.$router.push('/thome')
            }
          )
        })
      },
      login2(){
        this.$refs.loginFormRef.validate( async (valid) => {
          if(!valid) return;
          await this.$http.post("/slogin",this.form,this.config).then(res =>
            {
              // console.log(res)
              if(res.data.success!==true) return this.$message.error(res.data.message)
              // this.$message.success('登陆成功');
              window.sessionStorage.setItem('token',res.data.token);
              this.$store.commit('storeToken',res.data.token)
              this.$router.push('/shome')
            }

            )
        })
      },
      login3(){
        this.$router.push('/register')
      }
    }
  }
</script>

<style lang="less" scoped>
  .login_container{
    background-color: #2b4b6b;
    height: 100%;
    text-align: center;
    border-radius: 20px;
    width: 300px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .login_box{
    width: 410px;
    height: 320px;
    background-color: #ffffff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .avatar_box{
    height: 130px;
    width: 130px;
    border-radius: 50%;
    border: 1px solid #eeeeee;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
</style>