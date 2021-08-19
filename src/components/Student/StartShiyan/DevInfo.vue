<template>
  <div>
    <h2>请点击按钮连接试验箱
      <el-button @click="showLinkDevdialog = true">打开实验箱</el-button>
    </h2>
    <dev-info-child v-bind="$attrs" v-on="$listeners" v-for="item in info" :dev="item"></dev-info-child>
    <el-dialog
            class="own"
            fullscreen
            :visible.sync="showLinkDevdialog">
      <container></container>
      <span style="position:absolute;right: 0;bottom: 0">
    <el-button type="primary" @click="showLinkDevdialog = false">关闭本页</el-button>
  </span>
    </el-dialog>
<!--    <el-button v-for="item in info" type="primary" plain><img src="../../../assets/img/online.jpg" alt="">{{item}}</el-button>-->
  </div>
</template>

<script>
  import DevInfoChild from "./DevInfoChild";
  import Container from "../ShiyanDev/Container";
  export default {
    name: "DevInfo",
    data(){
      return {
        showLinkDevdialog:false
      }
    },
    components:{
      DevInfoChild,Container
    },
    props:{
      info:{
        type:Array
      }
    },
    methods:{
      linkDev(){

      }
    }
  }
</script>

<style lang="less" scoped>
.own{
  /*height: 632px;*/
}
</style>