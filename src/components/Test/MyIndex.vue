<template>
  <div>
    <div>
      <div>
        <button id="connserver" :disabled="isLeaved" @click="connSignalServer">
          连接
        </button>
        <button id="leave" :disabled="!isLeaved" @click="leave">离开</button>
      </div>
      <div>
        <label>BandWidth：</label>
        <select @change="changeBandWith" :disabled="changeBw">
          <option value="unlimited">unlimited</option>
          <option value="2000">2000</option>
          <option value="1000">1000</option>
          <option value="500">500</option>
          Kbps
        </select>
        <input id="shareDesk" type="checkbox" v-model="isShareDesk" /><label
          for="shareDesk"
          >分享屏幕</label
        >
				<br/>
				<span>先点击离开在重新选择房间号</span><br/>
			<input type="text" :disabled="isLeaved" v-model="roomid" style="max-width:130px;line-height:30px;font-size:20px; text-align:center;">
      </div>

      <div id="preview">
        <div>
          <h2>Remote:</h2>
          <video
            id="remotevideo"
            autoplay
            playsinline
          ></video>
          <h2 style="display: none">Answer SDP:</h2>
          <textarea
            id="answer"
            style="display: none"
            :value="answer"
          ></textarea>
        </div>
        <div>
          <h2>Local:</h2>
          <video
            id="localvideo"
            :srcObject="remoteStream"
            autoplay
            playsinline
            muted
          ></video>
          <h2 style="display: none">Offer SDP:</h2>
          <textarea id="offer" style="display: none" :value="offer"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

	<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
	
<script>

