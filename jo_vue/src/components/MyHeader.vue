<template>
  <!-- Header section of the application -->
  <header class="app-header">
    <div class="logo-container">
      <!-- Using src attribute to load the logo image -->
      <img src="../assets/logo.png" alt="S.E.D Logo" class="logo" />
    </div>
  </header>
</template>

<script>
// Basic component definition
export default {
  name: 'MyHeader'
  // This is a simple presentational component with no data or methods
}
</script>

<style scoped>
/* 'scoped' keyword ensures these styles only apply to this component */
.app-header {
  background: #004e54;
  color: white;
  padding: 0.4rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}

.logo-container {
  margin-bottom: -190px;
}

.logo {
  height: 200px;
  width: auto;
}

/* Responsive styles */
@media (max-width: 768px) {
  .logo {
    height: 350px;
  }
  .logo-container {
    margin-bottom: -150px;
  }
}

@media (max-width: 480px) {
  .logo {
    height: 250px;
  }
  .logo-container {
    margin-bottom: -100px;
  }
}
</style> 