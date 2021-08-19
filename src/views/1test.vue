<template>

    <div id="labelManage">
        <div id="main">
            <el-button @click="jsPlumb">xx</el-button>
            <div class="flowchart-demo" id="flowchart-demo">
                <div class="window" id="flowchartWindow1">1
                </div>
                <div class="window" id="flowchartWindow2">2
                </div>
                <div class="window" id="flowchartWindow3">3
                </div>
                <div class="window" id="flowchartWindow4">4
                </div>
            </div>
        </div>
    </div>

</template>

<script>
  import Container from "../components/Student/ShiyanDev/Container";
  export default {
    name: "test",
    components:{
      Container
    },
    data() {
      return {
          jsPlumb: null,
          list1:[{name:'XX',nodeId:'x'},{name:'YY',nodeId:'y'},{name:'ZZ',nodeId:'z'}],
          list2:[{name:'AA',nodeId:'a'},{name:'BB',nodeId:'b'},{name:'CC',nodeId:'c'}],
          connlist:[{sourceNodeId:'x',targetNodeId:'a'},{sourceNodeId:'y',targetNodeId:'b'},{sourceNodeId:'z',targetNodeId:'c'}],
        screenShow: false,
        body: null
      }
    },
    mounted() {
        let ins = this.jsPlumb,
                allConnection = ins.getAllConnections();
        ins.batch(() => {
            this.initAll();
            this.connectionAll();
        });
        this.switchContainer(true,true,false);
    },
      created() {
          this.jsPlumb = this.$jsPlumb.getInstance({
              Container:"container",   //选择器id
              EndpointStyle: { radius: 4, fill: "#acd"},  //端点样式
              PaintStyle: { stroke: '#fafafa',strokeWidth:4},// 绘画样式，默认8px线宽  #456
              HoverPaintStyle: { stroke: '#1E90FF' }, // 默认悬停样式  默认为null
              EndpointHoverStyle: { fill: '#F00', radius:6 }, // 端点悬停样式
              ConnectionOverlays:[
                  ["Arrow",{
                      location:1,
                      paintStyle: {
                          stroke: '#00688B',
                          fill: '#00688B',
                      }
                  }]
              ],
              Connector:["Straight",{gap:1}],     //要使用的默认连接器的类型：折线，流程等
              DrapOptions:{cursor:"crosshair",zIndex:2000}
          });
      },
      methods:{
          initAll () {
              let rl = this.list1;
              for (let i = 0; i < rl.length; i++) {
                  this.init(rl[i].nodeId)
              }
              let rl2 = this.list2;
              for (let i = 0; i < rl2.length; i++) {
                  this.init(rl2[i].nodeId)
              }
          },
          // 初始化规则使其可以连线、拖拽
          init (id) {
              let ins = this.jsPlumb,
                      elem = document.getElementById(id);
              ins.makeSource(elem,{
                  anchor: ["Perimeter", {anchorCount:200, shape:"Rectangle"}],
                  allowLoopback: false,
                  maxConnections: 1
              });
              ins.makeTarget(elem,{
                  anchor: ["Perimeter", {anchorCount:200, shape:"Rectangle"}],
                  allowLoopback: false,
                  maxConnections: 1
              });
              ins.draggable(elem,{
                  containment: true
              });
          },
          connectionAll () {
              let ins = this.jsPlumb;
              ins.ready(() => {
                  for (let i = 0; i < this.connlist.length; i++) {
                      let conn = this.connlist[i],
                              connection = ins.connect({
                                  source:conn.sourceNodeId,
                                  target:conn.targetNodeId
                              });
                      connection.setPaintStyle({stroke:"#fafafa",strokeWidth:4})
                  }
              })
          },
          switchContainer (target,source,draggable) {
              let elem = document.getElementsByName("cell"),
                      ins = this.jsPlumb;
              ins.setSourceEnabled(elem,source);
              ins.setTargetEnabled(elem,target);
              ins.setDraggable(elem,draggable);
          },
      jsPlumb1(){

          /*
         connect表示 建立连线
          source 起始节点
          target 目标节点
          endpoint  端点类型，形状  Dot(表示圆形断电)  Rectangle（方形原点）
           */
          this.$plumb.connect({
            source: 'flowchartWindow1',
            target: 'flowchartWindow2',
            endpoint: 'Rectangle'
          })
      }
    }

  }
</script>

