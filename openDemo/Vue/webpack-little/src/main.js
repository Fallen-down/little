import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/public.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
