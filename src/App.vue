<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'

// Variable para en un futuro al tener el jwt sacar el logo y dejar todo el espacio de la página
const showRouter = ref(true)


const toggleView = () => {
  showRouter.value = !showRouter.value
}

</script>

<template>
  <div class="outer-container">
    <div v-if="!showRouter" class="main-layout">
      <div class="left-logo">
        <img alt="Nutri logo" class="logo" src="@/assets/logo.png" />
      </div>
      <div class="right-content">
        <RouterView />
      </div>
    </div>
    
    <div v-else class="router-view-only">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
/* Fondo general que ocupa toda la pantalla */
.outer-container {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background: url('@/assets/background.png') no-repeat center center;
  background-size: cover;
  padding: 0;
  margin: 0;
}

/* Contenedor principal que ocupa el 90% del viewport */
.main-layout {
  display: flex;
  flex-direction: row;
  width: 90vw;
  height: 90vh;
  max-width: 1400px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* Lado izquierdo - Logo */
.left-logo {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* Logo responsivo */
.logo {
  max-width: 80%;
  max-height: 80%;
  width: auto;
  height: auto;
  object-fit: contain;
}

/* Lado derecho - Formulario (ocupa todo el espacio disponible) */
.right-content {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.9);
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .outer-container {
    padding: 0;
  }
  
  .main-layout {
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
  
  .left-logo, .right-content {
    width: 100%;
    height: 50%;
    padding: 1rem;
  }
  
  .left-logo {
    justify-content: center;
  }
  
  .right-content {
    justify-content: flex-start;
    padding-top: 0;
  }
}
</style>

<!-- <HelloWorld msg="You did it!" /> -->

      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">login</RouterLink>
      </nav> -->