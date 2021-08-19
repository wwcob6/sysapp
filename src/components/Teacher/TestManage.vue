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
      <el-button @click="getDefault">批量添加</el-button>
      <el-table :data="showTestList" border stripe>
        <el-table-column show-overflow-tooltip align="center" label="课程" prop="course"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="实验名" prop="shiyan"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="实验关键字/备注" prop="keyword"></el-table-column>
        <el-table-column  align="center" label="自动评分代码">
          <template scope="scope">
            <el-popover
                    placement="right"
                    width="400"
                    trigger="click">
<!--              <ul v-for="item in scope.row.step">-->
<!--                <li >{{item}}</li>-->
<!--              </ul>-->
              <el-scrollbar ref="myScroll3" style="height:30%;width:100%;background-color: #e1e1e2">
                <ul style="">
                  <li v-for="item in scope.row.step">{{item}}</li>
                </ul>
              </el-scrollbar>
              <el-button slot="reference" size="small" type="primary">点击查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="讲义" prop="jiangyi">
          <template scope="scope">
            <a href="" :id="scope.row.jiangyi+scope.row.id" @click="downloadJiangyi(scope.row)" download="123">{{scope.row.jiangyi}}</a>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="操作" >
          <template slot-scope="scope">
            <!--            修改-->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editTest(scope.row)"></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delTest(scope.row)"></el-button>
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
<!--    //修改信息-->
    <el-dialog
            title="修改实验信息"
            :visible.sync="editTestDialogVisible"
            width="50%"
            @close="editTestDialogVisible = false"
            :close-on-click-modal = "false"
            :close-on-press-escape = "false"
            :showClose="false"
    >
      <el-form :model="editTestForm" ref="editFormRef" :rules="rules" label-width="120px" >
        <el-form-item label="课程" prop="course" >
          <el-input v-model="editTestForm.course" disabled></el-input>
        </el-form-item>
        <el-form-item label="实验名" prop="shiyan" >
          <el-input v-model="editTestForm.shiyan" disabled></el-input>
        </el-form-item>
        <el-form-item label="关键字/备注" prop="keyword">
          <el-input v-model="editTestForm.keyword" ></el-input>
        </el-form-item>
        <el-form-item label="自动评分代码" prop="step">
          <template scope="scope">
            <el-button type="primary"  @click="showStep">修改</el-button>
          </template>
        </el-form-item>
        <el-form-item label="实验讲义" prop="jiangyi" >
          <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :file-list="fileList1"
                  :http-request="getFile"
                  multiple
                  :limit="1"
                  :handleRemove="heh"
          >
            <el-button size="small" type="primary">只允许上传一个讲义！ 当前已有讲义 : {{editTestForm.jiangyi}}</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editTestList">确 定</el-button>
      </span>
    </el-dialog>
<!--    //增加信息-->
    <el-dialog
            title="添加实验"
            :visible.sync="addTestDialogVisible"
            width="50%"
            @close="addTestDialogVisible = false"
            :close-on-click-modal = "false"
            :close-on-press-escape = "false"
            :showClose="false"
    >
      <el-form :model="addTestForm" ref="addFormRef" :rules="rules" label-width="120px">
        <el-form-item label="课程" prop="course" >
          <el-input v-model="addTestForm.course"></el-input>
        </el-form-item>
        <el-form-item label="实验名" prop="shiyan">
          <el-input v-model="addTestForm.shiyan"></el-input>
        </el-form-item>
        <el-form-item label="关键字/备注" prop="keyword">
          <el-input v-model="addTestForm.keyword"></el-input>
        </el-form-item>
        <el-form-item label="自动评分代码" prop="step">
          <el-button type="primary"  @click="stepDialogVisible=true">添加</el-button>
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
          <el-button @click="cancer">取 消</el-button>
          <el-button type="primary" @click="addTestList">确 定</el-button>
      </span>
    </el-dialog>
<!--    //step-->
    <el-dialog
            title="实验代码"
            :visible.sync="stepDialogVisible"
            width="60%"
    >
      <el-form :model="stepForm" ref="stepForm" label-width="120px" >
        <el-form-item
                class="stepcss"
                size="small "
                v-for="(domain, index) in stepForm.domains"
                :label="'step' + (index+1)"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{
      required: true, message: '不能为空', trigger: 'blur',validator: gvari.validateNull
    }"
        >
          <el-input v-model="domain.value" style="width: 70%!important;margin-right: 10px"></el-input><el-button @click.prevent="removeStepDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitStepForm('stepForm')">确定</el-button>
          <el-button @click="addStepDomain">新增指令</el-button>
          <el-button @click="resetStepForm('stepForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
