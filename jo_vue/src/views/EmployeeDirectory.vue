<template>
  <div class="employee-directory">
    <EmployeeBox />
  </div>
</template>

<script>
import EmployeeBox from '@/components/EmployeeBox.vue'

export default {
  name: 'EmployeeDirectory',
  components: {
    EmployeeBox
  }
}
</script>

<style scoped>
.employee-directory {
  padding: 1rem 0;
}
</style> 