<template>
  <div class="plan-container">
    <div class="plan-content">
      <h1 class="form-title">Plan Nutricional</h1>

      <div class="form-section">
        <h2 class="section-title">Buscar por paciente</h2>
        <div class="form-group">
          <label class="form-label">Nombre o RUT</label>
          <input 
            v-model="busqueda" 
            placeholder="Ej: Laura Gutiérrez o 12.345.678-9"
            class="form-input"
            @input="filtrarPlanes"
          />
        </div>
      </div>

      <div v-if="cargando" class="loading-state">
        <p>Cargando planes...</p>
      </div>

      <div v-else-if="planesFiltrados.length === 0" class="empty-state">
        <p>No se encontraron planes</p>
      </div>

      <div v-else class="plans-list">
        <div v-for="plan in planesFiltrados" :key="plan.id" class="plan-card">
          <h3>{{ plan.paciente }}</h3>
          <p><strong>Objetivo:</strong> {{ plan.objetivo }}</p>
          <p><strong>Calorías diarias:</strong> {{ plan.calorias }} kcal</p>
          <p><strong>Distribución:</strong> {{ plan.distribucion }}</p>
          <p><strong>Observaciones:</strong> {{ plan.observaciones }}</p>
          <button class="submit-button" @click="editarPlan(plan)">Editar Plan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlanNutricional',
  data() {
    return {
      busqueda: '',
      cargando: false,
      planes: [],
      planesFiltrados: []
    }
  },
  created() {
    this.cargarPlanes()
  },
  methods: {
    cargarPlanes() {
      this.cargando = true
      setTimeout(() => {
        this.planes = [
          {
            id: 1,
            paciente: 'Laura Gutiérrez',
            objetivo: 'Aumentar masa muscular',
            calorias: 2200,
            distribucion: '40% CHO / 30% PRO / 30% GRASA',
            observaciones: 'Incluir colaciones post entrenamiento.'
          },
          {
            id: 2,
            paciente: 'Juan Pérez',
            objetivo: 'Bajar peso',
            calorias: 1800,
            distribucion: '45% CHO / 25% PRO / 30% GRASA',
            observaciones: 'Reducir pan y azúcar, aumentar vegetales.'
          }
        ]
        this.planesFiltrados = [...this.planes]
        this.cargando = false
      }, 800)
    },
    filtrarPlanes() {
      const termino = this.busqueda.toLowerCase()
      this.planesFiltrados = this.planes.filter(p =>
        p.paciente.toLowerCase().includes(termino)
      )
    },
    editarPlan(plan) {
      this.$router.push({ name: 'EditarPlanNutricional', params: { id: plan.id } })
    }
  }
}
</script>

<style scoped>
.plan-container {
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.plan-content {
  width: 100%;
  max-width: 1000px;
  background: #1a202c; /* Fondo contenedor oscuro */
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

.plans-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.plan-card {
  background: #2d3748;
  border: 1px solid #4a5568;
  border-radius: 8px;
  padding: 1.5rem;
  color: #edf2f7;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}

.plan-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

.plan-card h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.plan-card p {
  margin: 0.25rem 0;
  line-height: 1.4;
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
