<template>
    <div class="forgot-password-form">
      <h2>Recuperar Contraseña</h2>
      
      <div v-if="!emailSent">
        <p class="description">Ingrese su correo electrónico para recibir un enlace de recuperación de contraseña.</p>
        
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              required
              placeholder="Ingrese su correo "
            >
          </div>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          
          <button type="submit" :disabled="loading">
            {{ loading ? 'Enviando...' : 'Enviar enlace de recuperación' }}
          </button>
        </form>
      </div>
      
      <div v-else class="success-message">
        <p>
          <span class="icon">✓</span>
          Hemos enviado un enlace de recuperación a <strong>{{ email }}</strong>
        </p>
        <p class="instructions">Por favor, revise su correo electrónico y siga las instrucciones para recuperar su contraseña.</p>
        
        <div class="links">
          <router-link to="/login" class="back-link">Volver a Iniciar Sesión</router-link>
        </div>
      </div>
      
      <div class="back-to-login">
        <router-link to="/login">← Volver a Iniciar Sesión</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ForgotPasswordForm',
    data() {
      return {
        email: '',
        error: '',
        loading: false,
        emailSent: false
      }
    },
    methods: {
      async handleSubmit() {
        this.loading = true
        this.error = ''
        
        try {
          // Simulamos una llamada a una API para enviar un correo de recuperación
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Aqui hacemos la petición a la API
          // por ejemplo:
          // const response = await axios.post('/api/auth/forgot-password', { email: this.email })
          
          // Simulamos una respuesta exitosa
          this.emailSent = true
        } catch (error) {
          this.error = 'Ha ocurrido un error al enviar el correo. Inténtelo nuevamente.'
          console.error('Error sending reset email:', error)
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .forgot-password-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: white;
    position: relative;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1rem;
    color: #4a5568;
  }
  
  .description {
    margin-bottom: 1.5rem;
    color: #718096;
    text-align: center;
    font-size: 0.95rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #4a5568;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  input:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
  
  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #4299e1;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  button:hover {
    background-color: #3182ce;
  }
  
  button:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  
  .error-message {
    color: #e53e3e;
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }
  
  .success-message {
    text-align: center;
    padding: 1rem 0;
  }
  
  .success-message .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #48bb78;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 24px;
    margin-right: 8px;
  }
  
  .success-message .instructions {
    color: #718096;
    font-size: 0.95rem;
    margin-top: 1rem;
  }
  
  .links {
    margin-top: 1.5rem;
  }
  
  .back-link {
    color: #4299e1;
    text-decoration: none;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  
  .back-to-login {
    position: absolute;
    bottom: -40px;
    left: 0;
    width: 100%;
    text-align: center;
  }
  
  .back-to-login a {
    color: #4299e1;
    text-decoration: none;
    font-size: 0.875rem;
  }
  
  .back-to-login a:hover {
    text-decoration: underline;
  }
  </style>