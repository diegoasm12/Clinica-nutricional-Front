<template>
  <div class="gestion-container">
    <div class="gestion-content">
      <div v-if="mostrarNotificacion" class="notificacion" :class="tipoNotificacion">
        {{ mensajeNotificacion }}
      </div>

      <h1 class="form-title">Gestión de Usuarios</h1>

      <div class="form-section">
        <h2 class="section-title">Buscar por nombre o email</h2>
        <div class="form-group">
          <label class="form-label">Ingrese nombre o email</label>
          <input 
            v-model="busqueda" 
            placeholder="Ej: juan.perez@empresa.cl" 
            class="form-input"
            @input="filtrarUsuarios"
          >
        </div>
      </div>

      <div v-if="cargando" class="loading-state">
        <p>Cargando usuarios...</p>
      </div>

      <div v-else-if="usuariosFiltrados.length === 0" class="empty-state">
        <p>No se encontraron usuarios</p>
      </div>

      <div v-else class="users-list">
        <div v-for="usuario in usuariosFiltrados" :key="usuario.id" class="user-card">
          <div class="user-info">
            <h3>{{ usuario.nombre }}</h3>
            <div class="user-details">
              <span class="detail-label">Email:</span>
              <span>{{ usuario.email }}</span>
            </div>
            <div class="user-details">
              <span class="detail-label">Rol:</span>
              <span>{{ usuario.rol }}</span>
            </div>
            <div class="user-details">
              <span class="detail-label">Último acceso:</span>
              <span>{{ formatoFecha(usuario.ultimoAcceso) }}</span>
            </div>
          </div>
          <button class="submit-button" @click="editarUsuario(usuario)">Editar Usuario</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GestionUsuarios',
  data() {
    return {
      busqueda: '',
      cargando: false,
      usuarios: [],
      usuariosFiltrados: [],
      mostrarNotificacion: false,
      mensajeNotificacion: '',
      tipoNotificacion: 'info',
      timeoutNotificacion: null
    }
  },
  created() {
    this.cargarUsuarios()
  },
  methods: {
    mostrarNotificacionTemporal(mensaje, tipo = 'info', duracion = 3000) {
      if (this.timeoutNotificacion) clearTimeout(this.timeoutNotificacion)
      this.mostrarNotificacion = true
      this.mensajeNotificacion = mensaje
      this.tipoNotificacion = tipo
      this.timeoutNotificacion = setTimeout(() => {
        this.mostrarNotificacion = false
      }, duracion)
    },
    cargarUsuarios() {
      this.cargando = true
      // Simulación de carga
      setTimeout(() => {
        this.usuarios = [
          { id: 1, nombre: 'Diego Soto', email: 'diego@demo.com', rol: 'Admin', ultimoAcceso: '2025-05-24' },
          { id: 2, nombre: 'Juan Mella', email: 'juan@demo.com', rol: 'Nutricionista', ultimoAcceso: '2025-05-23' },
          { id: 3, nombre: 'Fernando Lucena', email: 'fernando@demo.com', rol: 'Asistente', ultimoAcceso: '2025-05-22' }
        ]
        this.usuariosFiltrados = [...this.usuarios]
        this.cargando = false
      }, 800)
    },
    filtrarUsuarios() {
      const termino = this.busqueda.toLowerCase()
      this.usuariosFiltrados = this.usuarios.filter(u =>
        u.nombre.toLowerCase().includes(termino) ||
        u.email.toLowerCase().includes(termino)
      )
    },
    formatoFecha(fecha) {
      if (!fecha) return 'N/A'
      return new Date(fecha).toLocaleDateString('es-CL', { year: 'numeric', month: '2-digit', day: '2-digit' })
    },
    editarUsuario(usuario) {
      this.$router.push({ name: 'EditarUsuario', params: { id: usuario.id } })
    }
  }
}
</script>

<style scoped>
.gestion-container {
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.gestion-content {
  width: 100%;
  max-width: 1000px;
  background: #1a202c; /* Fondo oscuro */
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.form-title {
  color: #f9fafb;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
}

.section-title,
.form-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #4a5568;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #2d3748;
  color: #f9fafb;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #cbd5e0;
}

.users-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.user-card {
  background: #2d3748;
  border: 1px solid #4a5568;
  border-radius: 8px;
  padding: 1.5rem;
  color: #edf2f7;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

.user-info h3 {
  margin: 0 0 1rem 0;
  color: #f9fafb;
  font-size: 1.1rem;
  font-weight: 600;
}

.user-details {
  display: flex;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #cbd5e0;
}

.detail-label {
  font-weight: 500;
  margin-right: 0.5rem;
  min-width: 90px;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #b35fc3;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: #9e4fb0;
  transform: translateY(-2px);
}
</style>
