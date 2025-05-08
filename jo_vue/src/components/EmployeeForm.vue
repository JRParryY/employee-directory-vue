<template>
  <!-- Form container for adding new employees -->
  <div class="form-container">
    <h3>Add New Employee</h3>
    <!-- Form with @submit.prevent to avoid page refresh -->
    <form @submit.prevent="submitForm">
      <!-- Basic Information Section -->
      <div class="form-section">
        <h4>Basic Information</h4>
        <div class="form-row">
          <div class="form-group">
            <label for="name">Name:</label>
            <!-- v-model for two-way data binding with the form input -->
            <input 
              type="text" 
              id="name" 
              v-model="employee.name" 
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              v-model="employee.email" 
              required
            />
          </div>
        </div>
      </div>

      <!-- Position Information Section -->
      <div class="form-section">
        <h4>Position Information</h4>
        <div class="form-row">
          <div class="form-group">
            <label for="jobTitle">Job Title:</label>
            <input 
              type="text" 
              id="jobTitle" 
              v-model="employee.jobTitle" 
              required
            />
          </div>
          <div class="form-group">
            <label for="department">Department:</label>
            <input 
              type="text" 
              id="department" 
              v-model="employee.department" 
              required
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="team">Team:</label>
            <input 
              type="text" 
              id="team" 
              v-model="employee.team" 
            />
          </div>
          <div class="form-group">
            <label for="manager">Manager:</label>
            <input 
              type="text" 
              id="manager" 
              v-model="employee.manager" 
            />
          </div>
        </div>
      </div>

      <!-- Additional Information Section -->
      <div class="form-section">
        <h4>Additional Information</h4>
        <div class="form-row">
          <div class="form-group">
            <label for="currentProject">Current Project:</label>
            <input 
              type="text" 
              id="currentProject" 
              v-model="employee.currentProject" 
            />
          </div>
          <div class="form-group">
            <label for="yearsInCompany">Years in Company:</label>
            <input 
              type="number" 
              id="yearsInCompany" 
              v-model="employee.yearsInCompany" 
              min="0"
              step="0.5"
            />
          </div>
        </div>
      </div>

      <button type="submit" class="submit-btn">Add Employee</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EmployeeForm',
  // Data function returns the component's reactive state
  data() {
    return {
      // Initial empty form data
      employee: {
        name: '',
        jobTitle: '',
        department: '',
        email: '',
        manager: '',
        team: '',
        currentProject: '',
        yearsInCompany: ''
      }
    }
  },
  methods: {
    // Method triggered on form submission
    submitForm() {
      // Create a copy of the employee object to avoid reference issues
      const newEmployee = { ...this.employee };
      
      // Convert yearsInCompany to a number if it's not empty
      if (newEmployee.yearsInCompany !== '') {
        newEmployee.yearsInCompany = Number(newEmployee.yearsInCompany);
      }
      
      // Emit an event to the parent component with the new employee data
      // This demonstrates child-to-parent communication
      this.$emit('add-employee', newEmployee);
      
      // Reset form after submission
      this.employee = {
        name: '',
        jobTitle: '',
        department: '',
        email: '',
        manager: '',
        team: '',
        currentProject: '',
        yearsInCompany: ''
      };
    }
  }
}
</script>

<style scoped>
/* Form styling */
.form-container {
  background-color: #fcfffd; /* Slightly different shade of very faint green */
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  width: 100%;
  box-sizing: border-box;
}

.form-section {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.form-section h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #004e54;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
  flex: 1;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #004e54;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #1cbcb8;
  box-shadow: 0 0 0 2px rgba(28, 188, 184, 0.2);
}

.submit-btn {
  background-color: #1cbcb8;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  width: 100%;
}

.submit-btn:hover {
  background-color: #18a6a2;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .form-container {
    padding: 1rem;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-section h4 {
    font-size: 1rem;
  }
  
  input {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 0.75rem;
  }
  
  .form-section {
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
  }
  
  label {
    font-size: 0.9rem;
  }
  
  input {
    padding: 0.4rem;
  }
  
  .submit-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}
</style> 