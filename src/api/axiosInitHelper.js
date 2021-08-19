import { Loading } from 'element-ui'
import _ from 'lodash'

let needLoadingRequestCount = 0
let loading

function startLoading(text) {
  loading = Loading.service({
    lock: true,
    spinner: 'el-icon-loading',
    text: text,
    background: 'rgba(0, 0, 0, 0.1)'
  })
}

function endLoading() {
  loading.close()
}

const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

export function showFullScreenLoading(e) {
  if (needLoadingRequestCount === 0) {
    startLoading(e)
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    _.debounce(tryCloseLoading, 0)()
  }
}
