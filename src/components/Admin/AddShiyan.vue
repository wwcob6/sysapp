<template>
  <div>
    <div style="height=60%;float:left;width:100%">
      <el-table :data="showTestList" border stripe>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="课程"
          prop="course"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="实验名"
          prop="shiyan"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="实验关键字/备注"
          prop="keyword"
        ></el-table-column>
        <el-table-column align="center" label="自动评分代码">
          <template scope="scope">
            <el-popover placement="right" width="400" trigger="click">
              <!--              <ul v-for="item in scope.row.step">-->
              <!--                <li >{{item}}</li>-->
              <!--              </ul>-->
              <el-scrollbar
                ref="myScroll3"
                style="height: 30%; width: 100%; background-color: #e1e1e2"
              >
                <ul style="">
                  <li v-for="item in scope.row.step">{{ item }}</li>
                </ul>
              </el-scrollbar>
              <el-button slot="reference" size="small" type="primary"
                >点击查看</el-button
              >
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="讲义"
          prop="jiangyi"
        >
          <template scope="scope">
            <a
              href=""
              :id="scope.row.jiangyi + scope.row.id"
              @click="downloadJiangyi(scope.row)"
              download="123"
              >{{ scope.row.jiangyi }}</a
            >
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="操作">
          <template slot-scope="scope">
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delTest(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="height: 20%; float: left; width: 100%">
      <el-button @click="addTestDialogVisible = true">添加实验</el-button>
    </div>
    <el-dialog
      title="添加实验"
      :visible.sync="addTestDialogVisible"
      width="50%"
      @close="addTestDialogVisible = false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :showClose="false"
    >
      <el-form
        :model="addTestForm"
        ref="addFormRef"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="课程" prop="course">
          <el-input v-model="addTestForm.course"></el-input>
        </el-form-item>
        <el-form-item label="实验名" prop="shiyan">
          <el-input v-model="addTestForm.shiyan"></el-input>
        </el-form-item>
        <el-form-item label="关键字/备注" prop="keyword">
          <el-input v-model="addTestForm.keyword"></el-input>
        </el-form-item>
        <el-form-item label="自动评分代码" prop="step">
          <el-button type="primary" @click="stepDialogVisible = true"
            >添加</el-button
          >
        </el-form-item>
        <el-form-item label="讲义">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList2"
            :http-request="getFile"
            multiple
            :limit="1"
            v-if="addTestForm.course && addTestForm.shiyan"
          >
            <el-button size="small" type="primary"
              >请确定课程和实验名再上传</el-button
            >
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancer">取 消</el-button>
        <el-button type="primary" @click="addTestList">确 定</el-button>
      </span>
    </el-dialog>
    <!--    //step-->
    <el-dialog title="实验代码" :visible.sync="stepDialogVisible" width="60%">
      <el-form :model="stepForm" ref="stepForm" label-width="120px">
        <el-form-item
          class="stepcss"
          size="small "
          v-for="(domain, index) in stepForm.domains"
          :label="'step' + (index + 1)"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
            validator: gvari.validateNull,
          }"
        >
          <el-input
            v-model="domain.value"
            style="width: 70% !important; margin-right: 10px"
          ></el-input
          ><el-button @click.prevent="removeStepDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitStepForm('stepForm')"
            >确定</el-button
          >
          <el-button @click="addStepDomain">新增指令</el-button>
          <el-button @click="resetStepForm('stepForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addTestDialogVisible: false,
      stepDialogVisible: false,
      showTestList: [],
      addTestForm: [],
      stepForm: [],
      rules: {
        course: [
          { validator: this.gvari.validateNull, trigger: "blur" },
          { required: true, message: "请输入课程名", trigger: "blur" },
        ],
        shiyan: [
          {
            validator: this.gvari.validateNull,
            required: true,
            message: "请输入实验名",
            trigger: "blur",
          },
        ],
        keyword: [
          {
            validator: this.gvari.validateNull,
            required: true,
            message: "请输入实验关键字",
            trigger: "blur",
          },
        ],
        step: [
          {
            required: true,
            message: "请输入指令，并确定保存",
            trigger: "blur",
          },
        ],
      },
      addTestForm: {
        course: "",
        shiyan: "",
        keyword: "",
        step: null,
      },
      fileList2: [],
      stepForm:{
          domains: [{
            value: ''
          }],
        },
    };
  },
  created() {
    this.getDefault();
  },
  methods: {
    getDefault() {
      this.$http.post("/getdefaulttest", "", { isCheck: false }).then((res) => {
        if (res.status == 200) {
          this.showTestList = res.data;
        } else {
          this.$message.error("服务器出错");
        }
      });
      // this.addDefaultDialogVisible = true
    },
    addTestList(){
        if(this.uploadfinish == false){
          alert('正在上传！请等待')
        }else{
          this.$refs.addFormRef.validate((valid) => {
            if (valid) {
              if(this.file){
                this.addTestForm.filename = this.file.name
              }else{
              }
              // console.log(this.addTestForm);
              // if(this.addTestForm.course)
                this.$http.post('/admin/addtestlist',this.addTestForm,{showLoading: false,isCheck:false}).then(res =>{
                  if(res.status == 500){
                    this.$message.error('无法生成预览文件')
                  }
                })
                this.getDefault()
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
      addStepDomain() {
        this.stepForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
    cancer() {
      if (this.uploadfinish == false) {
        alert("正在上传！请等待");
      } else {
        this.addTestDialogVisible = false;
      }
    },
    getFile(item) {
        this.uploadfinish = false
        // console.log(item.file.name)
        var pos = item.file.name.lastIndexOf(".")
        var su = item.file.name.substring(pos+1)
        // console.log(su)
        const addcourse = this.addTestForm.course;
        const addshiyan = this.addTestForm.shiyan;
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
              isCheck:false,
              headers: { 'Content-Type': 'multipart/form-data' },
              params: { file:item ,token:window.sessionStorage.getItem('token'),
                addcourse:addcourse,addshiyan:addshiyan,
              }}
            this.$http.post('admin/upload', fd,config
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
      submitStepForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addTestForm.step = this.stepForm.domains
            this.stepDialogVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      removeStepDomain(item){
        var index = this.stepForm.domains.indexOf(item)
        if (index !== -1) {
          this.stepForm.domains.splice(index, 1)
        }
      },
      delTest(msg){
        this.$http.post('/admin/deltest',{"id":msg.id},{showLoading: false,isCheck:false}).then(res=>{
          if(res.data==true){
            this.$message.success("删除成功！")
            this.getDefault();
          }else{
            this.$message.error("删除失败！")
            this.getDefault();
          }
        })
      }

  },
};
</script>

<style>
</style>