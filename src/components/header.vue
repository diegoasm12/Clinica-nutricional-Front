<template>
    <header class="header">
      <div class="header-left">
        <h1 class="app-title">NutriPro</h1>
      </div>
  
      <div class="header-right">
        <span class="user-name">Hola, Usuario</span>
        <button class="logout-button" @click="$emit('logout')">Cerrar sesión</button>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header'
  }
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #b35fc3;
    color: white;
    padding: 1rem 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .app-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }
  
  .user-name {
    margin-right: 1rem;
    font-weight: 500;
  }
  
  .logout-button {
    background-color: white;
    color: #b35fc3;
    border: none;
    padding: 0.5rem 1rem;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .logout-button:hover {
    background-color: #f1e2f6;
  }
  </style>
  