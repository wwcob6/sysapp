<template>
  <el-container class="piccontainer">
    <el-aside width="33%" style="border:1px solid #c3deb7;">
      <div style="height: 50%;background-color: #679aaf">
        <div style="text-align: center;
      display:table-cell;
      width:2%;
      border-bottom:1px solid #c3deb7;
      vertical-align:middle;
      height: 40px;">
          <span>已选的实验</span>
        </div>
        <el-table
                border stripe
                :row-style="{height: '20px'}"
                :cell-style="{padding: '0'}"
                :data="myTestShow"
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
                  label="老师"
          >
          </el-table-column>
        </el-table>
        <el-pagination
                style="position: absolute;top:47%;"
                @current-change="handleCurrentChange1"
                layout="total, prev, pager, next"
                :total="total1"
                :page-size="5"
                :current-page.sync="pagenum1">
        </el-pagination>
      </div>
      <div style="height: 50%;background-color: #e1e1e2">
        <div style="text-align: center;
      display:table-cell;
      width:2%;
      background-color: #e1e1e2;
      border-bottom:1px solid #c3deb7;
      vertical-align:middle;
      height: 40px;">
          <span>新增的实验</span>
        </div>
        <el-table
                border stripe
                :row-style="{height: '20px'}"
                :cell-style="{padding: '0'}"
                :data="addTestShow"
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
                  label="老师"
          >
          </el-table-column>
        </el-table>
            <el-pagination
                    style="position: absolute;bottom:0;"
                    small
                    @current-change="handleCurrentChange2"
                    layout="total, prev, pager, next"
                    :total="total2"
                    :page-size="5"
                    :current-page.sync="pagenum2">
            </el-pagination>
            <el-button type="primary"
                       size="mini"
                       style="position: absolute;bottom:0;right: 67%"
                       @click="determineTest">确定</el-button>
      </div>
    </el-aside>
    <el-main>
      <el-table :data="allTestShow" border stripe>
        <el-table-column show-overflow-tooltip align="center" label="课程" prop="course"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="实验名" prop="shiyan"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="实验关键字/备注" prop="keyword"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="授课老师" prop="name"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="操作" >
          <template slot-scope="scope">
            <el-button type="success"  icon="el-icon-check" circle size="mini" @click="addStuTest(scope.row)" class="box_icon"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"  @click="delOneStuTest(scope.row)"  class="box_icon" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              @current-change="handleCurrentChange3"
              layout="total, prev, pager, next"
              :total="total3"
              :page-size="8"
              :current-page.sync="pagenum3">
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "PickClass",
    data(){
      return {
        myTest:[],
        myTestShow:[],
        total1:0,
        pagenum1:1,
        addTest:[],
        addTestShow:[],
        total2:0,
        pagenum2:0,
        allTest:[],
        allTestShow:[],
        total3:0,
        pagenum3:0,
      }
    },
    computed:{

    },
    created() {
      this.getStudSelfClass()
      this.getAllCanPickTest()
    },
    methods:{
      getStudSelfClass(){
        this.$http.post('/getstuselfclass',{
            token : window.sessionStorage.getItem('token')}
        ).then(res => {
          this.total1 =res.data.length
          this.myTest = res.data.sort((a,b)=>a['course'].localeCompare(b['course']))
          this.myTestShow = res.data.slice(0,5)
        })
      },
      handleCurrentChange1(e){
        this.myTestShow = this.myTest.slice((e-1)*5,(e-1)*5+5)
      },
      getAllCanPickTest(){
        this.$http.post('/getallcanpicktest',{
            token : window.sessionStorage.getItem('token')}
        ).then(res => {
          // console.log(res)
          this.total3 =res.data.length
          this.allTest = res.data.sort((a,b)=>a['course'].localeCompare(b['course']))
          this.allTestShow = res.data.slice(0,8)
        })
      },
      handleCurrentChange3(e){
        this.allTestShow = this.allTest.slice((e-1)*8,(e-1)*8+8)
      },
      addStuTest(res){
        if(!this.addTest.includes(res)){
          // console.log(res)
          this.addTest.push(res)
          this.addTest = this.addTest.sort((a,b)=>a['course'].localeCompare(b['course']))
          this.total2 = this.addTest.length
          this.addTestShow = this.addTest.slice(0,5)
        }
        else{
          alert('该实验选过了！')
        }
      },
      handleCurrentChange2(e){
        this.addTestShow = this.addTest.slice((e-1)*5,(e-1)*5+5)
      },
      delOneStuTest(res){
        var i = this.addTest.indexOf(res)
        this.addTest.splice(i,1)
        this.addTestShow = this.addTest.slice(0,5)
      },
      determineTest(){
        this.$http.post('/studeterminetest',{
          token : window.sessionStorage.getItem('token'),
          courseinfo : this.addTest
        }).then(res => {
          console.log(res)
          this.getStudSelfClass()
          this.addTest = []
          this.addTestShow = []
        })
      }
    }
  }
</script>

<style lang="less" scoped>
 .piccontainer{
   height: 100%;
   background-color:#fff0f0;
 }
  .el-table{
    margin-top: 0;
  }
  .box_icon{
    width: 15px;
    height: 15px;
  }

</style>