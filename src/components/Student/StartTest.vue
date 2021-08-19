<template>
  <div style="height: 100%;width: 100%" >
  <el-container
          class="shiyancontainer"
                v-loading="loading"
                element-loading-text="正在保存成绩请勿离开"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0)">
    <el-aside  style="background-color:#545c64;height: 100%;width: 15%">
      <el-menu
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
        <el-submenu
                    :index="item.course+ '1'"
                    v-for="item in myTest"
                    :key="item.course"
                    :disabled="!canClick">
          <template slot="title">
            <i class="el-icon-s-management"></i>
            <span>{{item.course}}</span>
          </template>
          <el-menu-item
                        :index="item1.id+'12X'"
                        v-for="item1 in item.children"
                        :key="item1.id"
                        :disabled="canClick && item1.result!==null&& item1.result!=='0'"
                        @click="determineTest(item1)">
            <template slot="title">
              <i class="el-icon-reading"></i>
              <span>{{item1.shiyan}}</span>
            </template>
          </el-menu-item>
          </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
<!--      <div style="height:100%;width: 100%" v-if="startTest">-->
      <div style="height:100%;width: 100%" v-if="!startTest" >
        <el-select v-model="devvalue" placeholder="请确定实验后选择设备" @change="determineDev">
          <el-option
                  v-for="item in options"
                  :key="item.dev_id"
                  :label="item.dev_id"
                  :value="item.dev_id"
                  :disabled="item.is_online==='0'||item.is_bind==='1'">
          </el-option>
        </el-select>
        <el-button @click="$router.go(0)">取消</el-button>
        <el-button @click="checkLink" :disabled="myDevId">确定</el-button>
        <el-button @click="drawer = true">实验信息</el-button>
        <!-- <el-button @click="isBind">检查是否绑定</el-button>
        <el-button @click="unBind" :disabled="!myDevId">解除绑定</el-button> -->
        <dev-info v-on:changeDev="reciveChange" :info="options"></dev-info>
      </div>
      <div style="height:100%;width: 100%;"  v-else
           v-loading="resLoading"
           element-loading-text="正在获取结果"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.5)">
        <div class="step1" >
          <span>当前完成步骤:{{active}}/{{totalSteps}}</span>
          <el-steps :active="active" finish-status="success"  >
            <el-step v-for="a in totalSteps"></el-step>
          </el-steps>
        </div>
        <div style="height:70%;width: 68%;float: left;padding-right:5px;"
             >
          <el-scrollbar ref="myScroll1" style="height:100%;width:100%;background-color: #e1e1e2"
                       >
            <ul style="margin: 10px;padding: 0">
<!--              <li v-for="item in text"><pre>{{item}}</pre></li>-->
              <li v-for="item in text">{{item}}</li>
            </ul>
          </el-scrollbar>
<!--          @paste.native.capture.prevent=""-->
          <el-input
                    v-model.ltrim="input"
                    placeholder="请输入下一条指令"
                    style="width: 60%;height: 30px;margin: 10px 20px"
                    @keyup.enter.native="onSubmit"
                    :disabled="!canInput"
                    clearable></el-input>
          <button  @click="onSubmit" :disabled="!canInput" style="height: 30px;width: 60px;margin: 10px 10px">确定</button>
          <button  @click="drawer = true"  style="height: 30px;width: 100px;margin: 10px 10px">实验信息</button>
          <br/>
          <button  @click="getResult"  style="height: 30px;width: 120px;margin:10px 10px">重新获取结果</button>
          <button  @click="showDevDialog=true"  style="height: 30px;width: 120px;margin:10px 10px">看看实验箱</button>
        </div>
        <div style="height:50%;width: 30%;float: left;background-color: #EEEEE0">
          <span style="padding-left: 5%;height: 30px;">我的历史命令:</span>
          <el-scrollbar ref="myScroll2" style="height:90%;width:100%;">
            <ul  style="margin: 10px;padding: 0">
              <li v-for="item in historyStep" >{{item}}</li>
            </ul>

          </el-scrollbar>
        </div>
        <div style="height:20%;width: 30%;float: left;padding-top:15px;align-items: center;">
        <el-row :gutter="20" >
          <el-col :span="10"><el-button type="success" @click="uploadDialog = true">上传代码至服务器</el-button></el-col>
          <el-col :span="10"><el-button type="success" @click="getFileList">实验箱下载上传代码</el-button></el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6"><el-button type="success" @click="uploadResultPicDialog = true">上传截图</el-button></el-col>
            <el-col :span="6"><el-button type="primary" @click="restartTest">重做实验</el-button></el-col>
            <el-col :span="6"><el-button type="success" @click="submitTest">完成实验</el-button></el-col>
            <el-col :span="6"><el-button type="danger" @click="quitTest">退出实验</el-button></el-col>
        </el-row>
        </div>
