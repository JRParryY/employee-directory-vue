// Import the createApp function from Vue
import { createApp } from 'vue'
// Import the root App component
import App from './App.vue'
// Import the router configuration
import router from './router'

// Create a Vue application instance
const app = createApp(App)

// Use the router
app.use(router)

// Mount the app to the DOM element with id 'app'
app.mount('#app') 