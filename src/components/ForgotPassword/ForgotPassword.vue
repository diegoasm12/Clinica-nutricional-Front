<template>
    <div class="login-full-page">
      <div class="row g-0 h-100">
        <!-- Columna del logo -->
        <div class="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-white">
          <div class="text-center p-5">
            <img alt="Nutri logo" class="logo mb-4" src="../../../public/Logo-app.png" style="max-width: 300px; height: auto;"/>
            <h2 class="text-dark fs-1 fw-bold">NutriPro</h2>
          </div>
        </div>
        
        <!-- Columna del formulario -->
        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <div class="w-100 bg-white p-4 p-md-5 rounded-start-0 shadow-lg rounded-4" style="max-width: 500px">
            <div class="d-block d-md-none text-center mb-4">
              <img alt="Nutri logo" class="logo" src="../../../public/Logo-app.png" style="max-width: 150px; height: auto;"/>
            </div>
            
            <div v-if="!emailSent">
              <h1 class="text-center text-dark mb-4 fs-2">RECUPERAR CONTRASEÑA</h1>
              
              <p class="text-center text-secondary mb-4">
                Ingrese su correo electrónico para recibir un enlace de recuperación de contraseña.
              </p>
              
              <div class="mb-4 w-100">
                <label class="form-label mb-2 fs-5 fw-medium">Correo electrónico</label>
                <input
                  type="email"
                  class="form-control py-3 px-4 border border-gray-300 rounded-3"
                  placeholder="Ingrese su correo"
                  v-model="email"
                  required
                />
              </div>
              
              <div v-if="error" class="alert alert-danger mb-4">
                {{ error }}
              </div>
              
              <button 
                class="w-100 btn-purple py-3 text-white fw-semibold fs-5"
                @click="handleSubmit"
                :disabled="loading"
              >
                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {{ loading ? 'Enviando...' : 'Enviar enlace de recuperación' }}
              </button>
              
              <div class="text-center mt-4">
                <RouterLink to="/login" class="text-decoration-none text-purple fw-medium">
                  ← Volver a Iniciar Sesión
                </RouterLink>
              </div>
            </div>
            
            <div v-else class="text-center">
              <div class="mb-4">
                <span class="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 50px; height: 50px; font-size: 24px;">✓</span>
              </div>
              
              <h2 class="text-dark mb-3">¡Correo enviado!</h2>
              
              <p class="text-secondary mb-4">
                Hemos enviado un enlace de recuperación a <strong>{{ email }}</strong>
              </p>
              
              <p class="text-muted small mb-4">
                Por favor, revise su correo electrónico y siga las instrucciones para recuperar su contraseña.
              </p>
              
              <button 
                class="w-100 btn-outline-purple py-3 text-purple fw-semibold fs-5"
                @click="$router.push('/login')"
              >
                Volver a Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ForgotPassword',
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
        if (!this.email) {
          this.error = 'Por favor ingrese su correo electrónico'
          return
        }
        
        this.loading = true
        this.error = ''
        
        try {
          // Simulamos una llamada a una API para enviar un correo de recuperación
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Aqui hacemos la petición a la API
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
  /* Variables de color personalizadas */
  :root {
    --bs-purple: #b35fc3;
    --bs-purple-light: #e9c4f0;
    --bs-gray-300: #e2e8f0;
  }
  
  /* Estructura principal que ocupa toda la pantalla */
  .login-full-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: #f8f9fa;
  }
  
  /* Asegura que las columnas ocupen toda la altura */
  .row.h-100 {
    height: 100% !important;
    margin: 0;
  }
  
  /* Botón morado */
  .btn-purple {
    background-color: #9e4fb0;
    border-color: #9e4fb0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .btn-purple:hover {
    background-color: #864296;
    border-color: #864296;
    transition: all 0.3s ease;
  }
  
  .btn-purple:disabled {
    background-color: #a0aec0;
    border-color: #a0aec0;
    transform: none;
    box-shadow: none;
  }
  
  /* Botón outline morado */
  .btn-outline-purple {
    border: 2px solid var(--bs-purple);
    color: var(--bs-purple);
    background-color: white;
    border-radius: 5px;
    transition: all 0.3s ease;
  }
  
  .btn-outline-purple:hover {
    background-color: var(--bs-purple-light);
    transform: translateY(-2px);
  }
  
  /* Estilos para el enfoque del input */
  .form-control:focus {
    border-color: var(--bs-purple);
    box-shadow: 0 0 0 0.25rem rgba(179, 95, 195, 0.25);
  }
  
  /* Estilos para el panel del formulario */
  .rounded-start-0 {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
  
  /* Responsive para móviles */
  @media (max-width: 767.98px) {
    .rounded-start-0 {
      border-top-left-radius: var(--bs-border-radius) !important;
      border-bottom-left-radius: var(--bs-border-radius) !important;
    }
    
    .shadow-lg {
      box-shadow: none !important;
    }
    
    .login-full-page {
      background-color: white;
    }
    
    .col-md-6 {
      background-color: white !important;
    }
  }
  </style>