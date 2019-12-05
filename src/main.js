import Vue from 'vue'
import App from './App.vue'
import MM from '../packages/index'

Vue.config.productionTip = false
Vue.use(MM)

new Vue({
  render: h => h(App),
}).$mount('#app')
