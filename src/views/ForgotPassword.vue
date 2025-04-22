<template>
    <div class="forgot-password-view">
      <ForgotPassword />
    </div>
  </template>
  
  <script>
  import ForgotPassword from '@/components/ForgotPassword.vue'
  
  export default {
    name: 'ForgotPasswordView',
    components: {
      ForgotPassword
    }
  }
  </script>
  
  <style scoped>
  .forgot-password-view {
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 64px);
    background-color: #f7fafc;
  }
  </style>