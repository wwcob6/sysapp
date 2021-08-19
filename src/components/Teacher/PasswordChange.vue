<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/thome'}">首页</el-breadcrumb-item>
      <!--      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>-->
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="changpassref" label-width="100px" class="demo-ruleForm">
      <el-form-item label="请输入旧密码" prop="oldpass">
        <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "PasswordChange",
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(value === this.ruleForm.oldpass){
          callback(new Error('新密码不能和密码一致！'));
        }
        else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.changpassref.validateField('checkPass');
          }
          callback();
        }
      };

      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        }
          else {
          callback();
        }
      };
      return{
        ruleForm:{},
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      submitForm() {
        this.$refs.changpassref.validate((valid) => {
          if (valid) {
            this.ruleForm.token = window.sessionStorage.getItem('token')
            this.$http.post('tchangepass',this.ruleForm).then(res => {
              if(res.data === false){
                alert('旧密码错误或token值被人为修改！token值修改请重新登陆！')
              }else if(res.data === true){
                this.$message.success('修改成功！')
                this.$refs.changpassref.resetFields()
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.changpassref.resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
html,body,#app{
  width:100%;
  height: 100%;
  margin: 0;
  padding: 0;
  min-width: 1366px;
}
  .el-form{
    width: 50%;
  }
</style>