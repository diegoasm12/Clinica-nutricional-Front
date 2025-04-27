<template>
    <div class="register-container">
      <div class="register-form">
        <h1 class="form-title">CREAR CUENTA</h1>
        
        <div class="form-group">
          <label class="input-label">Ingrese su correo electrónico</label>
          <input
            type="email"
            class="form-input"
            placeholder="ejemplo@correo.com"
            v-model="email"
            required
          />
        </div>
        
        <div class="form-group">
          <label class="input-label">Cree una contraseña</label>
          <input
            type="password"
            class="form-input"
            placeholder="Ingrese su contraseña"
            v-model="password"
            required
          />
        </div>
        
        <div class="form-divider"></div>
        
        <button class="submit-button" @click="CrearCuenta">
          Registrar
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'register',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      CrearCuenta() {
        if (this.email && this.password) {
          this.$router.push('/backreg'); //cambiar al tener endpoints
        } else {
          alert('Debe ingresar todos los datos.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Contenedor que ocupa todo el espacio disponible */
  .register-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  
  /* Formulario que se expande según contenido */
  .register-form {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 30px;
    font-size: 2rem;
  }
  
  .form-group {
    margin-bottom: 25px;
    width: 100%;
  }
  
  .input-label {
    display: block;
    margin-bottom: 10px;
    font-size: 1.1rem;
    color: #4a5568;
    font-weight: 500;
  }
  
  .form-input {
    width: 100%;
    padding: 15px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
  }
  
  .form-input:focus {
    outline: none;
    border-color: #b35fc3;
  }
  
  .form-divider {
    height: 1px;
    background-color: #e2e8f0;
    margin: 30px 0;
  }
  
  .submit-button {
    width: 100%;
    padding: 15px;
    background-color: #b35fc3;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #9e4fb0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .recover-password-wrapper {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  
  .forgot-password-link {
    color: #b35fc3;
    font-size: 0.9rem;
    text-decoration: none;
    font-weight: 500;
  }
  
  .forgot-password-link:hover {
    text-decoration: underline;
  }
  
  
  /* Responsive para móviles */
  @media (max-width: 768px) {
    .register-form {
      padding: 30px;
      box-shadow: none;
      max-width: 100%;
    }
    
    .form-title {
      font-size: 1.8rem;
      margin-bottom: 25px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-input {
      padding: 12px;
    }
    
    .submit-button {
      padding: 12px;
    }
  }
  </style>