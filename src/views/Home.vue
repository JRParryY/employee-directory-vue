<template>
  <div class="home-container">
    <!-- Updated home page without action buttons -->
    <div class="welcome-section">
      <img src="../assets/logo.png" alt="Employee Directory Logo" class="welcome-logo" />
      <h1>Welcome to Employee Directory</h1>
      <p class="welcome-message">
        Manage your workforce data with our comprehensive employee directory application.
        Easily view, add, and manage employee information in one central location.
      </p>
    </div>
    
    <div class="features-section">
      <h2>Key Features</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">👥</div>
          <h3>Employee Management</h3>
          <p>View complete employee profiles with detailed information including roles, departments, and projects.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔍</div>
          <h3>Quick Search</h3>
          <p>Easily find employees by name with our fast and responsive search functionality.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3>Mobile Friendly</h3>
          <p>Access the directory from any device with our responsive design that works on desktop and mobile.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">➕</div>
          <h3>Easy Data Entry</h3>
          <p>Add new employees quickly with our intuitive form interface.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.welcome-section {
  text-align: center;
  padding: 3rem 1rem;
  background-color: #fcfffd;
  border-radius: 8px;
  margin-bottom: 3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.welcome-logo {
  width: 180px;
  height: auto;
  margin-bottom: 1.5rem;
}

.welcome-message {
  max-width: 700px;
  margin: 1.5rem auto;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
}

.features-section {
  padding: 1rem;
}

.features-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-dark);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: #fcfffd;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

/* Responsive styling */
@media (max-width: 768px) {
  .welcome-section {
    padding: 2rem 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style> 