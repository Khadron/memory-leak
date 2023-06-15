import Vue from 'vue'
import router from './router'
import debounce from './directives/debounce'
import App from './App.vue'

Vue.use(debounce)
Vue.config.productionTip = false
Vue.$eventBus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
