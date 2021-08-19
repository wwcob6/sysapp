<template>
  <el-tooltip class="item" effect="dark" :content="content" placement="top">
    <el-button :type="type" :disabled="disabled" plain @click="clickDev"><img :src="imgSrc" alt=""></el-button>
  </el-tooltip>
</template>

<script>
  export default {
    name: "DevInfoChild",
    props:{
      dev:{
        type:Object
      }
    },
    data(){
      return {
        type:'',
        src:'',
        disabled:false,
        imgSrc:'',
        content:''
      }
    },
    created() {
      this.getType()
    },
    methods:{
      getType(){
        if(this.dev.is_online === '1'){
          if(this.dev.is_bind === '0'){
            this.type = 'primary'
            this.imgSrc = require('../../..//assets/img/online.jpg')
            this.content = '该设备可以使用'
          }else{
            this.type = 'warning'
            this.imgSrc = require('../../../assets/img/onwork.jpg')
            this.content = '该设备正在被操作'
          }
        }else{
          this.type = 'danger'
          this.disabled = true
          this.imgSrc = require('../../../assets/img/outline.jpg')
          this.content = '该设备不可以操作'
        }
      },
      clickDev(){
        if(this.dev.is_online === '1'&&this.dev.is_bind === '0'){
          this.$emit("changeDev",this.dev.dev_id);
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .el-button{
    padding: 10px!important;
  }
  .el-button img{
    opacity: 0.4;
    height: 50px;
    width: 50px;
  }
</style>