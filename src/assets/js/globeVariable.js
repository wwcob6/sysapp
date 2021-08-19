var validateNull = (rule, value, callback) => {
  // console.log(typeof (value))
  if (value) {
    if (value.trim().length === 0) {
      callback(new Error('不能为空！'));
    }else{
      callback()
    }
  }
  else {
    callback(new Error('不能为空！'));
  }
}
export default {
  validateNull
}
