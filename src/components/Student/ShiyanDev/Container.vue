<template>
  <div id="diagramContainer">
<!--    板子-->
    <div  style="height: 512px;width: 726px;background-color: #296953;min-width: 726px;float:left;">
      <!--    1液晶屏和按钮位置-->
      <div style="height: 512px;width: 334px;float:left;">
        <!--      //液晶屏-->
        <div style="height: 50%;width: 100%;">
          <img style="width: 100%;height: 100%" src="../../../assets/img/dev/yejingping1.png" alt="">
        </div>
        <!--      //按钮-->
        <div id="buttons" style="width: 100%;height: 50%">
          <div style="height: 256px;width: 256px;float:left;">
            <el-button class="mybutton" style="
          width: 64px!important;
          height: 64px!important;" plain @click="clickButton(1)">
              <img  style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
        width: 64px!important;
        height: 64px!important;" plain   @click="clickButton(2)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
              width: 64px!important;
              height: 64px!important;" plain   @click="clickButton(3)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
              width: 64px!important;
              height: 64px!important;" plain   @click="clickButton(4)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
              width: 64px!important;
              height: 64px!important;" plain   @click="clickButton(5)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
              width: 64px!important;
              height: 64px!important;" plain  @click="clickButton(6)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
              width: 64px!important;
              height: 64px!important;" plain @click="clickButton(7)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
              width: 64px!important;
              height: 64px!important;" plain @click="clickButton(8)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
              width: 64px!important;
              height: 64px!important;" plain @click="clickButton(9)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
              width: 64px!important;
              height: 64px!important;" plain @click="clickButton(10)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
              width: 64px!important;
              height: 64px!important;" plain @click="clickButton(11)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
              width: 64px!important;
              height: 64px!important;" plain @click="clickButton(12)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
              width: 64px!important;
              height: 64px!important;" plain @click="clickButton(13)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
              width: 64px!important;
              height: 64px!important;" plain @click="clickButton(14)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
              width: 64px!important;
              height: 64px!important;" plain @click="clickButton(15)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
            <el-button class="mybutton" style="
              width: 64px!important;
              height: 64px!important;" plain @click="clickButton(16)">
              <img style="width: 100%;height: 100%;" src="../../../assets/img/dev/button.png" alt="">
            </el-button>
          </div>
          <div style="height: 100%;width: 77px;float:left;">
            <img style="height: 100%" src="../../../assets/img/dev/none.png" alt="">
          </div>
        </div>

      </div>
      <!--    2芯片组-->
      <div style="height: 512px;width: 319px;float:left;">
        <!--      //芯片-->
        <div style="height: 85%;width: 100%">
          <img style="width: 100%;height: 100%" src="../../../assets/img/dev/xinpian.png" alt="">
        </div>
        <!--      //一些接口-->
        <div style="height: 15%;width: 100%;float: left">
          <div style="height: 100%;width: 66px;float:left;">
            <img  style="width: 100%;height: 100%" src="../../../assets/img/dev/downbutton/downjiekou1.png" alt="">
          </div>
          <div style="height: 100%;width: 103px;float:left;">
            <div style="height: 100%;width:47px;float:left;">
              <el-button class="mybutton"  style="height: 30px;width: 47px; float:left;" @click="clickDev('blueTeeth')">
                <img id="blueteech" style="width: 100%;height: 100%;float:left;" src="../../../assets/img/dev/downbutton/downjiekou2_1_1.png" alt="">
              </el-button>
              <el-button class="mybutton" style="height: 23px;width: 47px;float:left;" @click="clickDev('blueTeeth2')">
                <img id="blueteechA" style="width: 100%;height: 100%;float:left;;" src="../../../assets/img/dev/downbutton/downjiekou2_1_2.png" alt="">
              </el-button>
              <el-button class="mybutton" style="height: 23px;width: 47px;float:left;" @click="clickDev('超声波')">
                <img id="chaoshengbo" style="width: 100%;height: 100%;float:left;;" src="../../../assets/img/dev/downbutton/downjiekou2_1_3.png" alt="">
              </el-button>
            </div>
            <div style="height: 100%;width:56px;float:left;background-color: red">
              <el-button class="mybutton" style="height: 44px;width: 56px; float:left;" @click="clickDev('温湿度')">
                <img id="wenshidu" style="width: 100%;height: 100%;float:left;" src="../../../assets/img/dev/downbutton/downjiekou2_2_1.png" alt="">
              </el-button>
              <el-button class="mybutton" style="height: calc(100% - 44px);width: 56px; float:left;" @click="clickDev('加速度')">
                <img id="jiasudu" style="width: 100%;height: 100%;float:left;" src="../../../assets/img/dev/downbutton/downjiekou2_2_2.png" alt="">
              </el-button>
            </div>
            <!--          <div style="height: calc(100% - 30px);width: 47px">-->
            <!--            <img style="width: 100%;height: 100%" src="../../../assets/img/dev/downbutton/downjiekou2_1_2.png" alt="">-->
            <!--          </div>-->
            <!--          <img style="width: 100%;height: 100%" src="../../../assets/img/dev/downbutton/downjiekou2.png" alt="">-->
          </div>
          <div style="height: 100%;width: 150px;float:left;">
            <img style="width: 100%;height: 100%" src="../../../assets/img/dev/downbutton/downjiekou3.png" alt="">
          </div>
        </div>
      </div>
      <!--   3 侧边栏-->
      <div style="height: 512px;width: 10%;float:left;">
        <el-button class="mybutton" style="height: 75px;width: 100%; float:left;" @click="clickDev('ZigB')">
          <img id="zigb" style="width: 100%;height: 100%;float:left;" src="../../../assets/img/dev/asidebutton/zigb-1.png" alt="">
        </el-button>
        <el-button class="mybutton" style="height: 42px;width: 100%; float:left;" @click="clickDev('电源')">
          <img id="power" style="width: 100%;height: 100%;float:left;" src="../../../assets/img/dev/asidebutton/power-1.png" alt="">
        </el-button>
        <el-button class="mybutton" style="height: 40px;width: 100%; float:left;" @click="clickDev('开关机',true)">
          <img  style="width: 100%;height: 100%;float:left;" src="../../../assets/img/dev/asidebutton/open-1.png" alt="">
        </el-button>
        <el-button class="mybutton" style="height: 39px;width: 100%; float:left;" @click="clickDev('USB端口')">
          <img id="usb" style="width: 100%;height: 100%;float:left;" src="../../../assets/img/dev/asidebutton/usb-1.png" alt="">
        </el-button>
        <el-button class="mybutton" style="height: 112px;width: 100%; float:left;" @click="clickDev('Com端口')">
          <img id="com" style="width: 100%;height: 100%;float:left;" src="../../../assets/img/dev/asidebutton/com-1.png" alt="">
        </el-button>
        <el-button class="mybutton" style="height: 46px;width: 100%; float:left;" @click="clickDev('网口')">
          <img id="net" style="width: 100%;height: 100%;float:left;" src="../../../assets/img/dev/asidebutton/net-1.png" alt="">
        </el-button>
        <el-button class="mybutton" style="height: 45px;width: 100%; float:left;" @click="clickDev('sd卡槽')">
          <img id="sd" style="width: 100%;height: 100%;float:left;" src="../../../assets/img/dev/asidebutton/sd-1.png" alt="">
        </el-button>
        <el-button class="mybutton" style="height: 40px;width: 100%; float:left;" >
          <img id="1" style="width: 100%;height: 100%;float:left;" src="../../../assets/img/dev/asidebutton/1-1.png" alt="">
        </el-button>
        <el-button class="mybutton" style="height: 73px;width: 100%; float:left;" >
          <img id="2" style="width: 100%;height: 100%;float:left;" src="../../../assets/img/dev/asidebutton/2-1.png" alt="">
        </el-button>
      </div>
    </div>
