<template>
  <div class="video" id="video_one" style="width: 100%;height:100%"></div>
</template>
<script>
  export default {
    name: 'Rtmp',
    components: {},
    props: {
      sourceUrl: {
        type: String,
        default: ''
      },
    },
    data () {
      return {
        video: {
          one: {
            container: '#video_one', //容器的ID或className
            variable: 'player',//播放函数名称
            autoplay: true,
            live: true,
            video: 'http://192.168.1.16:9600/live/1.flv',//视频地址-rtmp的地址就可以
          },
        },
 
      }
    },
    computed: {},
    watch: {
      sourceUrl: {
        handler (val) {
          this.video.one.video = val;
          this.getOneVideo();
        }
      }
    },
    mounted () {
      this.getOneVideo();
 
    },
    created () {
    },
    methods: {
      getOneVideo () {
        let player = new ckplayer(this.video.one);
 
      },
    }
  }
</script>
 
<style lang="less" scoped>
  .ali-player{
    width: 100%;
    .main {
      box-sizing: border-box;
      color: #FFFFFF;
      .video-center {
        position: relative;
        .name{
          position: absolute;
          left: 50%;
          top: -20px;
          font-size: 18px;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
        }
        .tips{
          position: absolute;
          top: 50%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          z-index: 9999;
          opacity: 0.79;
        }
      }
    }
    #video {
      width: 100%;
      height: 500px !important;
      opacity: 0.79;
    }
  }
</style>