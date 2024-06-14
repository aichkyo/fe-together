const Vue = window.Vue
window.ks = window.ks && window.ks.default
window.ksui = window.ksui && window.ksui.default

const MENU = {
  id: '151596034994370809',
  title: '组件库',
  code: '41f7a32add1745c99c7fecd5ee83f41c'
}
window.ksui.menu = MENU

// import Vue from 'vue'
import App from './App.vue'

import hrUI from '../packages/index'
Vue.use(hrUI)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
