<template>
  <div class="container">
    <section class="item">
      <span class="type-name">文件名称:</span>
      <input type="text" v-model.trim="fileName"/>
      <span>.mp4</span>
    </section>
    <section class="item">
      <span class="type-name">录制时长</span>
      <span>{{timeLong}}s</span>
    </section>
    <section>
      <button class="media-btn" @click="clicks()" title="点击开始录制">{{txt}}</button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeout: 0,
      recordedBlobs: [],
      fileName: "",
      txt: "开始录制",
      status: false,
      stream: null,
      options: {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 4500000,
        mimeType: "video/webm",
      },
      startTime: 0,
      timeLong: 0,
      timeLongs: null,
      endTime: 0,
    };
  },
  watch: {
    status(a) {
      if (a) {
        this.txt = "停止录制";
      } else {
        this.txt = "开始录制";
      }
    },
  },
  methods: {
    clicks() {
      if (this.status) {
        this.stopReset();
        this.status = false;
        clearInterval(this.timesLongs);
      } else {
        this.startScreen();
      }
    },
    cauTime() {
      this.timeLongs = setInterval(() => {
        this.timeLong = (new Date().getTime() - this.startTime) / 1000;
      }, 200);
    },
    stopReset() {
      this.stream.getTracks().forEach((track) => track.stop());
      this.recordedBlobs = [];
    },
    hasRTCPeerConnection() {
      window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.msRTCPeerConnection;
      return !!window.RTCPeerConnection;
    },
    startPeerConnection(stream) {
      //这里使用了几个公共的stun协议服务器
      var config = {
        'iceServers': [{ 'url': 'stun:stun.services.mozilla.com' }, { 'url': 'stun:stunserver.org' }, { 'url': 'stun:stun.l.google.com:19302' }]
      };
      const yourConnection = new RTCPeerConnection(config);
      const theirConnection = new RTCPeerConnection(config);
      yourConnection.onicecandidate = function(e) {
        if (e.candidate) {
          theirConnection.addIceCandidate(new RTCIceCandidate(e.candidate));
        }
      }
      theirConnection.onicecandidate = function(e) {
        if (e.candidate) {
          yourConnection.addIceCandidate(new RTCIceCandidate(e.candidate));
        }
      }
    },
    startScreen() {
    //注意,加上 audio: true 之后底部可以拖动的停止就失效了,正在fixing
      navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(
        (stream) => {
          console.log( stream)
          if (this.hasRTCPeerConnection()) {
            // 稍后我们实现 startPeerConnection
            this.startPeerConnection(stream);
          } else {
            alert("没有RTCPeerConnection API");
          }
          this.status = !this.status;
          console.log("开始录制");
          this.startTime = new Date().getTime();
          this.cauTime();

          this.stream = stream;
          const mediaRecorder = new MediaRecorder(stream, this.options);
          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              this.status = false;
              clearInterval(this.timeLongs);
              console.log(stream)
              console.log(
                "结束录制,录制时长:" +
                  this.timeLong+
                  "s"
              );
              this.recordedBlobs.push(event.data);
              this.download();
              this.stopReset();
            }
          };
          mediaRecorder.start();
        },
        (error) => console.log(error)
      );
    },
    download() {
      const blob = new Blob(this.recordedBlobs, { type: "video/mp4" });
      var fd = new window.FormData();
      fd.append('video', blob);
      const config = {
        headers: {'Content-Type': 'multipart/form-data'},
        params: {
          devid : this.devvalue
        }
      }
      this.$http.post('video',fd,config).then(res => {
        console.log(res)
      })
      // const url = URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // document.body.appendChild(a);
      // a.style.display = "none";
      // a.href = url;
      // if (this.fileName) {
      //   a.download = this.fileName + ".mp4";
      // } else {
      //   a.download = new Date() + ".mp4";
      // }
      // a.click();
      // window.URL.revokeObjectURL(url);
    },
  },
};
</script>

<style scoped>
.container {
  width: 450px;
  height: 250px;
  border: 1px solid;
}
.item {
  display: flex;
  align-items: center;
  margin: 25px 0;
  font-size: 20px;
}
.item .unit {
  margin-left: 10px;
}
.item input {
  height: 30px;
  padding: 1px;
  padding-left: 5px;
}
.item input[type="text"] {
  width: 180px;
}
.item input[type="number"] {
  width: 80px;
}
.type-name {
  width: 30%;
}
.media-btn {
  background: rgb(146, 224, 214);
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 800;
  outline: none;
}
.media-btn:hover {
  background: rgb(155, 235, 224);
}

.tip {
  background-color: rgb(248, 243, 172);
  display: inline-block;
  padding: 19px;
  font-size: 25px;
  font-weight: 900;
  border-radius: 3px;
  margin-top: 19px;
}
</style>