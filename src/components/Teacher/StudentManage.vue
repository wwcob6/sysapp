<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/thome'}">首页</el-breadcrumb-item>
      <!--      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>-->
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
<!--      -->
      <el-alert
              title="注意：只显示您所在的的班级！"
              type="warning" show-icon :closable="false">
      </el-alert>
      <!--      选择商品分类区域-->
      <el-row class="cat_opt">
        <el-col>
          <span>选择班级：</span>
          <!--       选择商品分类的级联选择框   -->
          <el-cascader
                  v-model="selectCateKeys"
                  :options="classList"
                  @change="handleChange"
                  style="margin-right: 30px;"
          ></el-cascader>
          <el-button type="primary" @click="addDialogVisible = true;addForm = {}">添加学生</el-button>
        </el-col>
      </el-row>
      <el-table :data="currentShow" border stripe size="mini">
        <el-table-column show-overflow-tooltip align="center" label="姓名" prop="name"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="学号" prop="num"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="班级" prop="class"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="性别" prop="gender"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="课程1" prop="course1"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="课程2" prop="course2"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="课程3" prop="course3"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="课程4" prop="course4"></el-table-column>
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
              :total="total"
              :page-size="7"
              :current-page.sync="pagenum">
      </el-pagination>
    </el-card>
  <el-dialog
          title="添加学生"
          :visible.sync="addDialogVisible"
          width="50%"
          @close="addDialogClose"
  >
    <el-form :model="addForm" ref="addFormRef" label-width="70px" size="middle">
      <el-form-item label="姓名" prop="name">
        <el-input v-model.trim="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="num">
        <el-input v-model.trim="addForm.num"></el-input>
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-input v-model.trim="addForm.class"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input v-model.trim="addForm.gender"></el-input>
      </el-form-item>
      <el-form-item label="课程1" prop="course1">
        <el-input v-model.trim="addForm.course1"></el-input>
      </el-form-item>
      <el-form-item label="课程2" prop="course2">
        <el-input v-model.trim="addForm.course2"></el-input>
      </el-form-item>
      <el-form-item label="课程3" prop="course3">
        <el-input v-model.trim="addForm.course3"></el-input>
      </el-form-item>
      <el-form-item label="课程4" prop="course4">
        <el-input v-model.trim="addForm.course4"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
  </el-dialog>
    <el-dialog
            title="修改信息"
            :visible.sync="editDialogVisible"
            width="40%"
            @close="editDialogClose"
    >
      <el-form :model="editForm" ref="addFormRef" label-width="30%" >
        <el-form-item label="学号" prop="num">
          <el-input v-model="editForm.num" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" label="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="editForm.class"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="editForm.gender"></el-input>
        </el-form-item>
        <el-form-item label="课程1" prop="course1">
          <el-input v-model="editForm.course1"></el-input>
        </el-form-item>
        <el-form-item label="课程2" prop="course2">
          <el-input v-model="editForm.course2"></el-input>
        </el-form-item>
        <el-form-item label="课程3" prop="course3">
          <el-input v-model.trim="editForm.course3"></el-input>
        </el-form-item>
        <el-form-item label="课程4" prop="course4">
          <el-input v-model="editForm.course4"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editStudentInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "StudentManage",
    data(){
      return {
        token:'',
        //展示添加的
        addDialogVisible: false,
        //展示修改
        editDialogVisible:false,
        //选择的班级
        selectCateKeys:[],
        classList:[],
        studentList:[],
        currentShow:[],
        total:0,
        addForm:{
          name:'',
          num:'',
          class:'',
          gender:'',
          course:''
        },
        editForm:{},
        pagenum:1
        }
      },
    created() {
      this.token = window.sessionStorage.getItem('token')
      this.getList();
    },
    methods:{
       handleChange(){
        // console.log(this.selectCateKeys)
       this.$http.post('/tchooseclass',{
         class : this.selectCateKeys[0],
       }).then(res => {
        this.studentList = res.data
         this.total = this.studentList.length
         this.currentShow = this.studentList.slice(0,7)
      })

      },
      edit(a){
        this.editDialogVisible = true
        this.editForm = a
      },
      editDialogClose(){
        this.editDialogVisible = false
      },
      editStudentInfo(){
        this.$http.post('/changestuinfo',this.editForm).then(res => {
          if(res.success == true){
            this.getclass()
            this.editDialogVisible = false
            this.$message.success('修改成功')
            this.pagenum = 1
          }else{
            this.$message.error('修改失败')
            
          }
        })
      },
      del(a){
        console.log(a)
      },
      addDialogClose(){
        this.addDialogVisible = false
      },
      getList(){
        this.$http.post('/getclass',{
         token : this.token,
        }).then(res => {
          var len = res.data.length
          for (let i = 0; i < len; i++) {
            this.classList.push({value:res.data[i],label:res.data[i]},)
          }
            this.getclass()
        })
      },
      getclass(){
        this.$http.post('/getstudent',this.classList).then(res => {
          // console.log(res.data)
          this.studentList = res.data.sort(function(a,b) {
            return a['num'] - b['num']
          })
          this.total = this.studentList.length
          this.currentShow = this.studentList.slice(0,7)
        })
      },
      handleCurrentChange(e){
        this.pagenum = e
        this.currentShow = this.studentList.slice((e-1)*7,(e-1)*7+7)
      },
    }

  }
</script>

<style lang="less" scoped>
  .el-table{
    /*margin-top: 0;*/
    font-size: 16px;
  }
  .el-form-item{
    margin-bottom: 8px;
  }
  .el-form-item{
    width: 80%;
  }

</style>