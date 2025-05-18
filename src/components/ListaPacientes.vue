<template>
  <div class="pacientes-container">
    <div class="pacientes-content">
      <h1 class="form-title">Listado de Pacientes</h1>
      
      <div class="form-section">
        <h2 class="section-title">Buscar por nombre o RUT</h2>
        <div class="form-group">
          <label class="form-label">Ingrese nombre o RUT</label>
          <input 
            v-model="busqueda" 
            placeholder="Ej: María Fernández o 12.345.678-9" 
            class="form-input"
            @input="filtrarPacientes"
          >
        </div>
      </div>
      
      <div v-if="cargando" class="loading-state">
        <p>Cargando pacientes...</p>
      </div>
      
      <div v-else-if="pacientesFiltrados.length === 0" class="empty-state">
        <p>No se encontraron pacientes</p>
      </div>
      
      <div v-else class="patients-list">
        <div 
          v-for="paciente in pacientesFiltrados" 
          :key="paciente.id" 
          class="patient-card"
        >
          <div class="patient-info">
            <h3>{{ paciente.nombre }}</h3>
            <div class="patient-details">
              <span class="detail-label">RUT:</span>
              <span>{{ formatoRUT(paciente.rut) }}</span>
            </div>
            <div class="patient-details">
              <span class="detail-label">Última visita:</span>
              <span>{{ formatoFecha(paciente.ultimaVisita) }}</span>
            </div>
          </div>
          <button 
            @click="mostrarResumen(paciente)" 
            class="submit-button"
          >
            Ver Resumen
          </button>
        </div>
      </div>
    </div>
    
    <ResumenPaciente 
      v-if="mostrarModalResumen" 
      :paciente="pacienteSeleccionado"
      @cerrar="mostrarModalResumen = false"
    />
  </div>
</template>

<script>
import ResumenPaciente from './ResumenPaciente.vue';

export default {
  components: {
    ResumenPaciente
  },
  data() {
    return {
      busqueda: '',
      cargando: false,
      pacientes: [],
      pacientesFiltrados: [],
      pacienteSeleccionado: null,
      mostrarModalResumen: false
    }
  },
  created() {
    this.cargarPacientes();
  },
  methods: {
    async cargarPacientes() {
      this.cargando = true;
      try {
        // Simulación de datos - reemplazar con API real
        this.pacientes = [
          {
            id: 1,
            nombre: 'María Fernández López',
            rut: '187654321',
            ultimaVisita: '2023-06-15',
            peso: 57.8,
            altura: 162,
            diagnostico: 'Sobrepeso leve',
            imc: 21.9,
            historial: [
              { fecha: '2023-06-15', tipo: 'control', peso: 57.8 },
              { fecha: '2023-05-20', tipo: 'consulta', peso: 58.3 }
            ]
          },
          {
            id: 2,
            nombre: 'Juan Pérez González',
            rut: '123456789',
            ultimaVisita: '2023-07-10',
            peso: 75.2,
            altura: 175,
            diagnostico: 'Normopeso',
            imc: 24.5
          }
        ];
        this.pacientesFiltrados = [...this.pacientes];
      } catch (error) {
        console.error('Error al cargar pacientes:', error);
      } finally {
        this.cargando = false;
      }
    },
    filtrarPacientes() {
      const termino = this.busqueda.toLowerCase();
      this.pacientesFiltrados = this.pacientes.filter(p => 
        p.nombre.toLowerCase().includes(termino) || 
        p.rut.includes(termino.replace(/[^0-9kK]/g, ''))
      );
    },
    formatoFecha(fecha) {
      if (!fecha) return 'N/A';
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(fecha).toLocaleDateString('es-CL', options);
    },
    formatoRUT(rut) {
      if (!rut) return '';
      const rutLimpio = rut.toString().replace(/[^0-9kK]/g, '');
      if (rutLimpio.length <= 1) return rutLimpio;
      
      const cuerpo = rutLimpio.slice(0, -1);
      const dv = rutLimpio.slice(-1).toUpperCase();
      
      return cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
    },
    mostrarResumen(paciente) {
      this.pacienteSeleccionado = paciente;
      this.mostrarModalResumen = true;
    }
  }
}
</script>

<style scoped>
.pacientes-container {
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.pacientes-content {
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

.form-section {
  margin-bottom: 2rem;
}

.section-title {
  color: #4a5568;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.5rem;
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

.form-input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.loading-state, .empty-state {
  text-align: center;
  padding: 2rem;
  color: #4a5568;
  font-size: 1.1rem;
}

.patients-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.patient-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.patient-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
}

.patient-info h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
}

.patient-details {
  display: flex;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #4a5568;
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
  transition: all 0.3s ease;
  margin-top: 1.5rem;
}

.submit-button:hover {
  background-color: #9e4fb0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Responsive */
@media (max-width: 768px) {
  .pacientes-container {
    padding: 1rem;
  }

  .pacientes-content {
    padding: 1.5rem;
    box-shadow: none;
  }

  .form-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .patients-list {
    grid-template-columns: 1fr;
  }

  .submit-button {
    padding: 0.8rem;
  }
}
</style>