<!--    默认实验-->
    <el-dialog
            title="添加你想要的实验。指导书等部分内容可以自定义修改"
            :visible.sync="addDefaultDialogVisible"
            width="60%"
    >
      <span>只提供嵌入式的实验</span>
      <el-checkbox-group v-model="addDefaultList" :key="item" v-for="item in defaultTest">
        <el-checkbox  :label="item.id" :key="item.id">{{item.shiyan}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
      <el-button @click="addDefaultDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addDefault">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "TestManage",
    data(){
      return{
        stepForm:{
          domains: [{
            value: ''
          }],
        },
        addDefaultDialogVisible:false,
        uploadfinish: true,
        progressPercent :0,
        progressFlag : true,
        file: {},
        fileList1: [],
        fileList2: [],
        editTestDialogVisible:false,
        addTestDialogVisible:false,
        stepDialogVisible:false,
        testList:[],
        rules:{
          course:[
            {validator: this.gvari.validateNull,trigger: 'blur'},
            { required: true, message: '请输入课程名', trigger: 'blur' }],
          shiyan:[ {validator: this.gvari.validateNull, required: true, message: '请输入实验名', trigger: 'blur' }],
          keyword:[ {validator: this.gvari.validateNull, required: true, message: '请输入实验关键字', trigger: 'blur'}],
          step:[ { required: true, message: '请输入指令，并确定保存', trigger: 'blur' }]
        },
        editTestForm:{
          course:'',
          shiyan:'',
          keyWord:'',
          step:null
        },
        addTestForm:{
          course:'',
          shiyan:'',
          keyword:'',
          step:null
        },
        state1:'',
        courseList:[],
        total:0,
        pagenum:1,
        showTestList:[],
        defaultTest:[],
        addDefaultList:[],
      }
    },
    created() {
      this.getTestList()
      this.getCourseList()
      // console.log(window.location.href)
    },
    methods:{
      getDefault(){
        this.$http.post('/getdefaulttest').then(res => {
          if(res.status == 200){
            this.defaultTest = res.data
            this.addDefaultDialogVisible = true
          }else{
            this.$message.error('服务器出错')
          }
        })
        // this.addDefaultDialogVisible = true
      },
      addDefault(){
        if(this.addDefaultList.length){
          this.$http.post('adddefaulttest',{token:window.sessionStorage.getItem('token'),List:this.addDefaultList}).then(res => {
            if(res.status == 200){
              this.$message.warning(res.data)
              this.getTestList()
              this.getCourseList()
              this.addDefaultDialogVisible = false
            }
          })
        }
       else {
         this.$message.error('请选择课程')}
      },
      submitStepForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editTestForm.step = this.stepForm.domains
            this.addTestForm.step = this.stepForm.domains
            this.stepDialogVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetStepForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeStepDomain(item) {
        var index = this.stepForm.domains.indexOf(item)
        if (index !== -1) {
          this.stepForm.domains.splice(index, 1)
        }
      },
      addStepDomain() {
        this.stepForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
      showStep(e){
        this.stepDialogVisible = true
      },
      getTestList(){
        this.$http.post('/gettestlist',{
          token:window.sessionStorage.getItem('token')
        }).then(res => {
          this.testList = res.data.sort((a,b)=>a['course'].localeCompare(b['course']))
          this.total = this.testList.length
          this.showTestList = this.testList.slice(0,7)
          this.pagenum = 1
        })
      },
      editTest(res){
        this.stepForm = { 
          domains: [{
            value: ''
          }],}
        this.editTestForm = res
        this.editTestDialogVisible = true
        let step = this.editTestForm.step
        // console.log(Object.keys(step).length);
        for (let i = 1; i < Object.keys(step).length+1; i++) {
          this.stepForm.domains.push({
            value: step[i],
            key: Date.now()+i
          });
        }
        this.stepForm.domains.splice(0,1)
        // console.log(this.stepForm.domains)
      },
      delTest(e){
        this.$http.post('/deltestlist',{
          token:window.sessionStorage.getItem('token'),
          id:e.id
        },{showLoading: false}).then(res=>{
          console.log(res.data);
          this.$message.warning(res.data);
          this.getTestList();
        })
      },
      downloadJiangyi(res){
        console.log(res)
        const link2 = document.getElementById(res.jiangyi+res.id);
        // link2.href="/api/download?num="+res.num+"&jiangyi="+res.jiangyi+"&course="+res.course+"&shiyan="+res.shiyan;
        link2.href="/api/upload/teacher/"+res.num+"/"+res.course+"/"+res.shiyan+"/"+res.jiangyi;
        link2.download = res.shiyan+'_'+res.jiangyi
        // link2.click();
      },
      editTestList(){
        if(this.uploadfinish == false){
          this.$message.success('正在上传！')
        }
        this.fileList1 = []
        this.$refs.editFormRef.validate((valid) => {
          if (valid) {
            this.editTestForm.filename = this.file.name
            this.editTestForm.step = this.stepForm.domains
            // console.log(this.editTestForm)
            this.$http.post('/edittestlist', this.editTestForm,{showLoading: false}).then().catch(err => err)
                this.editTestForm = {}
                if(this.file.name){
                  this.$message.success('后台正在生成'+this.file.name+'预览！')
                }
                setTimeout(() => {
                  this.getTestList()
                  this.getCourseList()
                  this.editTestDialogVisible = false
                },1000)
            this.file = {}
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addTestList(){
        if(this.uploadfinish == false){
          alert('正在上传！请等待')
        }else{
          this.$refs.addFormRef.validate((valid) => {
            if (valid) {
              this.addTestForm.token = window.sessionStorage.getItem('token')
              if(this.file){
                this.addTestForm.filename = this.file.name
              }else{
              }
              // console.log(this.addTestForm);
              // if(this.addTestForm.course)
                this.$http.post('/addtestlist',this.addTestForm,{showLoading: false}).then(res =>{
                  if(res.status == 500){
                    this.$message.error('无法生成预览文件')
                  }
                })
                this.getTestList()
                this.getCourseList()
                this.addTestDialogVisible =false
                this.addTestForm = {}
                this.stepForm = {domains: [{value: ''}],}
                this.$message.success('操作成功！')
            } else {
              alert('请输入完整信息')
              return false;
            }
          });
        }

      },
      cancer(){
        if(this.uploadfinish == false){
          alert('正在上传！请等待')
        }else{
          this.addTestDialogVisible = false
          this.editTestDialogVisible = false
        }
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
          // console.log(res.data)
          this.courseList = res.data.sort((a,b)=>a['value'].localeCompare(b['value']))
        })
      },
      handleSelect(item){
        this.$http.post('/choosecourselist',item).then(res => {
          this.testList = res.data.sort((a,b)=>a['shiyan'].localeCompare(b['shiyan']))
          this.total = this.testList.length
          this.showTestList = this.testList.slice(0,8)

        })
      },
      handleCurrentChange(e){
        this.pagenum = e
        this.showTestList = this.testList.slice((e-1)*8,(e-1)*8+8)
      },
      getFile(item) {
        this.uploadfinish = false
        // console.log(item.file.name)
        var pos = item.file.name.lastIndexOf(".")
        var su = item.file.name.substring(pos+1)
        // console.log(su)
        const addcourse = this.addTestForm.course;
        const addshiyan = this.addTestForm.shiyan;
        const editcourse = this.editTestForm.course;
        const editshiyan = this.editTestForm.shiyan;
        const fileSize = item.file.size / 1024;
        if(su !== 'docx' && su !== 'doc' && su !== 'pdf'){
          alert("当前只支持doc/docx/phf格式的文件")
          this.fileList1 = []
          this.fileList2 = []
        }else{
          if (fileSize > 30000) {
            alert("您选择的文件太大，请选择小于30M的文件,上传失败")
            item.onError()
            this.fileList1 = []
            this.fileList2 = []
          }
          else if(fileSize < 30000){

            // this.$message.success('正在上传请等待')
            this.file = item.file
            // console.log(this.file)
            let fd = new window.FormData()
            fd.append('filename', this.file)
            const config = {
              headers: { 'Content-Type': 'multipart/form-data' },
              params: { file:item ,token:window.sessionStorage.getItem('token'),
                addcourse:addcourse,addshiyan:addshiyan,
                editcourse:editcourse,editshiyan:editshiyan
              }}
            this.$http.post('uploads', fd,config
            ).then((res)=>{
              // console.log(res)
              if(res.data === true || res.data === 1){
                item.onSuccess()
                this.uploadfinish = true
                this.$message.warning('文件上传完成，后台正在生成预览文件。')
              }else if(res.data === 'no'){
                if(this.addTestForm.course){
                  alert('该课程实验已经存在，请重新添加')
                }
                this.addTestForm = {}
              }
            },response => {
              console.log('--->>>>>',response)
            })
        }

        }
      },
      heh(){
        console.log('1')
      }


    }
  }
</script>

<style lang="less" scoped>
  .el-form-item{
    width: 95%;
  }
  .stepcss{
    /*margin: 0!important;*/
    /*padding: 0!important;*/
  }
</style>