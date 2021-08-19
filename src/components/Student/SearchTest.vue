<template>
  <el-container class="piccontainer">
    <el-aside width="300px" style="border:1px solid #c3deb7;height: 100%">
      <div style="height: 60%">
      <div style="text-align: center;
      display:table-cell;
      width: 300px;
      background-color: aqua;
      border-bottom:1px solid #c3deb7;
      vertical-align:middle;
      height: 20px;">
        <span>实验列表</span>
      </div>
      <el-table
              highlight-current-row
              border stripe
              size="mini"
              @row-click="myTestInfo"
              :data="allTestShow"
              :row-style="{height: '25px'}"
              :cell-style="{padding: '0'}"
              style="width: 100%;align-items: center;cursor:pointer">
        <el-table-column show-overflow-tooltip
                align="center"
                prop="course"
                label="课程名称"
        >
        </el-table-column>
        <el-table-column show-overflow-tooltip
                align="center"
                prop="shiyan"
                label="实验名"
        >
        </el-table-column>
        <el-table-column show-overflow-tooltip
                         align="center"
                         prop="name"
                         label="授课教师"
        >
        </el-table-column>
      </el-table>
      <el-pagination
              @current-change="handleCurrentChange1"
              layout="total, prev, pager, next"
              :total="total1"
              :page-size="7"
              :current-page.sync="pagenum1">
      </el-pagination>
      </div>
      <div style="height: 40%">
      <div style="text-align: center;
      display:table-cell;
      width: 300px;
      background-color: aqua;
      border-bottom:1px solid #c3deb7;
      vertical-align:middle;
      height: 20px;">
        <span>我的实验</span>
      </div>
      <el-table
              border stripe
              size="mini"
              :data="myTestShow"
              :row-style="{height: '25px'}"
              :cell-style="{padding: '0'}"
              style="width: 100%;align-items: center">
        <el-table-column show-overflow-tooltip
                align="center"
                prop="course"
                label="课程名称"
        >
        </el-table-column>
        <el-table-column show-overflow-tooltip
                align="center"
                prop="shiyan"
                label="实验名"
        >
        </el-table-column>
        <el-table-column show-overflow-tooltip
                align="center"
                prop="name"
                label="授课老师"
        >
        </el-table-column>
      </el-table>
        <el-pagination
                style="position: absolute;bottom: 0;margin-left: 20px"
                @current-change="handleCurrentChange2"
                layout="total, prev, pager, next"
                :total="total2"
                :page-size="5"
                :current-page.sync="pagenum2">
        </el-pagination>
      </div>
    </el-aside>
    <el-main v-if="showed">
      <h2>实 验 名 称 : {{chooseTest.course}}课程，{{chooseTest.shiyan}}实验</h2>
      <h2>实 验 老 师 : {{chooseTest.name}}</h2>
      <h2>关 键 字 : {{chooseTest.keyword}}</h2>
      <h2>实 验 步 骤 : 请查看讲义自行了解</h2>
<!--      -->
      <h2>下 载 讲 义 : <a
              style="cursor: pointer;"
              :href="'http://101.69.255.131:9000/upload/teacher/'+chooseTest.num+'/'+chooseTest.course+'/'+chooseTest.shiyan+'/'+chooseTest.jiangyi">
        {{chooseTest.jiangyi}}</a></h2>
      <h2>讲 义 预 览</h2>
      <div v-if="!showWhich" style="height:100%;width:100%;">
        <iframe
                style="height:100%;width:100%;"
                frameborder="0"
                id="myiframe"
                :src="url"
        ></iframe>
      </div>
      <div v-if="showWhich" style="height:100%;width:100%;">
        <img :src="url" style="width: 900px;">
      </div>
    </el-main>
    <el-main v-else style="overflow: hidden!important;">
      <div class="pic">
        <span style="position: relative;top:25%">左侧实验列表选择想查看的实验</span>
      </div>

    </el-main>
  </el-container>
</template>

<script>
  // import pdf from 'vue-pdf'
  export default {
    // components: {pdf},
    name: "SerchTest",
    data(){
      return {
        url:'',
        allTest:[],
        allTestShow:[],
        myTest: [],
        myTestShow:[],
        chooseTest:[],
        showed:false,
        total1:0,
        total2:0,
        pagenum1:0,
        pagenum2:0,
        jianyipath:"",
        showWhich:0,
      }
    },
    mounted() {
      // const oIframe = document.getElementById('myiframe');
      // const deviceWidth = document.documentElement.clientWidth;
      // const deviceHeight = document.documentElement.clientHeight;
      // oIframe.style.width = (Number(deviceWidth))+ 'px'; //数字是页面布局宽度差值
    },
    created() {
      this.getStudSelfClass()
      this.getAllCanPickTest()
      this.$store.commit('storeStuActivePath','/check')
    },
    methods:{
      getAllCanPickTest(){
        this.$http.post('/getallcanpicktest',{
          token : window.sessionStorage.getItem('token')}
        ).then(res => {
          // console.log(res.data)
          this.total1 =res.data.length
          this.allTest = res.data.sort((a,b)=>a['course'].localeCompare(b['course']))
          this.allTestShow = res.data.slice(0,8)
        })
      },
      getStudSelfClass(){
        this.$http.post('/getstuselfclass',{
          token : window.sessionStorage.getItem('token')
        }).then(res => {
          // console.log(res.data)
          this.total2 =res.data.length
          this.myTest = res.data.sort((a,b)=>a['course'].localeCompare(b['course']))
          this.myTestShow = res.data.slice(0,5)
        })
      },
      handleCurrentChange1(e){
        this.allTestShow = this.allTest.slice((e-1)*8,(e-1)*8+8)
      },
      handleCurrentChange2(e){
        this.myTestShow = this.myTest.slice((e-1)*5,(e-1)*5+5)
      },
      myTestInfo(e){
        let fin = false
        this.showed = true
        this.chooseTest = e
        if(e.jiangyi.indexOf('.pdf')!==-1){
          this.showWhich = 1
          fin = true
        }else{
          this.showWhich = 0
          fin = true
        }
        if(fin){
          this.$http.post('showTestJiangyi',e,{text:'获取讲义预览'}).then(res => {
            if(res.data === 'null'){
              this.url = ''
              this.$message.warning('该实验没有讲义')
            }else if(res.data === 0){
              this.url = ''
              this.$message.warning('该实验讲义不可预览请下载')
            }else this.url = "http://101.69.255.131:9000/upload/"+res.data;

          })
        }

      },
    }
  }
</script>

<style lang="less" scoped>
  .piccontainer{
    height: 100%;
  }
  .el-table{
    margin-top: 0;
  }
  .pic{
    background-image: url("../../assets/img/bb.png");
    background-size:100% 100%;
    height: 100%;
    width: 100%;
    font-size:25px;
    background-repeat: no-repeat;
    vertical-align:middle;
    text-align:center
  }

</style>