<!--    元器件-->
    <div style="height: 512px;width: 200px;float:left;margin-left: 20px">
      <img @click="clickDev('zigB')" id="zigb1" style="height: 100px;width: 100px;margin:0 50px" src="../../../assets/img/dev/yuanjian/zigb.jpg" alt="">
      <img @click="clickDev('电源线')" id="power1" style="height: 100px;width: 100px;margin:0 50px" src="../../../assets/img/dev/yuanjian/power.jpg" alt="">
      <img @click="clickDev('usb-u盘')" id="usb1" style="height: 100px;width: 100px;margin:0 50px" src="../../../assets/img/dev/yuanjian/usb.jpg" alt="">
      <img @click="clickDev('COM端口线')" id="com1" style="height: 100px;width: 100px;margin:0 50px" src="../../../assets/img/dev/yuanjian/com.jpg" alt="">
      <img @click="clickDev('网线')" id="net1" style="height: 100px;width: 100px;margin:0 50px" src="../../../assets/img/dev/yuanjian/net.jpg" alt="">
    </div>
    <div style="height: 512px;width: 300px;float: left" >
      <h2>实验须知</h2>
      <h3>注意：连接试验箱只有第一次打开有效，后期请不要拖动线段！否则将出现显示错误</h3>
      <h3>注意：如果出现连线点位置不准确，请按F11进入全屏模式</h3>
      <h3>注意事项</h3>
      <div>
      <span>（1）连线期间不要刷新页面，否则将不被保存。</span><br/>
      <span>（2）每次实验都需要连接:</span><br/>
      <span>  1.电源选 2.COM端口线 3.网线，并启动开关。</span><br/>
      <span>（3）如果对元器件或设备不熟悉，可以点击图片中器材位置，会有部分提示。</span><br/>
      <span>（4）连接可点击线段删除。</span><br/>
      <span>（5）连接完成后请点击“检查连线”按钮确认是否连接正确。</span><br/>
      <span>（6）最后点击“确定连线”按钮保存连线。</span><br/>
      <span>（7）右下角确定建或者右上角X退出该页面。</span>
      </div>
      <el-button  style="margin: 20px 10px!important;" size="medium" round type="primary" @click="checkConnect">检查连线</el-button>
      <el-button  style="margin: 20px 10px!important;" size="medium" round type="danger" @click="clearAll">删除全部</el-button>
      <el-button  style="margin:0 10px!important;" round type="success" size="medium" @click="queding">确定连线</el-button>
    </div>
    <div style="height: 130px;width: 726px;clear: both;margin-left: 200px">
      <img @click="clickDev('blueTooth')" id="blueteech1" style="height: 100px;width: 100px;margin:10px 20px" src="../../../assets/img/dev/yuanjian/blueteech.jpg" alt="">
      <img @click="clickDev('温湿度计')" id="wenshidu1" style="height: 100px;width: 100px;margin:10px 20px" src="../../../assets/img/dev/yuanjian/wenshidu.jpg" alt="">
      <img @click="clickDev('加速度计')" id="jiasudu1" style="height: 100px;width: 100px;margin:10px 20px" src="../../../assets/img/dev/yuanjian/jiasudu.jpg" alt="">
      <img @click="clickDev('超声波测量')" id="chaoshengbo1" style="height: 100px;width: 100px;margin:10px 20px" src="../../../assets/img/dev/yuanjian/chaoshengbo.jpg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "Container",
    props:{
      isButton:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        jsPlumb:'',
        //连线的元器件id
        list:[],
        opened:false,
        checked:false,
        //连线数组
        connectList:[],
        //vuex获取信息
        getConnect:[]
      }},
    created() {
      console.log(this.isButton)
      this.jsPlumb = this.$jsPlumb.getInstance({
        PaintStyle: {stroke: '#56A7F9', strokeWidth: 2},  //连接线的默认样式
        HoverPaintStyle :{stroke: "#13E0F9", strokeWidth: 2},//鼠标滑过连线样式
        Endpoint: ["Dot", {radius: 20}], //连线终端点
        EndpointStyle: {fill: "#fff",outlineWidth:2,outlineStroke: '#56A7F9', radius:10}, //这个是控制连线终端那个小点的样式
        EndpointHoverStyle: {fill: "#fff",outlineStroke: '#13E0F9'}, //这个是控制鼠标滑过连线终端那个小点的样式
        Connector: ["Bezier"],//连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight]
        ConnectionOverlays: [
          ["Arrow", {location: 1,width: 11,length: 11,foldback:0.618}],//连线设置箭头
          ["Label", { //连线上设置label
            location: 0.1,
            label: "删除", //label显示文字
            id: "label",
            cssClass: "aLabel",
          }
          ]
        ],

      })
      this.jsPlumb.setContainer('diagramContainer')

    },
    mounted() {
      var common = {
        maxConnections: -1,
        isSource: true,
        isTarget: true,
        // connector: ['Straight']
      }
      if(!this.isButton){
        this.jsPlumb.addEndpoint('zigb1', {
          anchors: ['Left']
        }, common)
        this.jsPlumb.addEndpoint('zigb', {
          anchors: ['Right']
        }, common)
        this.jsPlumb.addEndpoint('power1', {
          anchors: ['Left']
        }, common)
        this.jsPlumb.addEndpoint('power', {
          anchors: ['Right']
        }, common)
        this.jsPlumb.addEndpoint('usb1', {
          anchors: ['Left']
        }, common)
        this.jsPlumb.addEndpoint('usb', {
          anchors: ['Right']
        }, common)
        this.jsPlumb.addEndpoint('com1', {
          anchors: ['Left']
        }, common)
        this.jsPlumb.addEndpoint('com', {
          anchors: ['Right']
        }, common)
        this.jsPlumb.addEndpoint('net1', {
          anchors: ['Left']
        }, common)
        this.jsPlumb.addEndpoint('net', {
          anchors: ['Right']
        }, common)
        this.jsPlumb.addEndpoint('blueteech1', {
          anchors: ['Left']
        }, common)
        this.jsPlumb.addEndpoint('blueteech', {
          anchors: ['Right']
        }, common)
        this.jsPlumb.addEndpoint('wenshidu1', {
          anchors: ['Left']
        }, common)
        this.jsPlumb.addEndpoint('wenshidu', {
          anchors: ['Right']
        }, common)
        this.jsPlumb.addEndpoint('chaoshengbo1', {
          anchors: ['Left']
        }, common)
        this.jsPlumb.addEndpoint('chaoshengbo', {
          anchors: ['Right']
        }, common)
        this.jsPlumb.addEndpoint('jiasudu1', {
          anchors: ['Left']
        }, common)
        this.jsPlumb.addEndpoint('jiasudu', {
          anchors: ['Right']
        }, common)
      }
      if(this.isButton){
        this.getConnect=this.$store.getters.getConnectInfo
        // console.log(this.getConnect)
        for (let m = 0; m < this.getConnect.length; m++) {
          this.jsPlumb.connect({
            source: this.getConnect[m].sourceId,
            target: this.getConnect[m].targetId,
          })
        }
      }else{
        this.jsPlumb.bind('click', (common,e)=>{
            this.$confirm('确定删除所点击的链接吗？', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success',
              callback: action => {
                if (action === 'confirm') {
                  // console.log(this.jsPlumb)
                  this.jsPlumb.deleteConnection(common);
                }
                else {

                }
              }
            })
            // if (this.$confirm('确定删除所点击的链接吗？')) {
            //   this.deleteConnection(common);
            // }
          }
        //   // this.$message.success('ok')
        //   console.log(e)
          // if (this.$confirm('确定删除所点击的链接吗？')) {
          //   this.deleteConnection(common);
          // }
        )
      }
      // this.jsPlumb.bind('beforeDrop', function (conn) {
      //   let co = {sourceId:conn.sourceId,targetId:conn.targetId}
      //   if (this.getConnect.indexOf(co)===-1) {
      //     this.$message.warning('该页面不需要连线')
      //     return false
      //   } else {
      //     return true
      //   }
      // })
    },
    methods:{
      async checkConnect(){
        if(this.isButton){
          this.$message.warning('当前页面不允许修改，将不被保存')
        }else{
          const result = this.jsPlumb.getAllConnections()
          // console.log(result[0].sourceId)
          for (let i = 0; i < result.length; i++) {
            let source = result[i].sourceId.split("1").join("");
            let target = result[i].targetId.split("1").join("");
            // if()
            if(source === target){
              this.connectList.push({'sourceId':result[i].sourceId,targetId:result[i].targetId})
            }else{
              await this.$message.error('连线错误,1秒后删除错误连线')
              setTimeout(()=>{
                this.jsPlumb.deleteConnection(result[i])
              },1000)
            }
            if(i == result.length-1){
              await this.$message.success('检查完成')
              this.checked = true
            }
          }

        }

      },
      async queding(){
        if(this.isButton){
          this.$message.warning('修改无效')
        }else{
          if(this.opened){
            if(this.checked){
              const newResult = this.jsPlumb.getAllConnections()
              console.log(newResult)
              this.list = []
              for (let i = 0; i <newResult.length ; i++) {
                let source = newResult[i].sourceId.split("1").join("");
                this.list.push(source)
              }
              if(this.list.indexOf('power')===-1){
                await this.$message.warning('电源线没有连接')
              }if(this.list.indexOf('com')===-1){
                await this.$message.warning('COM端口线没有连接')
              }if(this.list.indexOf('net')===-1){
                await this.$message.warning('网线线没有连接')
              }else{
                await this.$message.success('基础连线完成')
                this.$store.commit('storeConnect',this.connectList)
                this.$store.commit('storeConnectResult',true)
              }
            }else await this.$message.error('请先检查连线')
          }else await this.$message.error('请开机')
        }
      },
      clickButton(index){
        if(this.isButton){
          this.$message.success('点击第'+index+'个按钮')
        }
      },
      clickDev(info,open=false){
        if(open){
          this.opened = !this.opened
          if(this.opened){
            this.$message.success('已开机')
          }else this.$message.error('已关闭电源')
        }else  this.$message.success(info)
      },
      clearAll(){
        this.jsPlumb.deleteEveryConnection()
        this.list=[]
        this.connectList=[]
        this.opened = false
        this.checked = false
      }
    }
  }

</script>

<style lang="less" scoped>
  #diagramContainer{
    min-width: 1500px;
    max-height: 520px;
  }
  .button{
    border:none;
    padding:0!important;
    margin:0;
    float: left
  }
.el-button{

}
.mybutton{
  border:none;
  padding:0;
  margin:0;
  float: left
}
.el-button+.el-button {
   margin:0!important;
}
.aLabel{
  background-color: red;
  color: red;
  font-size: 5px!important;
}
.svg{
  font-size: 5px!important;
}
  img:hover {
    cursor: pointer;
    transform: scale(1.2);
    -ms-transform:scale(1.2);     /* IE 9 */
    -moz-transform:scale(1.2);     /* Firefox */
    -webkit-transform:scale(1.2); /* Safari 和 Chrome */
    -o-transform:scale(1.2);}
</style>