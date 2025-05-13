<template>
  <div class="about-container">
    <div class="about-content">
      <h1>About Employee Directory</h1>
      
      <div class="about-section">
        <h2>Our Mission</h2>
        <p>
          The Employee Directory is designed to help organizations efficiently manage their workforce information. 
          We believe in creating intuitive tools that make administrative tasks simpler and more effective.
        </p>
      </div>
      
      <div class="about-section">
        <h2>How It Works</h2>
        <p>
          Our application allows you to:
        </p>
        <ul>
          <li>Store comprehensive employee information</li>
          <li>Quickly search for specific employees</li>
          <li>Manage team structures and departments</li>
          <li>Track employee projects and responsibilities</li>
        </ul>
      </div>
      
      <div class="about-section">
        <h2>Technology Stack</h2>
        <div class="tech-stack">
          <div class="tech-item">
            <h3>Frontend</h3>
            <ul>
              <li>Vue.js</li>
              <li>Vue Router</li>
              <li>CSS3 with Flexbox/Grid</li>
            </ul>
          </div>
          <div class="tech-item">
            <h3>Backend</h3>
            <ul>
              <li>Node.js</li>
              <li>MongoDB Database</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="action-buttons">
        <router-link to="/employees" class="btn primary-btn">
          Go to Directory
        </router-link>
        <router-link to="/" class="btn secondary-btn">
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.about-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.about-content {
  background-color: #fcfffd;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.about-section {
  margin-bottom: 2rem;
}

h1 {
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
  text-align: center;
}

h2 {
  color: var(--primary-dark);
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
}

p {
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #333;
}

ul {
  list-style-type: disc;
  padding-left: 2rem;
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.tech-item {
  flex: 1;
  min-width: 250px;
}

.tech-item h3 {
  margin-bottom: 0.75rem;
  color: var(--primary-dark);
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.primary-btn {
  background-color: var(--primary-color);
  color: white;
}

.primary-btn:hover {
  background-color: #18a6a2;
}

.secondary-btn {
  background-color: #f9f9f9;
  color: var(--primary-dark);
  border: 2px solid var(--primary-dark);
}

.secondary-btn:hover {
  background-color: #e9f7f7;
}

/* Responsive styling */
@media (max-width: 768px) {
  .tech-stack {
    flex-direction: column;
    gap: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .about-content {
    padding: 1.5rem;
  }
}
</style> 