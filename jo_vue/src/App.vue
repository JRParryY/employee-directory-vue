<template>
  <!-- Root container for the entire application -->
  <div id="app">
    <!-- Navigation component -->
    <AppNavigation />
    
    <!-- Main content area that changes based on route -->
    <main class="main-content">
      <router-view />
    </main>
    
    <!-- Footer component -->
    <AppFooter />
  </div>
</template>

<script>
// Import components
import AppNavigation from './components/Navigation.vue'
import AppFooter from './components/Footer.vue'

export default {
  name: 'App',
  // Register imported components
  components: {
    AppNavigation,
    AppFooter
  }
}
</script>

<style>
/* CSS Variables for consistent styling across the application */
:root {
  --primary-color: #1cbcb8;
  --primary-dark: #004e54;
  --light-color: #ffffff;
  --grey-color: #f9f9f9;
  --danger-color: #e74c3c;
  --border-color: #ddd;
  --bg-color: #f9fffb; /* Very faint green tint, almost white */
  
  /* Responsive font sizes */
  --font-size-base: 16px;
  --font-size-small: 14px;
  --font-size-xsmall: 12px;
}

/* Global styles */
html {
  font-size: var(--font-size-base);
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: var(--bg-color);
  color: #333;
  overflow-x: hidden;
  width: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  flex: 1;
}

button {
  cursor: pointer;
}

* {
  box-sizing: border-box;
}

/* Responsive global styles */
@media (max-width: 768px) {
  html {
    font-size: var(--font-size-small);
  }
}

@media (max-width: 480px) {
  html {
    font-size: var(--font-size-xsmall);
  }
}
</style>