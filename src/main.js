import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import jquery from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import anime from 'animejs/lib/anime.es.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$try = (fn, errorHandler = () => { }) => {
  try {
    return fn()
  } catch (e) {
    errorHandler(e)
  }
}
const api = axios.create({
  baseURL: 'https://web-demo003-api.herokuapp.com/',
  timeout: 5000
})
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.prototype.$api = api
Vue.prototype.$anime = anime
Vue.use(ElementUI)
window.$ = jquery
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
