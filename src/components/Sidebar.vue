<template>
    <nav class="sidebar">
      <div class="sidebar-header">
        <h2>Menú</h2>
      </div>
  
      <ul class="sidebar-menu">
        <li>
          <RouterLink to="/" active-class="active-link">Inicio</RouterLink>
        </li>
        <li>
          <RouterLink to="/" active-class="active-link">Perfil</RouterLink>
        </li>
        <li>
          <RouterLink to="/" active-class="active-link">Configuración</RouterLink>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Sidebar'
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 220px;
    min-height: 100vh;
    background-color: #f7fafc;
    padding: 20px;
    border-right: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
  }
  
  .sidebar-header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .sidebar-header h2 {
    color: #4a5568;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .sidebar-menu {
    list-style: none;
    padding: 0;
  }
  
  .sidebar-menu li {
    margin-bottom: 1rem;
  }
  
  .sidebar-menu a {
    color: #4a5568;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    display: block;
    transition: color 0.2s;
  }
  
  .sidebar-menu a:hover {
    color: #b35fc3;
  }
  
  .active-link {
    color: #b35fc3;
    font-weight: bold;
  }
  </style>
  