<template>
  <nav class="main-nav">
    <div class="nav-container">
      <!-- Logo and brand name -->
      <router-link to="/" class="brand">
        <img src="../assets/logo.png" alt="Employee Directory Logo" class="nav-logo" />
        <span class="brand-name">Employee Directory</span>
      </router-link>
      
      <!-- Desktop Navigation Links -->
      <div class="nav-links" :class="{ 'active': menuOpen }">
        <router-link to="/" class="nav-link" @click="closeMenu">Home</router-link>
        <router-link to="/employees" class="nav-link" @click="closeMenu">Directory</router-link>
        <router-link to="/about" class="nav-link" @click="closeMenu">About</router-link>
      </div>
      
      <!-- Hamburger button for mobile -->
      <button class="hamburger" @click="toggleMenu" aria-label="Menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavigation',
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      
      // Prevent scrolling when menu is open
      if (this.menuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    closeMenu() {
      this.menuOpen = false;
      document.body.style.overflow = '';
    }
  }
}
</script>

<style scoped>
.main-nav {
  background-color: var(--primary-dark);
  color: white;
  padding: 0.75rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  position: relative;
}

.brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  gap: 0.5rem;
}

.nav-logo {
  height: 60px;
  width: auto;
}

.brand-name {
  font-weight: bold;
  font-size: 1.6rem;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  font-weight: 500;
}

.nav-link:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-link:hover:after, 
.nav-link.router-link-active:after {
  width: 100%;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 101;
}

.hamburger-line {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  background-color: white;
  transition: all 0.3s ease;
}

/* Responsive styles */
@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--primary-dark);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 100;
  }
  
  .nav-links.active {
    transform: translateX(0);
  }
  
  .hamburger {
    display: block;
  }
  
  /* Hamburger animation */
  .active .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translate(5px, 6px);
  }
  
  .active .hamburger-line:nth-child(2) {
    opacity: 0;
  }
  
  .active .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -6px);
  }
  
  .nav-link {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
}
</style> 