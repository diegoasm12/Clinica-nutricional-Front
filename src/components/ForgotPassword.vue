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
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  color: #2c3e50;
}

.description {
  margin-bottom: 25px;
  color: #718096;
  text-align: center;
  font-size: 1rem;
}

.form-group {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #4a5568;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #b35fc3;
  box-shadow: 0 0 0 3px rgba(179, 95, 195, 0.2);
}

button {
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

button:hover {
  background-color: #9e4fb0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.error-message {
  color: #e53e3e;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
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
  color: #b35fc3;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
}

.back-link:hover {
  text-decoration: underline;
}

.back-to-login {
  margin-top: 20px;
  text-align: center;
}

.back-to-login a {
  color: #b35fc3;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}

.back-to-login a:hover {
  text-decoration: underline;
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .forgot-password-form {
    padding: 30px;
    box-shadow: none;
    max-width: 100%;
  }
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 25px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  input {
    padding: 12px;
  }
  
  button {
    padding: 12px;
  }
}

  </style>