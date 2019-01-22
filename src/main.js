import Vue from 'vue'
import EE from 'onfire.js';
import App from './App'
import store from './store'

Vue.prototype.$ee = new EE()

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
  ...App,store
})


app.$mount()
