<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/thome'}">首页</el-breadcrumb-item>
      <!--      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>-->
      <el-breadcrumb-item>信息查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
    <el-row class="cat_opt">
      <el-col>
        <span>班级：</span>
        <el-cascader
                v-model="select.selectClass"
                :options="classList"
                @change="handleClassChange"
        ></el-cascader>
        <span>学生：</span>
        <!--       选择商品分类的级联选择框   -->
        <el-cascader
                v-model="select.selectStudent"
                :options="studentList"
                @change="handlestuChange"
                :disabled="!select.selectClass"
        ></el-cascader>
        <span>实验：</span>
        <el-cascader
                v-model="select.selectTest"
                :options="testList"
                @change="handleshiyanChange"
                :disabled="!select.selectStudent"
        ></el-cascader>
        <el-button type="primary" @click="allInfo">显示全部</el-button>
      </el-col>
    </el-row>
      <el-table :data="resultList" border stripe>
        <el-table-column show-overflow-tooltip align="center" label="班级" prop="class"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="学生名" prop="studentname"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="课程" prop="course"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="实验名称" prop="shiyan"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="实验成绩" prop="result">
          <template slot-scope="scope" >
            <div v-if="scope.row.result">
              <el-tooltip class="item" effect="dark" content="点击查看实验截图" placement="bottom">
                <el-button type="primary" content="删除" style="width: 60px!important;font-size: 15px" size="mini" @click="getResultPic(scope.row)">结果</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点击修改成绩" placement="bottom">
                <el-button type="primary"  size="mini" style="width: 60px!important;font-size: 15px" @click="editResult(scope.row)">{{scope.row.result}}</el-button>
              </el-tooltip>
            </div>
            <div v-else>
              <span>无记录</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="完成时间" prop="finishtime"></el-table-column>
      </el-table>
      <el-dialog
              title="请输入您所给的的分数"
              :visible.sync="editDialog"
              width="30%">
        <el-alert
                title="注意：该分数只能改变总分60%！"
                type="warning" show-icon :closable="false">
        </el-alert>
          <el-input v-model.number="grade"
                    :min="0"
                    :max="100"
                    style="width: 50%!important;"
                    @input.native="onInput"></el-input>
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="deterEditResult">确 定</el-button>
      </el-dialog>
      <el-dialog
              title="结果图"
              :visible.sync="resultPicDialog"
              width="70%">
        <img :src="'http://101.69.255.131:9000/'+item" v-for="item in pictures" style="width: 100%;height: auto" alt="">
      <span slot="footer" class="dialog-footer">
        <el-button @click="resultPicDialog = false">取 消</el-button>
        <el-button type="primary" @click="resultPicDialog = false">确 定</el-button>
      </span>
      </el-dialog>

   </el-card>
  </div>
</template>

<script>
  export default {
    name: "StudentInfo",
    data(){
      return {
        select:{
          selectStudent:'',
          selectClass:'',
          selectTest:'',
        },
        studentList:[],
        classList:[],
        testList:[],
        resultList:[],
        editDialog:false,
        resultPicDialog:false,
        editInfo:{},
        grade:0,
        pictures:[]
      }
    },
    created() {
      this.getClass()
      this.allInfo()
    },
    methods:{
      getClass(){
        this.$http.post('/getclass',{
          token : window.sessionStorage.getItem('token'),
        }).then(res=>{
          // console.log(res.data)
          var len = res.data.length
          for (let i = 0; i < len; i++) {
            this.classList.push({value:res.data[i],label:res.data[i]})
          }
        })
      },
      handleClassChange(){
        this.studentList=[]
        this.testList=[]
        this.selectTest=''
        this.select.selectStudent=[]
        this.$http.post('tsinfoclass',{class : this.select.selectClass[0]}).then(res=>{
          // console.log(res.data)
          this.resultList = res.data[1]
          var len = res.data[0].length
          for (let i = 0; i < len; i++) {
            this.studentList.push({value:res.data[0][i],label:res.data[0][i]})
          }
          console.log(this.studentList)
        })
      },
      handlestuChange(){
        this.testList=[]
        this.selectTest=[]
        // console.log(this.select.selectStudent[0])
        this.$http.post('tsinfostu',{
          class : this.select.selectClass[0],
          name : this.select.selectStudent[0]
        }).then(res => {
          this.resultList = res.data[1]
          var len = res.data[0].length
          this.testList=[]
          for (let i = 0; i < len; i++) {
            this.testList.push({value:res.data[0][i],label:res.data[0][i]})
          }
          console.log(this.testList)
        })
      },
      handleshiyanChange(){
        this.$http.post('tsinfotest',{
          class : this.select.selectClass[0],
          name : this.select.selectStudent[0],
          test : this.select.selectTest[0]
        }).then(res => {
          this.resultList = res.data
        })
      },
      allInfo(){
        this.$http.post('allstuinfo',{
          token : window.sessionStorage.getItem('token'),
        }).then(res => {
          // console.log(res.data)
          this.select.selectClass = ''
          this.select.selectStudent = ''
          this.select.selectTest = ''
          this.resultList = res.data
        })
      },
      editResult(item){
        this.editInfo = item
        this.editDialog = true
        this.grade = item.result
      },
      deterEditResult(){
        this.$http.post('changeresult',{
          item:this.editInfo,
          grade:this.grade,
          token:window.sessionStorage.getItem('token')}).then(res => {
          if(res.data===1){
            this.getClass()
            this.allInfo()
            this.editDialog = false
          }
        })
      },
      getResultPic(info){
        this.$http.post('getstudentpicture',info).then(res => {
          if(res.data.success == true){
            this.pictures = res.data.data
            console.log(this.pictures)
            this.resultPicDialog = true
          }
          else if(res.data.success == false){
            this.$message.error(res.data.data)
          }else{
            this.$message.error(res.data)
          }
        })
        // this.resultPicDialog = true;
      },
      onInput(e){
        this.$message.closeAll();
        // 验证是否是纯数字
        let isNumber = /^\d*$/.test(e.target.value);
        // 过滤非数字
        e.target.value = e.target.value.replace(/\D/g, "");
        if (!isNumber || e.target.value < 0 || e.target.value > 100) {
          this.$message.warning("只能输入[0,100]区间的整数");
        }
        e.target.value = (e.target.value >= 0 && e.target.value <= 100 && e.target.value.match(/^\d*/g)[0]) || null;
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-cascader{
    margin-right: 30px;
  }
</style>