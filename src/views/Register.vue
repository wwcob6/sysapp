<template>
  <div class="register">
    <button @click="mylogin">已有帐号</button>
<!--      <span>请选择角色</span>-->
<!--      <el-cascader-->
<!--              v-model="selectCateKeys"-->
<!--              :options="roleList"-->
<!--              @change="handleChange"-->
<!--              style="margin-left: 20px;"-->
<!--      ></el-cascader>-->
    <div :class="role?'selected1':'unselect'">
      <span>请选择你的角色：</span>
      <el-select v-model="role"
                 @change="heh"
                 placeholder="请选择您的角色">
        <el-option label="老师" value="teacher"></el-option>
        <el-option label="学生" value="student"></el-option>
      </el-select>
    </div>
    <div class="form" v-if="role">
      <el-form v-if="role == 'teacher'" ref="form" :model="form" label-width="100px"
               :rules="registerFormRules">
        <el-form-item label="工号" prop="number">
          <el-input v-model.number="form.number"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNum">
          <el-input v-model.number="form.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordR" >
<!--          <el-input v-model="form.passwordR" type="password"></el-input>-->
          <el-input v-model="form.passwordR" ></el-input>
        </el-form-item>
        <span>选择所教班级</span>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="1班"></el-checkbox>
          <el-checkbox label="2班"></el-checkbox>
          <el-checkbox label="3班"></el-checkbox>
          <el-checkbox label="4班"></el-checkbox>
          <el-checkbox label="5班"></el-checkbox>
          <el-checkbox label="6班"></el-checkbox>
        </el-checkbox-group>
        <el-form-item class="btn">
          <el-button type="primary" @click="assign">确定</el-button>
          <el-button type="info" @click="regReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="100px"
               :rules="registerFormRules"
               v-else-if="role == 'student'">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="number">
          <el-input v-model.number="form.number"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="form.grade"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNum">
          <el-input v-model.number="form.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-radio-group v-model="form.class">
            <el-radio label="1班"></el-radio>
            <el-radio label="2班"></el-radio>
            <el-radio label="3班"></el-radio>
            <el-radio label="4班"></el-radio>
            <el-radio label="5班"></el-radio>
            <el-radio label="6班"></el-radio>
          </el-radio-group>
      </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordR" >
          <el-input v-model="form.passwordR" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="assign">确定</el-button>
          <el-button type="info" @click="regReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data(){
      var validatePhoneNum = (rule, value, callback) => {
        let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
        if (!reg.test(value) || !value.length==11) {
          console.log("输入的手机号不正确")
          callback(new Error('请输入正确的电话号码'));
        }
        else {
          callback();
        }
      }
      return {

        role:'',
        checkList:[],
        selected:true,
        roleList:[{
          value: 'teacher',
          label: '教师'
        },
          {
            value: 'student',
            label: '学生'
          },],
        selectCateKeys:[],
        form:{
        },
        registerFormRules:{
          role:[{ validator: this.gvari.validateNull,required: true, message: '请选择角色', trigger: 'change' }],
          number:[
                  {required: true, message: '请输入学号', trigger: 'blur'},
                  { type: 'number', message: '必须为数字值'}],
          password:[
            // { validator: this.gvari.validateNull,trigger: 'blur'},
            { validator: this.gvari.validateNull,required: true, message: '请输入密码', trigger: 'blur' }],
          passwordR:[
            // { validator: this.gvari.validateNull,trigger: 'blur'},
            { validator: this.gvari.validateNull,required: true, message: '请输入密码', trigger: 'blur' }],
          name:[
            // { validator: this.gvari.validateNull,trigger: 'blur'},
            { validator: this.gvari.validateNull,required: true, message: '请输入姓名', trigger: 'blur' }],
          gender:[
            // { validator: this.gvari.validateNull,trigger: 'blur'},
            { validator: this.gvari.validateNull,required: true, message: '请输入性别', trigger: 'blur' }],
          class:[
            // { validator: this.gvari.validateNull,trigger: 'blur'},
            { validator: this.gvari.validateNull,required: true, message: '请输入班级', trigger: 'blur' }],
          grade:[
            { required: true, message: '请输入年级', trigger: 'blur' }],
          phoneNum:[
            { required: true,validator: validatePhoneNum, trigger: 'blur' }],

        }
      }
    },
    methods:{
      assign(){
        this.form.role = this.role
        this.$refs.form.validate((valid) => {
          if (valid) {
            // userRegister
            if (this.form.password === this.form.passwordR){
              if(this.role==='teacher'){
                    this.form.class1 = this.checkList[0]
                    this.form.class2 = this.checkList[1]
                    this.form.class3 = this.checkList[2]
                    this.form.class4 = this.checkList[3]
                    this.form.class5 = this.checkList[4]
                    this.form.class6 = this.checkList[5]
                    this.$http.post('/userRegister',this.form).then(res=>
                    {
                      if(res.data.success === false){
                        alert(res.data.message)
                      }else{
                        this.$message.success('注册成功！请登录')
                        this.$router.push('/login')
                      }
                    })
                  }
                  if(this.role==='student'){
                    this.$http.post('/userRegister',this.form).then(res => {
                      if(res.data.success === false){
                        alert(res.data.message)
                      }else{
                        this.$message.success('注册成功！请登录')
                        this.$router.push('/login')
                      }
                    })
                  }
            }else{
              alert('两次密码不一样！！')
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      regReset(){
        this.$refs.form.resetFields();
        this.form={}
      },
      heh(){
        this.form = {}
      },
      mylogin(){
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="less" scoped>

  .register{
    position: relative;
    float: left;
    border: 1px solid #eeeeee;
    background-image: url("../../src/assets/img/back.jpg")  ;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: 100%;
    width: 100%;
  }
  .unselect{
    /*height: 500px;*/
    /*width: 500px;*/
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .selected1{

    position: absolute;
    top: 5%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .form{
    width: 500px;
    /*height: 500px;*/
    height: auto;
    background-color: #d4d0b2;
    opacity:0.9;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%,-50%);
  }
  .el-form{
    /*border: 50px;*/
    width: 100%;
    /*background-color: #dddddd;*/
    /*opacity:0.3;*/
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  .el-form-item{
    width: 95%;
    margin-right: 35px;
    font-weight: bold ;
  }
  .btn{
    display: flex;
    justify-content: flex-end;
  }
  .el-checkbox-group{
    margin: 20px;
    position: relative;
    top: 70%;
  }
</style>