export default {
  name: "MyIndex",
  data() {
    return {
      changeBw:true,
			remoteStream:null,
			localStream:null,
      offer: "",
      answer: "",
      isLeaved: false,
      isShareDesk: false,
      pcConfig: {
        iceServers: [
          {
            urls: "turn:101.69.255.131:3478",
            credential: "cyf123",
            username: "cyf",
          },
        ],
      },
      localVideo: null,
      remoteVideo: null,
      pc: null,
      a: null,
      roomid: null,
      socket: null,
      state: "init",
      offerdesc: null,
    };
	},
	// mounted(){
	// 	this.socket = this.$socket
	// },
	created(){
		this.roomid = this.$route.params.roomId
		if(!this.roomid){
			alert('未输入房间号')
			this.$router.push('/')
		}
	},
  methods: {
    lol() {
      console.log(this.shareDesk);
      console.log("xx");
    },
    checkchinese() {
      var reg = /[^\x00-\x80]/;
      var x = document.getElementById("roomid").value;
      console.log(x);
      if (reg.test(x)) {
        alert("房间号不可以为汉字!");
        document.getElementById("roomid").focus();
        document.getElementById("roomid").value = "";
        return false;
      }
    },
    //如果返回的是false说明当前操作系统是手机端，如果返回的是true则说明当前的操作系统是电脑端
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod",
      ];
      var flag = true;

      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },

    //如果返回true 则说明是Android  false是ios
    is_android() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        //这个是安卓操作系统
        return true;
      }

      if (isIOS) {
        //这个是ios操作系统
        return false;
      }
    },
    sendMessage(roomid, data) {
      console.log("send message to other end", roomid, data);
      if (!this.socket) {
        console.log("socket is null");
      }
      this.socket.emit("message", roomid, data);
    },
    conn() {
			this.socket = this.$socketIO(this.socketApi)
			
			// console.log(this.socket);
      this.socket.on("joined", (roomid, id) => {
        console.log("receive joined message!", roomid, id);
        this.state = "joined";

        //如果是多人的话，第一个人不该在这里创建peerConnection
        //都等到收到一个otherjoin时再创建
        //所以，在这个消息里应该带当前房间的用户数
        //
        //create conn and bind media track
        this.createPeerConnection();
        this.bindTracks();
        this.isLeaved = true;
        // btnConn.disabled = true;
        // btnLeave.disabled = false;
        console.log("receive joined message, state=", this.state);
      });

      this.socket.on("otherjoin", (roomid) => {
        console.log("receive joined message:", roomid, this.state);

        //如果是多人的话，每上来一个人都要创建一个新的 peerConnection
        //
        if (this.state === "joined_unbind") {
          this.createPeerConnection();
          this.bindTracks();
        }

        this.state = "joined_conn";
        this.call();

        console.log("receive other_join message, state=", this.state);
      });

      this.socket.on("full", (roomid, id) => {
        console.log("receive full message", roomid, id);
        this.hangup();
        this.closeLocalMedia();
        this.state = "leaved";
        console.log("receive full message, state=", this.state);
        alert("the room is full!");
      });

      this.socket.on("leaved", (roomid, id) => {
        console.log("receive leaved message", roomid, id);
        this.state = "leaved";
        this.socket.disconnect();
        console.log("receive leaved message, state=", this.state);
        this.isLeaved = false;
      });

      this.socket.on("bye", (roomid, id) => {
        console.log("receive bye message", roomid, id);
        //state = 'created';
        //当是多人通话时，应该带上当前房间的用户数
        //如果当前房间用户不小于 2, 则不用修改状态
        //并且，关闭的应该是对应用户的peerconnection
        //在客户端应该维护一张peerconnection表，它是
        //一个key:value的格式，key=userid, value=peerconnection
        this.state = "joined_unbind";
        this.hangup();
        this.offer= "";
        this.answer = "";
        console.log("receive bye message, state=", this.state);
      });

      this.socket.on("disconnect", (socket) => {
        console.log("receive disconnect message!", this.roomid);
        if (!(this.state === "leaved")) {
          this.hangup();
          this.closeLocalMedia();
        }
        this.state = "leaved";
      });

      this.socket.on("message", (roomid, data) => {
        console.log("receive message!", roomid, data);

        if (data === null || data === undefined) {
          console.error("the message is invalid!");
          return;
        }

        if (data.hasOwnProperty("type") && data.type === "offer") {
          this.offer = data.sdp;

          this.pc.setRemoteDescription(new RTCSessionDescription(data));

          //create answer
          this.pc.createAnswer().then(this.getAnswer).catch(this.handleAnswerError);
        } else if (data.hasOwnProperty("type") && data.type == "answer") {
          this.changeBw = false
          this.answer = data.sdp;
          this.pc.setRemoteDescription(new RTCSessionDescription(data));
        } else if (data.hasOwnProperty("type") && data.type === "candidate") {
          var candidate = new RTCIceCandidate({
            sdpMLineIndex: data.label,
            candidate: data.candidate,
          });
          this.pc.addIceCandidate(candidate);
        } else {
          console.log("the message is invalid!", data);
        }
      });

      // roomid = getQueryVariable('room');
      // this.roomid = a.slice(7);
      this.socket.emit("join", this.roomid);

      return true;
    },
    connSignalServer() {
      //开启本地视频
      this.start();

      return true;
    },
    getMediaStream(stream) {
      if (this.localStream) {
        stream.getAudioTracks().forEach((track) => {
          this.localStream.addTrack(track);
          stream.removeTrack(track);
        });
      } else {
				this.localVideo = document.getElementById('localvideo')
				this.localVideo.srcObject = stream
				this.localStream = stream
      }

      // localVideo.srcObject = localStream;

      //这个函数的位置特别重要，
      //一定要放到getMediaStream之后再调用
      //否则就会出现绑定失败的情况
      //
      //setup connection
      this.conn();

      //btnStart.disabled = true;
      //btnCall.disabled = true;
      //btnHangup.disabled = true;
    },
    getDeskStream(stream) {
			this.localVideo = document.getElementById('localvideo')
				this.localVideo.srcObject = stream
				this.localStream = stream
      //自己添加
      this.getMediaStream(stream);
    },
    handleError(err) {
      console.error("Failed to get Media Stream!", err);
    },
    shareDesk() {
      if (this.IsPC()) {
        console.log("ispc");
        navigator.mediaDevices
          .getDisplayMedia({ video: true })
          .then(this.getDeskStream)
          .catch(this.handleError);
        return true;
      }

      return false;
    },
    start() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("the getUserMedia is not supported!");
        return;
      } else {
        var constraints;

        if (this.isShareDesk && this.shareDesk()) {
          constraints = {
            video: false,
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
          };
        } else {
          constraints = {
            video: true,
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
          };
          navigator.mediaDevices
            .getUserMedia(constraints)
            .then(this.getMediaStream)
            .catch(this.handleError);
        }
      }
    },
    getRemoteStream(e) {
			// this.remoteStream = e.streams[0];
			this.remoteVideo = document.getElementById('remotevideo')
				this.remoteVideo.srcObject = e.streams[0]
      // remoteVideo.srcObject = e.streams[0];
    },
    handleOfferError(err) {
      console.error("Failed to create offer:", err);
    },
    handleAnswerError(err) {
      console.error("Failed to create answer:", err);
    },
    getAnswer(desc) {
      this.pc.setLocalDescription(desc);
      this.answer = desc.sdp;
      this.changeBw = false
      //send answer sdp
      this.sendMessage(this.roomid, desc);
    },
    getOffer(desc) {
      this.pc.setLocalDescription(desc);
      this.offer = desc.sdp;
      this.offerdesc = desc;

      //send offer sdp
      this.sendMessage(this.roomid, this.offerdesc);
    },
    createPeerConnection() {
      //如果是多人的话，在这里要创建一个新的连接.
      //新创建好的要放到一个map表中。
      //key=userid, value=peerconnection
      console.log("create RTCPeerConnection!");
      if (!this.pc) {
        this.pc = new RTCPeerConnection(this.pcConfig);

        this.pc.onicecandidate = (e) => {
					console.log(e);
          if (e.candidate) {
            console.log("find an new candidate,", e.candidate);
            this.sendMessage(this.roomid, {
              type: "candidate",
              label: event.candidate.sdpMLineIndex,
              id: event.candidate.sdpMid,
              candidate: event.candidate.candidate,
            });
          } else {
            console.log("this is the end candidate");
          }
        };

        this.pc.ontrack = this.getRemoteStream;
      } else {
        console.warning("the pc have be created!");
      }

      return;
    },

    //绑定永远与 peerconnection在一起，
    //所以没必要再单独做成一个函数

    bindTracks() {
      console.log("bind tracks into RTCPeerConnection!");

      if (this.pc === null || this.pc === undefined) {
        console.error("pc is null or undefined!");
        return;
      }

      if (this.localStream === null || this.localStream === undefined) {
        console.error("localstream is null or undefined!");
        return;
      }

      //add all track into peer connection
      this.localStream.getTracks().forEach((track) => {
        this.pc.addTrack(track, this.localStream);
      });
    },
    call() {
      if (this.state === "joined_conn") {
        var offerOptions = {
          offerToRecieveAudio: 1,
          offerToRecieveVideo: 1,
        };

        this.pc
          .createOffer(offerOptions)
          .then(this.getOffer)
          .catch(this.handleOfferError);
      }
    },
    hangup() {
      if (this.pc) {
        this.offerdesc = null;

        this.pc.close();
        this.pc = null;
      }
    },
    closeLocalMedia() {
      if (this.localStream && this.localStream.getTracks()) {
        this.localStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      this.localStream = null;
    },
    leave() {
      if (this.socket) {
        this.socket.emit("leave", this.roomid); //notify server
      }

      this.hangup();
      this.closeLocalMedia();
      this.offer = "";
      this.answer = "";
      this.isLeaved = false;
    },
    changeBandWith(e){
      var senders = this.pc.getSenders();
      var vsender = null
      var bw = e.target.value;
      senders.forEach( sender => {
        if(sender && sender.track.kind === 'video'){
         vsender = sender;
        }
      })
      var parameters = vsender.getParameters();
      if(!parameters.encodings){
        console.log(parameters.encodings);
        return;
      }
      if(bw === 'unlimited'){
        return ;
      } 
      parameters.encodings[0].maxBitrate = bw * 1000;
      vsender.setParameters(parameters).then(()=>{
        console.log('success to set parameters!');
      }).catch(err=>{
        console.log(err);
      })
  }
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@import '../../assets/css/main.css';
</style>
