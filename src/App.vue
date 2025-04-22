<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="outer-container">
    <div class="main-layout">
      <div class="left-logo">
        <img alt="Nutri logo" class="logo" src="@/assets/logo.png" />
        <h1 class="app-title">NutriPro</h1>
      </div>
      <div class="right-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fondo general */
.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('@/assets/background.png') no-repeat center center;
  background-size: cover;
  padding: 1rem;
}

/* Contenedor principal */
.main-layout {
  display: flex;
  width: 100%;
  max-width: 1200px;
  min-height: 80vh;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  flex-wrap: wrap;
}

/* Lado izquierdo - Logo */
.left-logo {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.app-title {
  margin-top: 1.5rem;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: #2c3e50;
  font-weight: 700;
}

/* Logo */
.logo {
  width: min(70%, 300px);
  height: auto;
  object-fit: contain;
}

/* Lado derecho - Formulario */
.right-content {
  flex: 1;
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.9);
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
    min-height: auto;
  }
  
  .left-logo, .right-content {
    width: 100%;
    padding: 1.5rem;
  }
  
  .left-logo {
    padding-bottom: 0;
  }
  
  .logo {
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  .outer-container {
    padding: 0;
    align-items: flex-start;
  }
  
  .main-layout {
    border-radius: 0;
    min-height: 100vh;
  }
  
  .left-logo, .right-content {
    padding: 1rem;
  }
  
  .app-title {
    margin-top: 1rem;
  }
}
</style>

        <!-- <HelloWorld msg="You did it!" /> -->

      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">login</RouterLink>
      </nav> -->

