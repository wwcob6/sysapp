<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/thome'}">首页</el-breadcrumb-item>
      <!--      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>-->
      <el-breadcrumb-item>实验管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>

      <el-autocomplete
              class="inline-input"
              v-model="state1"
              :fetch-suggestions="querySearch"
              placeholder="请输入课程名称"
              @select="handleSelect"
      ></el-autocomplete>
      <el-button type="primary" @click="getTestList" style="margin-right: 20px;margin-left: 30px">显示全部</el-button>
      <el-button @click="addTestDialogVisible = true">添加课程/实验</el-button>
      <el-table :data="showTestList" border stripe>
        <el-table-column show-overflow-tooltip align="center" label="课程" prop="course"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="实验名" prop="shiyan"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="实验关键字/备注" prop="keyword"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="实验步骤" prop="step"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="讲义" prop="jiangyi">
          <template scope="scope">
            <a href="" :id="scope.row.jiangyi" @click="download(scope.row)" download="123">{{scope.row.jiangyi}}</a>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="操作" >
          <template slot-scope="scope">

            <!--            修改-->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editTest(scope.row)"></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delTest(scope.row)"></el-button>
<!--&lt;!&ndash;            <a href="{:url('download',scop.row)}">e</a>&ndash;&gt;-->
<!--            <el-button type="primary" icon="el-icon-edit" size="mini" @click="download(scope.row)"></el-button>-->
<!--            <a href="" :id="scope.row.jiangyi" @click="download(scope.row)" :download="scope.row.jiangyi"></a>-->
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
<!--      <el-upload-->
<!--              -->
<!--              action="/api/upload"-->
<!--              :on-preview="handlePreview"-->
<!--              :on-remove="handleRemove"-->
<!--              list-type="picture">-->
<!--        <el-button size="small" type="primary">点击上传</el-button>-->
<!--      </el-upload>-->

    </el-card>
    <el-dialog
            title="修改实验信息"
            :visible.sync="editTestDialogVisible"
            width="50%"
            @close="editTestDialogVisible = false"
    >
      <el-form :model="editTestForm" ref="editFormRef" :rules="rules" label-width="100px" >
        <el-form-item label="课程" prop="course" >
          <el-input v-model="editTestForm.course" disabled></el-input>
        </el-form-item>
        <el-form-item label="实验名" prop="shiyan" disabled>
          <el-input v-model="editTestForm.shiyan"></el-input>
        </el-form-item>
        <el-form-item label="关键字/备注" prop="keyword">
          <el-input v-model="editTestForm.keyword"></el-input>
        </el-form-item>
        <el-form-item label="实验步骤" prop="step">
          <el-input v-model="editTestForm.step"></el-input>
        </el-form-item>
        <el-form-item label="实验讲义" prop="jiangyi" >
          <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :file-list="fileList1"
                  :http-request="getFile"
                  multiple
                  :limit="1"
          >
            <el-button size="small" type="primary">只允许上传一个讲义！ 当前已有讲义 : {{editTestForm.jiangyi}}</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editTestDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editTestList">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
            title="添加实验"
            :visible.sync="addTestDialogVisible"
            width="50%"
            @close="addTestDialogVisible = false"
    >
      <el-form :model="addTestForm" ref="addFormRef" :rules="rules" label-width="100px" >
        <el-form-item label="课程" prop="course" >
          <el-input v-model="addTestForm.course"></el-input>
        </el-form-item>
        <el-form-item label="实验名" prop="shiyan">
          <el-input v-model="addTestForm.shiyan"></el-input>
        </el-form-item>
        <el-form-item label="关键字/备注" prop="keyword">
          <el-input v-model="addTestForm.keyword"></el-input>
        </el-form-item>
        <el-form-item label="实验步骤" prop="step">
          <el-input v-model="addTestForm.step"></el-input>
        </el-form-item>
        <el-form-item label="讲义">
          <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :file-list="fileList2"
                  :http-request="getFile"
                  multiple
                  :limit="1"
                  v-if="addTestForm.course&&addTestForm.shiyan"
          >
            <el-button size="small" type="primary">请确定课程和实验名再上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addTestDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTestList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "TestManage",
    data(){
      return{
        progressPercent :0,
        progressFlag : true,
        file: {},
        fileList1: [],
        fileList2: [],
        editTestDialogVisible:false,
        addTestDialogVisible:false,
        testList:[],
        rules:{
          course:[ { validator: this.gvari.validateNull,required: true, message: '请输入课程名', trigger: 'blur' }],
          shiyan:[ { validator: this.gvari.validateNull,required: true, message: '请输入实验名', trigger: 'blur' }],
          keyword:[ { validator: this.gvari.validateNull,required: true, message: '请输入实验关键字', trigger: 'blur'}],
          step:[ { validator: this.gvari.validateNull,required: true, message: '请输入实验步骤', trigger: 'blur' }]
        },
        editTestForm:{
          course:'',
          shiyan:'',
          keyWord:'',
          step:''
        },
        addTestForm:{
          course:'',
          shiyan:'',
          keyword:'',
          step:''
        },
        state1:'',
        courseList:[],
        total:0,
        pagenum:1,
        showTestList:[]
      }
    },
    created() {
      this.getTestList()
      this.getCourseList()
      // console.log(window.location.href)
    },
    methods:{
      getTestList(){
        this.$http.post('/gettestlist',{
          token:window.sessionStorage.getItem('token')
        }).then(res => {
          // console.log(res.data)
          this.testList = res.data
          this.total = this.testList.length
          this.showTestList = this.testList.slice(0,7)
        })
      },
      editTest(res){
        this.editTestForm = res
        this.editTestDialogVisible = true
        // console.log(this.editTestForm)
      },
      delTest(){
        this.$message.success('点击删除')
      },
      download(res){
        // console.log(res.jiangyi)
        const link2 = document.getElementById(res.jiangyi);
        link2.href="/api/download?num="+res.num+"&jiangyi="+res.jiangyi+"&course="+res.course+"&shiyan="+res.shiyan;
        link2.download = res.jiangyi
        // link2.click();
      },
      editTestList(){
        this.fileList1 = []
        this.$refs.editFormRef.validate((valid) => {
          if (valid) {
            this.editTestForm.filename = this.file.name
            // console.log(this.editTestForm)
            this.$http.post('/edittestlist',this.editTestForm).then(res => {
              if(res.status == 200){
                this.editTestDialogVisible =false
                this.editTestForm = {}
                this.$message.success('操作成功！')
                this.getTestList()
                this.getCourseList()
                this.file = {}
              }
            })
          }else{
            console.log('error submit!!');
            return false;
          }
        });
      },
      addTestList(){
        // console.log(this.addTestForm)
        this.$refs.addFormRef.validate((valid) => {
          if (valid) {
            this.addTestForm.token = window.sessionStorage.getItem('token')
            if(this.file){
              this.addTestForm.filename = this.file.name
            }else{
            }
            this.$http.post('/addtestlist',this.addTestForm).then(res => {
              if(res.data = true){
                this.addTestDialogVisible =false
                this.addTestForm = {}
                this.$message.success('操作成功！')
                this.getTestList()
                this.getCourseList()
              }
            })
          } else {
           alert('请输入完整信息')
            return false;
          }
        });

      },
      querySearch(queryString, cb) {
        var courseList = this.courseList;
        var results = queryString ? courseList.filter(this.createFilter(queryString)) : courseList;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (courseList) => {
          return (courseList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      getCourseList(){
        this.$http.post('/getcourselist',{
          token:window.sessionStorage.getItem('token')
        }).then(res => {
          this.courseList = res.data
        })
      },
      handleSelect(item){
        this.$http.post('/choosecourselist',item).then(res => {
          this.testList = res.data
          this.total = this.testList.length
          this.showTestList = this.testList.slice(0,7)
          this.state1 = ''
        })
      },
      handleCurrentChange(e){
        this.pagenum = e
        this.showTestList = this.testList.slice((e-1)*7,(e-1)*7+7)
      },
      getFile(item) {
        const addcourse = this.addTestForm.course;
        const addshiyan = this.addTestForm.shiyan;
        const editcourse = this.editTestForm.course;
        const editshiyan = this.editTestForm.shiyan;
        const fileSize = item.file.size / 1024;
        if (fileSize > 30000) {
          alert("您选择的文件太大，请选择小于30M的文件,上传失败")
          item.onError()
        }
        else if(fileSize < 30000){
          this.file = item.file
          // console.log(this.file)
          let fd = new window.FormData()
          fd.append('filename', this.file)
          const config = {  headers: { 'Content-Type': 'multipart/form-data' },
            params: { file:item ,token:window.sessionStorage.getItem('token'),
                        addcourse:addcourse,addshiyan:addshiyan,
              editcourse:editcourse,editshiyan:editshiyan
                        }}
          this.$http.post('uploads', fd,config
          ).then((res)=>{
            if(res.data === 1)
            item.onSuccess()
          },response => {
            console.log('--->>>>>',response)
          })
        }
      },
      // upload() {
      //   let fd = new window.FormData()
      //   fd.append('filename', this.file)
      //   const config = {headers: { 'Content-Type': 'multipart/form-data' },
      //     params: {
      //       file:this.file
      //     },}
      //   this.$http.post('uploads', fd,config
      //   ).then(res => {
      //     console.log(res)
      //   })
      // },


    }
  }
</script>

<style lang="less" scoped>
  .el-form-item{
    width: 95%;
  }
</style>