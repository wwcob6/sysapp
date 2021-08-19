<template>

<!--    <Container></Container>-->
    <!-- <Screen/> -->
    <div class="myTest">
      <!-- <iframe 
                style="height:100%;width:100%;"
                frameborder="0"
                id="myiframe"
                src="https://192.168.1.167/wangToOne/"
        ></iframe> -->
        <!-- <RTCLogin/> -->
        <iframe src="http://localhost:8080/" frameborder="0" allow="microphone;camera;midi;encrypted-media;"></iframe>
    </div>
<!--    <span class="full_Screen" v-show="!screenShow" @click="fullScreen" id="full1"><a>全屏展示</a></span>-->
<!--    <span class="full_Screen" v-show="screenShow" @click="fullScreenOut" id="full2"><a>退出全屏</a></span>-->
<!--<div>-->
<!--&lt;!&ndash;    <img src="http://192.168.1.111:9999/" alt="">&ndash;&gt;-->
<!--    <video style="height: 1200px;width: 1200px;" src="http://192.168.1.111:9999/upload/2.mp4"></video>-->
<!--</div>-->
</template>
<script>

  import Container from "../components/Student/ShiyanDev/Container";
  import Screen from "../components/Test/Screen";
  import RTCLogin from "../components/Test/RTCLogin"
  export default {
    name: "test",
    components:{
      Container,
        Screen,
        RTCLogin
    },
    data() {
      return {
        screenShow: false,
        body: null
      }
    },
    watch: {
      screenShow(val) {
        this.$emit('change', val)
      }
    },
    mounted() {
        // var video=document.querySelector("#video");
        // //加载播放路径
        // video.src="http://192.168.1.111:9999/upload/2.mp4";
        // //事件API
        // //当浏览器加载媒体数据
        // video.onloadstart=function () {
        //     console.log("开始加载");
        // }
        // //开始加载数据
        // video.onloadeddata=function(){
        //     console.log("开始加载数据");
        // }
        // //视频因缓冲停止播放执行的事件
        // video.oncanplay=function () {
        //     console.log("当前视频正在缓冲");
        // }
        // //视频加载失败执行的一个脚本
        // video.onerror=function () {
        //     console.log("当前视频加载失败");
        // }
        // //开始播放的时候
        // video.onplay=function () {
        //     console.log("当前视频开始播放");
        // }
        // //暂停的时候产生的脚本
        // video.onpause=function () {
        //     console.log("当前视频暂停");
        // }
        // //当设置为静音的时候执行的脚本
        // video.onvolumechange=function () {
        //     console.log("当前视频设置为静音");
        // }
        // //正在播放执行事件
        // video.onplaying=function () {
        //     console.log("当前视频正在播放");
        // }
        // //当播放位置发生变化执行事件
        // //是一个不断被监听的事件
        // video.ontimeupdate=function () {
        //     console.log("当前视频播放位置发生变化");
        // }
      let self = this;
      this.$nextTick(function () {
        document.addEventListener('keyup', function (e) {
          //此处填写你的业务逻辑即可
          if (e.keyCode == 27) {
            console.log(1)
          }
        })
      })
      window.addEventListener('resize', this.controlFun)
    },
    created() {
      //全屏后其他元素会被覆盖 -- 故采用全屏整个body再将需要全屏的页面置顶
      this.body = document.body
      /*document.onkeydown = function(e) {
        console.log('===========', e)
      }*/
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.controlFun)
    },
    methods: {
      controlFun() {
        if (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
          this.screenShow = true
        } else {
          this.screenShow = false
        }
      },
      fullScreen() {
        document.getElementById('full1').classList.add('container_full_element')
        let rfs = this.body.requestFullScreen || this.body.webkitRequestFullScreen || this.body.mozRequestFullScreen || this.body.msRequestFullScreen,
          wscript
        if (typeof rfs != 'undefined' && rfs) {
          rfs.call(this.body)
          return
        }
        if (typeof window.ActiveXObject != 'undefined') {
          wscript = new ActiveXObject('WScript.Shell')
          if (wscript) {
            wscript.SendKeys('{F11}')
          }
        }
      },
      fullScreenOut() {
        document.getElementById('full1').classList.remove('container_full_element')
        let exitMethod = document.exitFullscreen || //W3C
          document.mozCancelFullScreen || //FireFox
          document.webkitExitFullscreen || //Chrome等
          document.webkitExitFullscreen //IE11
        if (exitMethod) {
          exitMethod.call(document)
        } else if (typeof window.ActiveXObject !== 'undefined') { //for Internet Explorer
          let wscript = new ActiveXObject('WScript.Shell')
          if (wscript !== null) {
            wscript.SendKeys('{F11}')
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
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
  .myTest{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  }
</style>