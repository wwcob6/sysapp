<template>


<div>
  <div>
    <input type="text" v-model="url" style="width:60%;height:30px"/>
	<button @click="play" style="width:60%;height:30px">播放</button>

	<video id="videoElement" controls autoplay muted width="1000px" height="600px">    
    </video>
  </div>
</div>

</template>

<script>
  import flvjs from 'flv.js'
export default {
  data () {
    return {
      url:"http://101.69.255.131:9600/live/11.flv",
	    flvPlayer:null
    }
  },
   mounted() {
      
    },
    methods:{
      play () {
        if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        this.flvPlayer = flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          hasAudio: true,
          // url: 'http://101.69.255.131:9600/123/01.flv'
          cors:true,
          url: this.url
        });
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
		    this.flvPlayer.play();
      }
      }
    }
}
</script>

<style lang="less" scoped>


</style>