<style  scoped>
    #container{
        margin: 50px;
        position: relative;
        background: #efefef;
        width: 400px;
        height: 400px;
    }
    .col2,.col1{
        float: left;
    }
    .col1{
        margin-left: 40px;
    }
    .col2{
        margin-left: 150px;
    }
    #container>div>div{
        width: 100px;
        height: 40px;
        line-height: 40px;
        background: lightcyan;
        margin-top: 40px;
    }
    .flowchart-demo {
        width: 800px;
        height: 600px;
        border: 1px solid #000;
        position: relative;
    }

    .flowchart-demo .window {
        border: 1px solid #346789;
        /*box-shadow 属性向框添加一个或多个阴影
         box-shadow: 2px 2px 19px #aaa;
         box-shadow: （必需。水平阴影的位置。允许负值） （必需。垂直阴影的位置。允许负值。）  （可选。模糊距离。） （可选。阴影的颜色。）
          因为是新属性，为了兼容各主流浏览器并支持这些主浏览器的较低版本，基于主流浏览器上使用box-shadow属性时，
          我们需要将属性的名称写成-webkit-box-shadow的形式。
          Firefox浏览器则需要写成-moz-box-shadow的形式
          欧朋浏览器  -o-box-shadow
          IE>9  -ms-box-shadow
          -webkit 是在Chrome浏览器中用的 一般是指 浏览器是webkit核心 -webkit-box-shadow
        */
        box-shadow: 2px 2px 19px #aaa;
        -o-box-shadow: 2px 2px 19px #aaa;
        -webkit-box-shadow: 2px 2px 19px #aaa;
        -moz-box-shadow: 2px 2px 19px #aaa;
        /* -moz-border-radius 火狐浏览器的边框圆角*/
        -moz-border-radius: 0.5em;
        border-radius: 0.5em;
        opacity: 0.5;
        filter: alpha(opacity=80);
        text-align: center;
        position: absolute;
        background-color: #eeeeef;
        color: black;
        font-family: helvetica;
        font-size: 0.9em;
        line-height: 60px;
        width: 60px;
        height: 60px;
    }

    .flowchart-demo .window:hover {
        box-shadow: 2px 2px 19px #444;
        -o-box-shadow: 2px 2px 19px #444;
        -webkit-box-shadow: 2px 2px 19px #444;
        -moz-box-shadow: 2px 2px 19px #444;
        opacity: 0.6;
        filter: alpha(opacity=60);
    }

    .flowchart-demo .active {
        border: 1px dotted green;
    }

    .flowchart-demo .hover {
        border: 1px dotted red;
    }

    #flowchartWindow1 {
        top: 34em;
        left: 5em;
    }

    #flowchartWindow2 {
        top: 7em;
        left: 36em;
    }

    #flowchartWindow3 {
        top: 27em;
        left: 48em;
    }

    #flowchartWindow4 {
        top: 23em;
        left: 22em;
    }
  /*.full_Screen {*/
  /*  z-index: 800;*/
  /*  position: fixed;*/
  /*  left: 15px;*/
  /*  bottom: 10px;*/
  /*  color: #606266;*/
  /*  border: 1px solid #c0c4cc;*/
  /*  background-color: white;*/
  /*  border-radius: 50px;*/
  /*  padding: 3px 8px;*/
  /*}*/
  /*.container_full_element {*/
  /*  position: fixed;*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*  top: 0;*/
  /*  left: 0;*/
  /*  z-index: 9999;*/
  /*}*/
  /*.flowchart-demo {*/
  /*    width: 800px;*/
  /*    height: 600px;*/
  /*    border: 1px solid #000;*/
  /*    position: relative;*/
  /*}*/
  /*.flowchart-demo .window {*/
  /*    border: 1px solid #346789;*/
  /*    !*box-shadow 属性向框添加一个或多个阴影*/
  /*     box-shadow: 2px 2px 19px #aaa;*/
  /*     box-shadow: （必需。水平阴影的位置。允许负值） （必需。垂直阴影的位置。允许负值。）  （可选。模糊距离。） （可选。阴影的颜色。）*/
  /*      因为是新属性，为了兼容各主流浏览器并支持这些主浏览器的较低版本，基于主流浏览器上使用box-shadow属性时，*/
  /*      我们需要将属性的名称写成-webkit-box-shadow的形式。*/
  /*      Firefox浏览器则需要写成-moz-box-shadow的形式*/
  /*      欧朋浏览器  -o-box-shadow*/
  /*      IE>9  -ms-box-shadow*/
  /*      -webkit 是在Chrome浏览器中用的 一般是指 浏览器是webkit核心 -webkit-box-shadow*/
  /*    *!*/
  /*    box-shadow: 2px 2px 19px #aaa;*/
  /*    -o-box-shadow: 2px 2px 19px #aaa;*/
  /*    -webkit-box-shadow: 2px 2px 19px #aaa;*/
  /*    -moz-box-shadow: 2px 2px 19px #aaa;*/

  /*    !* -moz-border-radius 火狐浏览器的边框圆角*!*/
  /*    -moz-border-radius: 0.5em;*/
  /*    border-radius: 0.5em;*/
  /*    opacity: 0.5;*/
  /*    filter: alpha(opacity=80);*/
  /*    text-align: center;*/
  /*    position: absolute;*/
  /*    background-color: #eeeeef;*/
  /*    color: black;*/
  /*    font-family: helvetica;*/
  /*    font-size: 0.9em;*/
  /*    line-height: 60px;*/
  /*    width: 60px;*/
  /*    height: 60px;*/
  /*}*/
  /*.flowchart-demo .window:hover {*/
  /*    box-shadow: 2px 2px 19px #444;*/
  /*    -o-box-shadow: 2px 2px 19px #444;*/
  /*    -webkit-box-shadow: 2px 2px 19px #444;*/
  /*    -moz-box-shadow: 2px 2px 19px #444;*/
  /*    opacity: 0.6;*/
  /*    filter: alpha(opacity=60);*/
  /*}*/
  /*.flowchart-demo .active {*/
  /*    border: 1px dotted green;*/
  /*}*/
  /*.flowchart-demo .hover {*/
  /*    border: 1px dotted red;*/
  /*}*/

  /*#flowchartWindow1 {*/
  /*    top: 34em;*/
  /*    left: 5em;*/
  /*}*/
  /*#flowchartWindow2 {*/
  /*    top: 7em;*/
  /*    left: 36em;*/
  /*}*/
  /*#flowchartWindow3 {*/
  /*    top: 27em;*/
  /*    left: 48em;*/
  /*}*/
  /*#flowchartWindow4 {*/
  /*    top: 23em;*/
  /*    left: 22em;*/
  /*}*/


</style>