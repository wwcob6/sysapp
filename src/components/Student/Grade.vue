<template>
  <div>
    <el-table
            :data="myResult"
            stripe
            border
            style="width: 100%">
      <el-table-column
              show-overflow-tooltip align="center"
              prop="course"
              label="课程"
              >
      </el-table-column>
      <el-table-column
              show-overflow-tooltip align="center"
              prop="shiyan"
              label="实验"
              >
      </el-table-column>
      <el-table-column
              show-overflow-tooltip align="center"
              prop="result"
              label="成绩"
              >
      </el-table-column>
      <el-table-column
              show-overflow-tooltip align="center"
              prop="finishtime"
              label="完成时间"
              >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "Grede",
    data(){
      return {
        myResult:[]
      }
    },
    mounted() {
      this.myTestResult()
    },
    created() {
    },
    methods:{
      myTestResult() {
        this.$http.post('getStuTestResult',{token:window.sessionStorage.getItem('token')}).then(res => {
          this.myResult = res.data
          console.log(res.data)
        })
      }
  }
  }
</script>

<style scoped>

</style>