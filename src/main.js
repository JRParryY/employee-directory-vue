// Import Vue
import Vue from 'vue'
// Import the root App component
import App from './App.vue'
// Import the router configuration
import router from './router'

// Set to false in production
Vue.config.productionTip = false

// Create a Vue instance
new Vue({
  router,
  render: h => h(App)
}).$mount('#app') 