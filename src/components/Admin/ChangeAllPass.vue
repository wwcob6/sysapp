<template>
  <div>
    <!--    面包屑导航区-->
    <el-card>
<!--      <el-form :model="ruleForm" status-icon inline ref="ruleForm" class="top1">-->
<!--        <el-form-item label="账号">-->
<!--          <el-input  v-model="ruleForm.account" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="密码">-->
<!--          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-button type="primary" @click="adminLogin">确定</el-button>-->
<!--      </el-form>-->
      <!--      -->
      <el-alert
              title="注意：必须知道学号！"
              type="warning" show-icon
              :closable="false"
              v-if="admin">
      </el-alert>
      <el-alert
              title="注意：请先登陆！"
              type="error" show-icon
              v-else
              :closable="false">
      </el-alert>
      <!--      选择商品分类区域-->
      <el-row class="cat_opt">
        <el-col>
          <span>学号：</span>
          <el-input v-model="id" placeholder="请输入学号"
                    clearable
                    style="width: 15%;padding-right: 40px;"></el-input>
          <el-button type="primary" @click="serchInfo">确定</el-button>
          <el-button type="primary" @click="reset">全部信息</el-button>
          <el-form :model="ruleForm" status-icon inline
                   ref="ruleForm" class="top1"
          >
            <el-form-item label="账号">
              <el-input  v-model="ruleForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="ruleForm.pass"></el-input>
            </el-form-item>
            <el-button type="primary" @click="adminLogin">登录</el-button>
          </el-form>
        </el-col>
      </el-row>
      <el-table :data="currentShow"
                border stripe size="mini">
        <el-table-column show-overflow-tooltip align="center" label="类型" prop="role"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="学号" prop="num"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="姓名" prop="name"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="密码" prop="password"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="操作">
          <template slot-scope="scope">
            <!--            修改-->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)"></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              @current-change="handleCurrentChange"
              layout="total, prev, pager, next"
              :total="total">
      </el-pagination>
    </el-card>
    <el-dialog
            title="修改信息"
            :visible.sync="editDialogVisible"
            width="40%"
    >
      <el-form :model="editForm" ref="addFormRef" label-width="50px" >
        <el-form-item label="学号" prop="num">
          <el-input v-model="editForm.num" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ChangeAllPass",
    data(){
      return {
        ruleForm:{
          account:'admin',
          pass:'chenyifan',
        },
        id:'',
        allUser:[],
        editDialogVisible:false,
        editForm:{},
        total:0,
        currentShow:[],
        pagenum: 0,
        admin:false
      }
    },
    created() {
    },
    methods:{
      adminLogin(){
        this.$http.post('/alogin',this.ruleForm,{isCheck:false}).then(res => {
          if(res.data.success === true){
            this.$emit("logined","ok")
            if(!this.admin){this.$message.success(res.data.message)}
            this.$http.get('/getalluser',{isCheck:false}).then(res => {
              this.allUser = res.data
              this.ruleForm = {}
              this.total = this.allUser.length
              this.admin = true
              this.currentShow = this.allUser.slice(0,10)
            })
          }else{
            if(!this.admin)this.$message.error(res.data.message)
          }
        })
      },
      edit(info){
        this.editForm = info
        this.editDialogVisible = true
      },
      changeInfo(){
        console.log(this.editForm)
        this.$http.post('/edituserinfo',this.editForm,{isCheck:false}).then(res=>{
          if(res.status === 200 && res.data === 0){
            alert('并没有修改信息')
          }else if(res.status === 200 && res.data > 0){
            this.$message.success('修改成功！')
            this.editDialogVisible = false
            this.adminLogin()
          }else{
            alert('修改失败！')
          }
        })
      },
      del(info){
        console.log(info)
      },
      handleCurrentChange(e){
        this.pagenum = (e-1)*10
        this.currentShow = this.allUser.slice(this.pagenum,this.pagenum+10)
      },
      serchInfo(){
        if (this.admin){
          if (this.id){
            var re = this.allUser.findIndex(a => a.num == this.id)
            this.currentShow = this.allUser.slice(re,re+1)
          }else{
            alert('请输入学号！')
          }
        }else{
          alert('请登录！')
          this.id = ''
        }
      },
      reset(){
        if (this.admin){
          this.currentShow = this.allUser
        }else{
          alert('请登录！')
        }
      }
    }

  }
</script>

<style lang="less" scoped>
.top1{
  color: #0086b3;
  float: right;
  /*margin-top: 10px;*/
  border:1px solid #ffffff;
}
  .el-card{
    padding-left: 60px;
    padding-right: 60px;
  }
  .el-table{
    margin-top: 0;
    font-size: 16px;
  }


</style>