<!--        <div class="btns" style="height:32%;width: 30%;float: right;padding-top: 30px;align-items: center">-->
<!--          <el-button type="success" @click="uploadDialog = true">上传代码</el-button>-->
<!--          <el-button type="success" @click="getFileList">提交代码</el-button>-->
<!--          <el-button type="success" @click="uploadResultPicDialog = true">上传图片</el-button>-->
<!--          <br/>-->
<!--          <el-button type="primary" @click="restartTest">重做实验</el-button>-->
<!--          <el-button type="success" @click="submitTest">完成实验</el-button>-->
<!--          <el-button type="danger" @click="quitTest">退出实验</el-button>-->
<!--        </div>-->
      </div>
      <el-drawer
              style="z-index: 9999"
              title="实验详细信息"
              :visible.sync="drawer"
              direction="ltr">
<!--              :before-close="handleDrawerClose">-->
<!--        <span>{{shiyanInfo}}</span>-->
        <el-row style="padding: 10px;margin: 10px">
          <el-col>姓名：{{shiyanInfo.studentname}}</el-col>
          <el-col>学号：{{shiyanInfo.number}}</el-col>
          <el-col>班级：{{shiyanInfo.class}}</el-col>
          <el-col>当前完成进度：{{result}}/{{totalSteps}}</el-col>
          <el-col>
            <a href="" :id="shiyanInfo.jiangyi"  @click="download(shiyanInfo.jiangyi)" download="123">讲义下载：{{shiyanInfo.jiangyi}}</a>
          </el-col>
        </el-row>
        <el-scrollbar ref="myScroll3" style="height:30%;width:100%;background-color: #e1e1e2" @copy.native.capture.prevent="">
          <span>关键步骤：</span>
          <ul style="padding-left: 15px;margin: 10px; " >
            <li v-for="item in grade1" style="margin: 5px">{{item}}</li>
          </ul>
        </el-scrollbar>
      </el-drawer>
      <el-dialog title="提示:请上传可执行文件"
              :visible.sync="uploadDialog"
              width="30%">
        <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList"
                :http-request="uploadFile"
                multiple
                :limit="1"
        >
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
        <span slot="footer" class="dialog-footer">
    <el-button @click="uploadDialog = false">取 消</el-button>
    <el-button type="primary" @click="uploadDialog = false">确 定</el-button>
  </span>
      </el-dialog>
      <el-dialog title="请选择需要提交的代码"
              :visible.sync="getFIleListDialog"
              width="30%">
        <el-select v-model="chooseFile" placeholder="请选择" @change="">
          <el-option
                  v-for="item in myFileList"
                  :key="item"
                  :label="item"
                  :value="item"
          >
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
    <el-button @click="getFIleListDialog = false">取 消</el-button>
    <el-button type="primary" @click="choosedFileName">确 定</el-button>
  </span>
      </el-dialog>
      <el-dialog title="请选择图片"
              :visible.sync="uploadResultPicDialog"
              width="30%">
        <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileResultList"
                :http-request="uploadPicFile"
                list-type="picture"
                :on-remove="handleRemove"
                :limit="2">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">最多2张且为jpg/png/jpeg文件</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
    <el-button @click="uploadResultPicDialog = false">取 消</el-button>
    <el-button type="primary" @click="uploadResultPicDialog = false">确 定</el-button>
  </span>
      </el-dialog>
      <el-dialog title="实验须知"
                 :visible.sync="notifyDialog"
                 width="60%">
        <el-checkbox v-model="checked[3]">实验过程请保持全屏</el-checkbox><br/>
        <el-checkbox v-model="checked[0]">实验过程请勿刷新页面，请勿退出登录。否则考试成绩为0</el-checkbox><br/>
        <el-checkbox v-model="checked[1]">实验操作请严格按照实验指导书进行</el-checkbox><br/>
        <el-checkbox v-model="checked[2]">请按照指导书上的命名样式为编译生成的文件命名</el-checkbox><br/>
