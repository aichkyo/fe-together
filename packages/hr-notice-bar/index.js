import HrNoticeBar from './src/index.js'

HrNoticeBar.install = function (Vue) {
  Vue.component(HrNoticeBar.name, HrNoticeBar)
}

export default HrNoticeBar