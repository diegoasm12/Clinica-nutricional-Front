<template>
  <div class="gestion-container">
    <div class="gestion-content">
      <div v-if="mostrarNotificacion" class="notificacion" :class="tipoNotificacion">
        {{ mensajeNotificacion }}
      </div>

      <h1 class="form-title">Gestión de Roles</h1>

      <div class="form-section">
        <h2 class="section-title">Buscar rol</h2>
        <div class="form-group">
          <label class="form-label">Ingrese nombre del rol</label>
          <input 
            v-model="busqueda" 
            placeholder="Ej: Admin" 
            class="form-input"
            @input="filtrarRoles"
          >
        </div>
      </div>

      <div v-if="cargando" class="loading-state">
        <p>Cargando roles...</p>
      </div>

      <div v-else-if="rolesFiltrados.length === 0" class="empty-state">
        <p>No se encontraron roles</p>
      </div>

      <div v-else class="roles-list">
        <div v-for="rol in rolesFiltrados" :key="rol.id" class="role-card">
          <div class="role-info">
            <h3>{{ rol.nombre }}</h3>
            <p class="descripcion">{{ rol.descripcion }}</p>
          </div>
          <button class="submit-button" @click="editarRol(rol)">Editar Rol</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GestionRoles',
  data() {
    return {
      busqueda: '',
      cargando: false,
      roles: [],
      rolesFiltrados: [],
      mostrarNotificacion: false,
      mensajeNotificacion: '',
      tipoNotificacion: 'info',
      timeoutNotificacion: null
    }
  },
  created() {
    this.cargarRoles()
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
    cargarRoles() {
      this.cargando = true
      setTimeout(() => {
        this.roles = [
          { id: 1, nombre: 'Admin', descripcion: 'Acceso total al sistema' },
          { id: 2, nombre: 'Nutricionista', descripcion: 'Acceso a fichas clínicas y consultas' },
          { id: 3, nombre: 'Asistente', descripcion: 'Acceso restringido a vistas de apoyo' }
        ]
        this.rolesFiltrados = [...this.roles]
        this.cargando = false
      }, 800)
    },
    filtrarRoles() {
      const termino = this.busqueda.toLowerCase()
      this.rolesFiltrados = this.roles.filter(r =>
        r.nombre.toLowerCase().includes(termino)
      )
    },
    editarRol(rol) {
      this.$router.push({ name: 'EditarRol', params: { id: rol.id } })
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
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.form-title {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
}
.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
}
.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
}
.loading-state, .empty-state {
  text-align: center;
  padding: 2rem;
  color: #4a5568;
}
.roles-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
.role-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: 0.3s;
}
.role-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
}
.role-info h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
}
.descripcion {
  font-size: 0.95rem;
  color: #4a5568;
  margin-top: 0.25rem;
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
.notificacion {
  position: fixed;
  top: 60px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.5s, fadeOut 0.5s 2.5s forwards;
}
.notificacion.info {
  background-color: #4299e1;
}
.notificacion.exito {
  background-color: #48bb78;
}
.notificacion.error {
  background-color: #f56565;
}
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

</style>
