<template>
  <div class="employee-container">
    <!-- Conditionally include the EmployeeForm component -->
    <EmployeeForm @add-employee="addEmployee" v-if="showForm" />
    
    <div class="controls">
      <!-- Add Employee button -->
      <button class="add-btn" @click="toggleForm">
        {{ showForm ? 'Hide Form' : 'Add Employee' }}
      </button>
      <!-- Search input -->
      <input 
        type="text" 
        placeholder="Search by name..." 
        v-model="searchQuery" 
        class="search-input"
      />
    </div>

    <!-- Loading and error states -->
    <div v-if="loading" class="loading">Loading employees...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Employee listing -->
    <div class="employee-list" v-if="!loading && !error">
      <!-- Loop through employees with v-for -->
      <div 
        v-for="employee in filteredEmployees" 
        :key="employee._id" 
        class="employee-card"
      >
        <!-- Employee information row -->
        <div class="employee-row">
          <div class="employee-name">{{ employee.name }}</div>
          <div class="employee-role">
            <span><strong>Role:</strong> {{ employee.jobTitle }}</span>
          </div>
          
          <!-- Show/Hide Details buttons -->
          <div class="action-buttons">
            <button 
              class="action-btn details-btn" 
              @click="toggleDetails(employee._id)"
            >
              {{ expandedEmployee === employee._id ? 'Hide Details' : 'Show Details' }}
            </button>
            
            <button 
              class="action-btn delete-btn" 
              @click="deleteEmployee(employee._id)"
            >
              Delete
            </button>
          </div>
        </div>
        
        <!-- Conditionally show details section -->
        <div class="employee-details" v-if="expandedEmployee === employee._id">
          <div class="details-section">
            <p><strong>Department:</strong> {{ employee.department }}</p>
            <p><strong>Email:</strong> {{ employee.email }}</p>
            <p><strong>Manager:</strong> {{ employee.manager || 'N/A' }}</p>
            <p><strong>Team:</strong> {{ employee.team || 'N/A' }}</p>
            <p><strong>Current Project:</strong> {{ employee.currentProject || 'None assigned' }}</p>
            <p><strong>Years at Company:</strong> {{ employee.yearsInCompany || 'N/A' }}</p>
          </div>
        </div>
      </div>

      <!-- Pagination controls -->
      <div class="pagination" v-if="totalPages > 1">
        <button 
          @click="changePage(currentPage - 1)" 
          :disabled="currentPage === 1" 
          class="page-btn"
        >
          Previous
        </button>
        
        <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
        
        <button 
          @click="changePage(currentPage + 1)" 
          :disabled="currentPage === totalPages" 
          class="page-btn"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// Import the EmployeeForm component
import EmployeeForm from './EmployeeForm.vue';

export default {
  name: 'EmployeeBox',
  components: {
    EmployeeForm
  },
  // Component's reactive data
  data() {
    return {
      employees: [],         // Array to store all employees
      loading: true,         // Loading state for API calls
      error: null,           // Error message if API call fails
      searchQuery: '',       // User's search input
      expandedEmployee: null, // ID of the expanded employee card
      showForm: false,       // Toggle for the add employee form
      currentPage: 1,        // Current page for pagination
      itemsPerPage: 10       // Number of items per page
    };
  },
  // Computed properties - reactive values derived from data
  computed: {
    // Filter and paginate employees based on search query and current page
    filteredEmployees() {
      if (!this.searchQuery) {
        // If no search query, apply pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.employees.slice(startIndex, endIndex);
      }
      
      // If search query exists, filter by name (without pagination)
      const query = this.searchQuery.toLowerCase();
      return this.employees.filter(emp => 
        emp.name.toLowerCase().includes(query)
      );
    },
    // Calculate total number of pages based on employee count
    totalPages() {
      return Math.ceil(this.employees.length / this.itemsPerPage);
    }
  },
  methods: {
    // Fetch employees from the backend API
    async fetchEmployees() {
      this.loading = true;
      this.error = null;
      
      try {
        // Using fetch API to make HTTP request
        const response = await fetch('http://localhost:5202/api/employees');
        
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        
        // Parse JSON response and store in employees array
        this.employees = await response.json();
      } catch (err) {
        // Simplified error handling
        this.error = 'Failed to load employees. Please try again later.';
        console.error('Error:', err);
      } finally {
        this.loading = false;
      }
    },
    // Toggle the details section for an employee
    toggleDetails(employeeId) {
      if (this.expandedEmployee === employeeId) {
        this.expandedEmployee = null;
      } else {
        this.expandedEmployee = employeeId;
      }
    },
    // Toggle the display of the employee form
    toggleForm() {
      this.showForm = !this.showForm;
    },
    // Add a new employee via API call
    async addEmployee(employee) {
      try {
        const response = await fetch('http://localhost:5202/api/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(employee)
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        
        // Add the new employee to the beginning of the array
        const newEmployee = await response.json();
        this.employees.unshift(newEmployee);
        this.showForm = false; // Hide form after successful submission
      } catch (err) {
        alert('Failed to add employee. Please try again.');
        console.error('Error:', err);
      }
    },
    // Delete an employee via API call
    async deleteEmployee(id) {
      if (!confirm('Are you sure you want to delete this employee?')) {
        return;
      }
      
      try {
        const response = await fetch(`http://localhost:5202/api/employees/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        
        // Remove employee from local array
        this.employees = this.employees.filter(emp => emp._id !== id);
      } catch (err) {
        alert('Failed to delete employee. Please try again.');
        console.error('Error:', err);
      }
    },
    // Change current page for pagination
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  },
  // Lifecycle hook - called when component is mounted to DOM
  mounted() {
    // Fetch data when component is ready
    this.fetchEmployees();
  }
};
</script>

<style scoped>
.employee-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 250px;
}

.employee-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.employee-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fcfffd; /* Very faint green tint for cards */
}

.employee-row {
  display: flex;
  align-items: center;
  padding: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.employee-name {
  font-weight: bold;
  width: 200px;
  color: #004e54;
}

.employee-role {
  flex: 1;
  min-width: 150px;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.details-btn {
  background-color: #1cbcb8;
}

.details-btn:hover {
  background-color: #18a6a2;
}

.employee-details {
  padding: 1rem;
  background-color: #f5fff7; /* Slightly darker shade for the details section */
  border-top: 1px solid #eee;
}

.details-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.details-section p {
  margin: 0.5rem 0;
}

.add-btn, .page-btn {
  background-color: #1cbcb8;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover, .page-btn:hover {
  background-color: #18a6a2;
}

.delete-btn {
  background-color: #e74c3c;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: #e74c3c;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.page-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.9rem;
}

/* Responsive styles */
@media (max-width: 768px) {
  .employee-container {
    padding: 0.75rem;
  }
  
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-input {
    width: 100%;
  }
  
  .employee-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .employee-name, .employee-role {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .action-buttons {
    width: 100%;
    justify-content: space-between;
  }
  
  .details-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .employee-container {
    padding: 0.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .action-btn {
    width: 100%;
  }
  
  .pagination {
    gap: 0.5rem;
  }
}
</style>