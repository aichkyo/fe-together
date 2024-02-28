const Vue = window.Vue
window.ks = window.ks && window.ks.default
window.ksui = window.ksui && window.ksui.default

// import Vue from 'vue'
import App from './App.vue'

import hrUI from '../packages/index'
Vue.use(hrUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
