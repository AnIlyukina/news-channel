import Vue from 'vue'
import App from './App.vue'
import Paginate from 'vuejs-paginate'
import { store } from './store'

Vue.config.productionTip = false

Vue.component('Paginate', Paginate)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
