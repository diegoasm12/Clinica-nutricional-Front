<template>
    <div class="dashboard-container">
      <!-- Header con evento de logout -->
      <Header @logout="cerrarSesion" />
  
      <!-- Layout principal -->
      <div class="dashboard-layout">
        <!-- Menú lateral -->
        <Sidebar />
  
        <!-- Contenido dinámico -->
        <main class="dashboard-content">
          <RouterView />
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import Header from '@/components/header.vue'
  import Sidebar from '@/components/Sidebar.vue'
  
  export default {
    name: 'Dashboard',
    components: {
      Header,
      Sidebar
    },
    methods: {
      cerrarSesion() {
        // Aquí puedes limpiar token o sesión si es necesario
        this.$router.push('/login')
      }
    }
  }
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .dashboard-layout {
    display: flex;
    flex: 1;
    overflow: hidden;
  }
  
  .dashboard-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    background-color: #fff;
  }
  </style>
  