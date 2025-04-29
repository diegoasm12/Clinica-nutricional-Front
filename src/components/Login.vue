<template>
  <div class="container-fluid min-vh-100 d-flex justify-content-center align-items-center p-0">
    <div class="w-100 bg-white p-4 p-md-5 rounded-4 shadow-lg" style="max-width: 400px">
      <h1 class="text-center text-dark mb-4 fs-2">INICIE SESIÓN</h1>
      
      <div class="mb-4 w-100">
        <label class="form-label mb-2 fs-5 fw-medium text-secondary">Correo electrónico</label>
        <input
          type="email"
          class="form-control py-3 px-4 border border-gray-300 rounded-3"
          placeholder="ejemplo@correo.com"
          v-model="email"
          required
        />
      </div>
      
      <div class="mb-4 w-100">
        <label class="form-label mb-2 fs-5 fw-medium text-secondary">Contraseña</label>
        <input
          type="password"
          class="form-control py-3 px-4 border border-gray-300 rounded-3"
          placeholder="Ingrese su contraseña"
          v-model="password"
          required
        />
      </div>

      <div class="text-center my-3">
        <RouterLink to="/forgot-password" class="text-decoration-none text-purple fw-medium">
          ¿Olvidaste tu contraseña?
        </RouterLink>
      </div>
      
      <hr class="my-4 text-gray-300">
      
      <button class="w-100 btn btn-purple py-3 text-white fw-semibold fs-5 rounded-3" @click="iniciarSesion">
        INGRESAR
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    iniciarSesion() {
      if (this.email && this.password) {
        this.$router.push('/dashoard');
      } else {
        alert('Debe ingresar todos los datos.');
      }
    }
  }
};
</script>

<style scoped>
/* Variables de color personalizadas */
:root {
  --bs-purple: #b35fc3;
  --bs-gray-300: #e2e8f0;
  --bs-secondary: #4a5568;
}

.rounded-4 {
  border-radius: 0.75rem !important;
}

/* Clases personalizadas para extender Bootstrap */
.bg-purple {
  background-color: var(--bs-purple);
}

.text-purple {
  color: var(--bs-purple);
}

.btn-purple {

  background-color: #9e4fb0;
  border-color: #9e4fb0;
}

.btn-purple:hover {
  background-color: var(--bs-purple);
  border-color: var(--bs-purple);
  background-color: #b159c4;
  border-color: #b159c4;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Estilos para el enfoque del input */
.form-control:focus {
  border-color: var(--bs-purple);
  box-shadow: 0 0 0 0.25rem rgba(179, 95, 195, 0.25);
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .rounded-3 {
    border-radius: 0.5rem !important;
  }
  
  .shadow-lg {
    box-shadow: none !important;
  }
  
  .fs-2 {
    font-size: 1.8rem !important;
  }
  
  .py-3 {
    padding-top: 12px !important;
    padding-bottom: 12px !important;
  }
}
</style>