<!--        <el-checkbox v-model="checked[3]">实验须知</el-checkbox><br/>-->
<!--        <el-checkbox v-model="checked[4]">实验须知</el-checkbox><br/>-->
        <span slot="footer" class="dialog-footer">
    <el-button @click="notifyDialog = false">取 消</el-button>
    <el-button type="primary" @click="canStartText">确 定</el-button>
<!--    <el-button type="primary" @click="heh">确 定</el-button>-->
        </span>
      </el-dialog>
      <el-dialog
                  center
                  fullscreen
                 :visible.sync="showDevDialog"
                 >
        <Container :is-button=true></Container>
        <span style="position:absolute;right: 0;bottom: 0">
      <el-button @click="showDevDialog = false">取 消</el-button>
      <el-button type="primary" @click="showDevDialog = false">确 定</el-button>
          <!--    <el-button type="primary" @click="heh">确 定</el-button>-->
        </span>
      </el-dialog>
    </el-main>
  </el-container>
  </div>
</template>

<script>
  import DevInfo from "./StartShiyan/DevInfo";
  import Container from "./ShiyanDev/Container";
  export default {
    name: "StartTest",
    components:{
      DevInfo,
      Container
    },
    data(){
      return {
        config : {showLoading: false},
        drawer:false,
        //用于选择设备
        options: [],
        phone:'',
        shiyanInfo:{},
        devvalue: [],
        myDevId:false,
        //实验前的准备变量
        startprepare: 0,
        notifyDialog:false,
        checked:[false,false,false,false],
        //锁定右侧导航栏
        canClick:true,
        //上面的步骤
        active: 0,
        totalSteps:0,
        //历史输入步骤
        historyStep:[],
        //用于匹配的
        deterStep:[],
        myTest:[],
        //发送心跳包
        isAlive : false,
        //锁定输入栏
        canInput : true,
        //显示栏
        text: [],
        input:'',
        grade:[],
        grade1:[],
        //匹配到的字符
        result:0,
        loading:false,
        resLoading:false,
        delay:2000,
        uploadDialog:false,
        uploadfinish:false,
        uploadpic:false,
        getFIleListDialog:false,
        uploadResultPicDialog:false,
        fileList:[],
        myFileList:[],
        chooseFile:'',
        fileResultList:[],
        // endList:[],
        scroll:false,
        showDevDialog:false,
      }
    },

    beforeUpdate() {
      if(this.scroll){
        this.scrollDown()
      }
    },
    computed:{
      startTest(){
        if(this.startprepare == 3){
          return true
        }else return false
      }
    },
    beforeRouteLeave (to, from, next) {
      console.log(this.startprepare)
      if(this.startprepare == 3){
        // 这里需要elementui的支持，如果使用其他界面组件自行替换即可
        this.$confirm('正在离开本页面，本页面内所有未保存数据都会丢失', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 正常跳转
          next()
        }).catch(() => {
          window.sessionStorage.setItem('activePath','/start')
          // 如果取消跳转地址栏会变化，这时保持地址栏不变
          window.history.go(1)
        })
      }else{
        next()
      }

    },
    mounted(){
      window.onbeforeunload = function (e) {
          e = e || window.event;
          // 兼容IE8和Firefox 4之前的版本
          if (e) {
            e.returnValue = '关闭提示';
          }
          // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
          return '关闭提示';
        }
    },
    created() {
      this.getCourse()
      this.getPhone()
      // this.$store.commit('storeConnectResult',false)
    },
    beforeDestroy() {
      window.onbeforeunload = function (e) {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = '关闭提示';
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示';
      }
      this.isAlive = false
      this.loading = true
      this.delDev()
      // window.removeEventListener('resize', this.controlFun)
      // window.removeEventListener('beforeunload', e => this.delDev())
    },
    destroyed() {

      // this.delDev()
    },
    methods: {
      reciveChange(msg){
        this.devvalue = msg
        this.determineDev()
      },
      //全屏

      controlFun() {
        if (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
          this.screenShow = true
        } else {
          this.screenShow = false
        }
      },
      heh(){
        const a = this.checked.indexOf(false)
        console.log(a)
      },
      //获取电话
      getPhone(){
        this.$http.post('getstudentphone',{token:window.sessionStorage.getItem('token')}).then(
          res => {
            if(res.data.success === true){
              this.phone=res.data.msg
            }else{
              alert('token值被修改，请重新登录')
            }
          }
        )
      },
      getDevInfo(){
        this.$http.post('getDevInfo').then(res => {
          console.log(res.data)
          if(res.data.success === true){
            this.options = res.data.devInfo
            this.myDevId = false
          }else{
            alert('获取设备信息失败请刷新页面')
          }
        })
      },
      //下载
      download(jiangyi){
        const link2 = document.getElementById(jiangyi);
        link2.href = "/api/download?num=" + this.shiyanInfo.teachernum + "&jiangyi=" + this.shiyanInfo.jiangyi + "&course=" + this.shiyanInfo.course + "&shiyan=" + this.shiyanInfo.shiyan;
        link2.download = jiangyi
      },
      isBind(){
         this.$http.post('isBindDev',{userPhone: this.phone}).then(res=>{
          if(res.data.success === true){
            this.$message.error(`你已经绑定设备${res.data.devId},正在初始化`)
            this.devvalue = res.data.devId
            this.myDevId = true
            // return ture
            this.unBind()
          }else this.getDevInfo();
        })
      },
      unBind(){
        return this.$http.post('delBindDev', {userPhone: this.phone, devId: this.devvalue}).then(res => {
          this.devvalue = []
          this.getDevInfo()
        }
        )
      },
      getCourse() {
        this.$http.post('/getstucourse', {
          token: window.sessionStorage.getItem('token')
        }).then(res => {
          // console.log(res.data)
          this.myTest = res.data.sort((a, b) => a['course'].localeCompare(b['course']))
        })
      },
      //连接sip发条包
      test() {
        this.$http.post('isBindDev',{userPhone: this.phone}).then(res => {
          console.log(res.data)
          if(res.data.success === true){
            this.$http.post('userLoginSip', {userPhone: this.phone}, this.config).then(res => {
              console.log(res.data)
              if(res.data.alive === true){
                this.$http.post('/userHeartbeat', {userPhone: this.phone}, this.config)
                this.isAlive = true
                this.alive()
              }else{
                alert('实验箱不在线')
                this.isAlive = false
                this.$confirm('实验箱不在线，请重新绑定', '警告', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'success',
                  callback: action => {
                    if (action === 'confirm') {
                      this.delDev()
                      this.$router.go(0)
                    }
                    else {

                    }
                  }
                })
              }
            })
          }
        })
      },
      alive() {
        if (this.isAlive){
          setTimeout(() => {
            // const config = {showLoading: false}
            // this.$http.post('alivesocket',{},config).then(res => {
            this.$http.post('/userHeartbeat', {userPhone: this.phone}, this.config).then(res => {
              // console.log(res)
              // console.log(res.data.devAlive)
              // if(res.data === 'alive')
              if (this.isAlive && res.data.devAlive) {
                console.log('15秒发送心跳包')
                // this.$message.success('15秒发送心跳包')
                this.alive()
              } else {
                if(this.isAlive)
                this.$message.error('实验箱不在线')
              }
            })
          },9000)
        }
      },
      delDev(){
        this.isAlive = false
        return this.$http.post('User/finishExperiment', {userPhone: this.phone, devId: this.devvalue}).then(res => {
          const a = typeof(res.data.success)
          if(a && !this.isAlive){
            return true
          }else{alert('出错了')}
        })
      },
      // 确定做实验
      determineTest(e) {
        this.shiyanInfo = e
        var re = e.step.split(':&:')
        this.grade1 = re
        re.splice(0, 1)
        // console.log(re)
        this.totalSteps = re.length
        this.grade = re
        this.grade1 = re.slice(0, this.totalSteps)
        // console.log(this.grade.children)
        this.startprepare = 1
        this.canClick = false
        this.isBind()
      },
      determineDev() {
        if (this.startprepare === 1 || this.devvalue) {
          console.log(this.startprepare)
          this.startprepare = 2
          this.$message.success('选择了' + this.devvalue + '号设备！')
        } else this.$message.error('请确定实验或设备！')
      },
      checkLink(){
        console.log(this.$store.getters.getConnectResult)
        if(this.$store.getters.getConnectResult){
          this.notifyDialog = true
        }else{
          this.$message.error('请点击下方“打开试验箱”，正确连接实验箱')
        }
      },
      canStartText() {
        if (this.startprepare === 2) {
          if(this.checked.indexOf(false) === -1){
            this.$http.post('/bindDev',{userPhone:this.phone,devId:this.devvalue}).then(res => {
              if(res.data.success === true ){
                this.$message.success('开始实验！')
                this.notifyDialog = false
                this.startprepare = 3
                this.test()
              }else {
                this.$message.error(res.data.message+'页面刷新后重新点击“做实验”')
                this.$router.go(0)
              }
            })
          }else this.$message.error('请确定所有实验须知')
        } else this.$message.error('请确定实验或设备！')
      },
      //获取结果
      getResult(){
        this.resLoading = true
        setTimeout(() => {
          // const config = {showLoading: false}
          this.$http.post('/User/userGetOptsRes', {userPhone: this.phone},this.config).then(
            res => {
              if(res.data.success == true){
                const arr = (res.data.dataRes).replace(/\n/g,"###")
                // const arr =res.data.dataRes;
                // console.log(arr)
                var arrs = new Array()
                arrs = arr.split("###")
                if (res.data.success === false) {
                  this.text.push('ans:请稍后重试')
                  this.canInput = true
                  this.gradett(this.deterStep, this.grade, this.result)
                  this.resLoading = true
                  setTimeout(() => {
                    // console.log(this.result)
                    this.resLoading = false
                    this.active = this.result
                    this.canInput = true
                  }, 50)

                } else {
                  for (let i = 0; i < arrs.length; i++) {
                    if(i===0){
                      this.text.push('ans:' + arrs[i])
                      this.scrollDown()
                    }else{
                      this.text.push('\xa0\xa0\xa0\xa0\xa0\xa0'+arrs[i])
                    }
                  }
                  this.canInput = true
                  this.gradett(this.deterStep, this.grade, this.result)
                  this.resLoading = true
                  setTimeout(() => {
                    // console.log(this.result)
                    this.resLoading = false
                    this.active = this.result
                    this.canInput = true
                  }, 50)
                }
              }else{
                this.resLoading = false
                this.active = this.result
                this.canInput = true
                this.$message.error('设备未响应')
                this.text.push('ans:设备未响应，稍后点击重新获取结果')
              }

            }
          )
        }, this.delay)
      },
      //写代码
      onSubmit() {
        if (this.input) {
          this.canInput = false
          this.scroll = true
          this.text.push('my:' + this.input)
          this.historyStep.push(this.input)
          let reg = /^ping/;
          if (reg.test(this.input)) {
            this.delay = 4000
          } else {
            this.delay = 2000
          }
          this.deterStep.push(this.input)
          // const config = {showLoading:false}
          this.$http.post('/experimentOptions',
            {
              method: 'NOTIFY',
              userPhone: this.phone,
              bodyRootEle: 'syx_options',
              bodyParams: {options: this.input},
            },this.config).then(res => {
            this.input = ''
            if (res.data.success === true) {
              this.getResult()
            }
          })


        } else {
          this.$message.warning('不能为空!')
        }
      },
      scrollDown() {
        this.$refs['myScroll1'].wrap.scrollTop = this.$refs['myScroll1'].wrap.scrollHeight
        this.$refs['myScroll2'].wrap.scrollTop = this.$refs['myScroll2'].wrap.scrollHeight
      },
      restartTest() {
//重启机器记录全部删除
        this.$http.post('User/userRestartExperiment',{
          devId:this.devvalue,
          userPhone:this.phone
        }).then(res=>{
          console.log(res);
        })
      },
      //提交成绩数据，刷新，断开连接
      submitTest() {
        console.log(this.delDev());
        if(this.delDev()){
          this.isAlive = false
          this.loading = true
          setTimeout(() => {
            this.loading = false
            const grde = this.result / this.totalSteps
            console.log(this.result)
            this.shiyanInfo.grade = grde
            this.$http.post('uploadResult',this.shiyanInfo).then(res => {
              console.log(res)
            })
            setTimeout(() => {
              this.startprepare = 0
              this.$router.push('/grade')
            }, 500)
          }, 1000)
        }else{
          alert('设备不在线，请退出出实验')
        }
      },
      // 计算成绩
      gradett(e, g, re) {
        console.log(e)
        console.log(g)
        if (e[0] === g[0] && g.length > 0) {
          e.splice(0, 1);
          g.splice(0, 1);
          re += 1;
          this.result = re
          if (g.length == 0 || e.length == 0) {
            this.gradett(e, g, re)
          }
        } else {
          e.splice(0, 1);
        }
      },
      quitTest() {
        this.$confirm('退出实验，任何信息将不被保存', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          callback: action => {
            if (action === 'confirm') {
              this.isAlive=false
              if(this.delDev()){
                this.$router.go(0)
              }
            }
            else {
              this.$message.success('继续实验')
            }
          }
        })
      },
      //上传功能
      uploadFile(item) {
        this.uploadfinish = false
        var pos = item.file.name.lastIndexOf(".")
        var su = item.file.name.substring(pos+1)
        if(pos===-1||su==='ko'){
          this.file = item.file
          // console.log(this.file)
          let fd = new window.FormData()
          fd.append('fileName', this.file)
          // console.log(this.file)
          const config = {
            headers: {'Content-Type': 'multipart/form-data'},
            params: {
              devid : this.devvalue
            }
          }
          this.$http.post('User/userUploadFiles', fd, config
          ).then((res) => {
            if (res.data.success === true) {
              item.onSuccess()
              this.uploadfinish = true
            }
          }, response => {
            console.log('--->>>>>', response)
          })
        }else{
          this.fileList = []
          this.$message.error('不被允许的文件类型')
        }
      },
      uploadPicFile(item){
        if(item.file.type==='image/jpeg'||item.file.type==='image/png'||item.file.type==='image/jpg'){
          this.uploadpic = false
          const info = this.shiyanInfo
          let fd = new window.FormData()
          fd.append('fileName', item.file)
          const config = {
            headers: {'Content-Type': 'multipart/form-data'},
            params: {
              token : window.sessionStorage.getItem('token'),
              info
            }
          }
          this.$http.post('studentuploadpic', fd, config
          ).then((res) => {
            // console.log(res.data)
            if (res.data === true) {
              item.onSuccess()
              this.uploadpic = true
            }
          }, response => {
            console.log('--->>>>>', response)
          })
        }else{
          this.$message.error('图片类型必须是.gif,jpeg,jpg,png')
          this.fileResultList = []
        }
      },
      deterUploadPic(){
      },
      handleRemove(file){
        const Info = this.shiyanInfo
        Info.fileName = file.name
        this.$http.post('sturemovepicture',Info).then(
          res => {
            if(res.data){
              this.$message.success('删除成功')
            }else{
              this.$message.error(res.data)
            }
          }
        )
      },
      //获取上传的文件
      getFileList(){
        this.getFIleListDialog = true
        this.$http.post('User/userGetUploadFilesList',
          {devId:this.devvalue}).then(res => {
            this.myFileList = res.data.filelist
        })
      },
      //运行上传的文件
      choosedFileName(){
        this.$http.post('User/userSendFilenameToDev',{
          devId:this.devvalue,
          userPhone:this.phone,
          fileName:this.chooseFile
        }).then(res => {
          if(res.data.success == true){
            this.text.push('my:提交了代码文件' + this.chooseFile)
            this.historyStep.push('提交了代码文件' + this.chooseFile)
            this.resLoading = true
            this.getFIleListDialog = false
            setTimeout(() => {
              this.$http.post('/User/userGetOptsRes', {userPhone: this.phone},this.config).then(
                res => {
                  if(res.data.success == true){
                    const arr = (res.data.dataRes).replace(/\n/g,"###")
                    // const arr =res.data.dataRes;
                    // console.log(arr)
                    var arrs = new Array()
                    arrs = arr.split("###")
                    if (res.data.success === false) {
                      this.text.push('ans:请稍后重试')
                      this.canInput = true
                      this.gradett(this.deterStep, this.grade, this.result)
                      this.resLoading = true
                      setTimeout(() => {
                        // console.log(this.result)
                        this.resLoading = false
                        this.active = this.result
                        this.canInput = true
                      }, 50)

                    } else {
                      for (let i = 0; i < arrs.length; i++) {
                        if(i===0){
                          this.text.push('ans:' + arrs[i])
                          this.scrollDown()
                        }else{
                          this.text.push('\xa0\xa0\xa0\xa0\xa0\xa0'+arrs[i])
                        }
                      }
                      this.canInput = true
                      this.gradett(this.deterStep, this.grade, this.result)
                      this.resLoading = true
                      setTimeout(() => {
                        // console.log(this.result)
                        this.resLoading = false
                        this.active = this.result
                        this.canInput = true
                      }, 50)
                    }
                  }else{
                    this.resLoading = false
                    this.active = this.result
                    this.canInput = true
                    this.$message.error('设备未响应')
                    this.text.push('ans:设备未响应')

                  }
                }
              )
            }, 3000)
          }
        })
      }

    }
  }
</script>

<style lang="less" scoped>
 .box-card{
   height: 10%;
   width: 50%;
 }
 li{
   display:block;
   width:100%;
   margin-right:10px;
   white-space:normal;
   word-break : break-all;
   word-wrap: break-word;
 }
 .shiyancontainer{
   height: 100%;
 }
 .el-aside{
   /*height: 90% !important;*/
   background-color: #323744;
   .el-menu{
     border-right: none;
   }
 }
  .el-col{
    margin: 10px;
  }
  .el-button{
    margin-bottom: 5px;
    /*position: relative;*/
  }
  .el-checkbox{
    font-size: 20px!important;
  }
 .full_Screen {
   z-index: 800;
   position: fixed;
   left: 15px;
   bottom: 10px;
   color: #606266;
   border: 1px solid #c0c4cc;
   background-color: white;
   border-radius: 50px;
   padding: 3px 8px;
 }
 .container_full_element {
   position: fixed;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   z-index: 9999;
 }
 .el-row{
  margin: 0!important;
 }
 .step1{
   height:10%;width: 100%;float: left;font-size: 16px!important;
 }
 .el-step__title{
   font-size: 14px;
   margin-top: 5px;
   max-width: 100px !important;
   margin-left: 20px;
 }
</style>