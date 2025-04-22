<template>
  <div class="login-form-container">
    <div class="login-form">
      <h2 class="login-title">INICIE SESIÓN</h2>
      
      <form @submit.prevent="iniciarSesion" class="form">
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
            placeholder="Ingrese su contraseña"
          />
        </div>

        <button type="submit" class="submit-btn">INGRESAR</button>
      </form>
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
        this.$router.push('/');
      } else {
        alert('Debe ingresar todos los datos.');
      }
    }
  }
};
</script>

<style scoped>
.login-form-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.login-form {
  width: 100%;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.login-title {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-size: clamp(1.5rem, 5vw, 2rem);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.95rem;
  color: #4a5568;
  font-weight: 500;
}

input {
  padding: 0.8rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #b35fc3;
}

.submit-btn {
  background-color: #b35fc3;
  color: white;
  border: none;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #9e4fb0;
}

@media (max-width: 480px) {
  .login-form {
    padding: 1.5rem;
    border-radius: 0;
    box-shadow: none;
  }
  
  .form {
    gap: 1.2rem;
  }
  
  input, .submit-btn {
    padding: 0.75rem;
  }
}
</style>