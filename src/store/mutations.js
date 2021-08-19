export default {
  //mutation唯一的目的就是修改state中状态
  //每一个方法尽可能完成的事件比较单一一点

  storeToken(state,payload){
    state.token = payload
  },
  storeConnect(state,payload){
    state.connect=payload
  },
  storeConnectResult(state,payload){
    state.connectResult = payload
  },
  storeStuActivePath(state,payload){
    state.stuActivePath = payload
    console.log(payload)
  }
}