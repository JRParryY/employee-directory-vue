<template>
  <footer class="main-footer">
    <div class="footer-container">
      <div class="footer-section company-info">
        <img src="../assets/logo.png" alt="S.E.D Logo" class="footer-logo" />
        <h3>S.E.D</h3>
        <p>Simple Employee Directory</p>
      </div>
      
      <div class="footer-section quick-links">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/employees">Employee Directory</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section contact">
        <h3>Contact</h3>
        <p>Email: info@sed.example.com</p>
        <p>Phone: (555) 123-4567</p>
        <div class="social-icons">
          <a href="#" class="social-icon" aria-label="Twitter">
            <span>🐦</span>
          </a>
          <a href="#" class="social-icon" aria-label="LinkedIn">
            <span>🔗</span>
          </a>
          <a href="#" class="social-icon" aria-label="GitHub">
            <span>🐙</span>
          </a>
        </div>
      </div>
    </div>
    
    <div class="copyright">
      <p>&copy; 2023 Simple Employee Directory. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.main-footer {
  background-color: var(--primary-dark);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 3rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 1rem;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin-bottom: 2rem;
}

.company-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-logo {
  width: 150px;
  height: auto;
  margin-bottom: 1rem;
}

.footer-section h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--primary-color);
}

.footer-section p {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.quick-links ul {
  list-style: none;
  padding: 0;
}

.quick-links li {
  margin-bottom: 0.75rem;
}

.quick-links a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1rem;
}

.quick-links a:hover {
  color: var(--primary-color);
}

.social-icons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-icon {
  color: white;
  font-size: 1.8rem;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px);
}

.copyright {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 1rem;
  font-size: 0.9rem;
}

/* Responsive styling */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .company-info {
    align-items: center;
  }
  
  .footer-section {
    margin-bottom: 2rem;
    min-width: 100%;
  }
  
  .social-icons {
    justify-content: center;
  }
  
  .contact p {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .footer-logo {
    width: 100px;
  }
  
  .footer-section h3 {
    font-size: 1.2rem;
  }
  
  .social-icon {
    font-size: 1.5rem;
  }
}
</style> 