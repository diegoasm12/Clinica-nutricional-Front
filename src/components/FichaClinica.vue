<template>
  <div class="consulta-container">
    <form @submit.prevent="handleSubmit" class="consulta-form">
      <h2 class="form-title">Consulta Nutricional</h2>

      <!-- 1. Datos del paciente -->
      <section class="form-section">
        <h3 class="section-title">Datos del paciente</h3>
        <div class="form-grid">
          <input v-model="form.nombre" placeholder="Nombre completo" required class="form-input" />
          <input v-model="form.rut" placeholder="RUT o ID" required class="form-input" />
          <input v-model.number="form.edad" type="number" placeholder="Edad" required class="form-input" />
          <select v-model="form.sexo" required class="form-input">
            <option disabled value="">Sexo</option>
            <option>Femenino</option>
            <option>Masculino</option>
            <option>Otro</option>
          </select>
          <input v-model="form.telefono" placeholder="Teléfono" class="form-input" />
          <input v-model="form.email" placeholder="Correo electrónico" type="email" class="form-input" />
          <input v-model="form.fecha" type="date" class="form-input" />
        </div>
      </section>

      <!-- 2. Anamnesis social -->
      <section class="form-section">
        <h3 class="section-title">Anamnesis Social</h3>
        <div class="form-grid">
          <input v-model="form.asiste_con" placeholder="Asiste con..." class="form-input" />
          <input v-model="form.hogar" placeholder="Descripción del hogar" class="form-input" />
          <input v-model="form.vive_con" placeholder="Vive con..." class="form-input" />
          <input v-model="form.escolaridad" placeholder="Escolaridad" class="form-input" />
          <input v-model="form.acc_vivienda" placeholder="Acceso a vivienda" class="form-input" />
          <input v-model="form.servicios_basicos" placeholder="Servicios básicos disponibles" class="form-input" />
        </div>
      </section>

      <!-- 3. Datos antropométricos -->
      <section class="form-section">
        <h3 class="section-title">Datos antropométricos</h3>
        <div class="form-grid">
          <input v-model.number="form.peso" placeholder="Peso (kg)" type="number" step="0.1" class="form-input" />
          <input v-model.number="form.altura" placeholder="Estatura (cm)" type="number" step="0.1" class="form-input" />
          <input :value="calcularIMC" placeholder="IMC (calculado)" disabled class="form-input disabled" />
          <input v-model.number="form.cintura" placeholder="Cintura (cm)" type="number" step="0.1" class="form-input" />
          <input v-model.number="form.cadera" placeholder="Cadera (cm)" type="number" step="0.1" class="form-input" />
          <input v-model.number="form.grasa" placeholder="% Grasa corporal (opcional)" type="number" step="0.1" class="form-input" />
        </div>
      </section>

      <!-- 4. Anamnesis clínica -->
      <section class="form-section">
        <h3 class="section-title">Anamnesis Clínica</h3>
        <div class="form-grid">
          <input v-model="form.antecedente_familiar" placeholder="Antecedente familiar" class="form-input" />
          <input v-model="form.medicamento" placeholder="Medicamentos que toma" class="form-input" />
          <input v-model="form.alergia" placeholder="Alergias conocidas" class="form-input" />
          <input v-model="form.antecedente_quirurgico" placeholder="Antecedentes quirúrgicos" class="form-input" />
        </div>
      </section>

      <!-- 5. Signos y síntomas -->
      <section class="form-section">
        <h3 class="section-title">Signos y Síntomas</h3>
        <div class="form-grid">
          <input v-model="form.diuresis" placeholder="Diuresis" class="form-input" />
          <input v-model="form.deposiciones" placeholder="Deposiciones" class="form-input" />
          <input v-model="form.frecuencia_bristol" placeholder="Frecuencia tipo Bristol" class="form-input" />
          <input v-model="form.sueno" placeholder="Calidad de sueño" class="form-input" />
          <input v-model="form.sudoracion_nocturna" placeholder="Sudoración nocturna" class="form-input" />
          <input v-model="form.otros_signos" placeholder="Otros signos y síntomas" class="form-input" />
        </div>
      </section>

      <!-- 6. Hábitos -->
      <section class="form-section">
        <h3 class="section-title">Hábitos</h3>
        <div class="form-grid">
          <input v-model="form.alcohol" placeholder="Consumo de alcohol" class="form-input" />
          <input v-model="form.droga" placeholder="Consumo de drogas" class="form-input" />
          <input v-model="form.tabaco" placeholder="Consumo de tabaco" class="form-input" />
          <input v-model="form.actividad_fisica" placeholder="Actividad física semanal" class="form-input" />
        </div>
      </section>

      <!-- 7. Evaluación dietética -->
      <section class="form-section">
        <h3 class="section-title">Evaluación Dietética</h3>
        <div class="form-grid">
          <textarea v-model="form.frecuencia" placeholder="Frecuencia de comidas" class="form-textarea"></textarea>
          <textarea v-model="form.preferencias" placeholder="Preferencias y restricciones" class="form-textarea"></textarea>
          <textarea v-model="form.registro24h" placeholder="Registro de 24 horas" class="form-textarea"></textarea>
        </div>
      </section>

      <!-- 8. Objetivos y plan -->
      <section class="form-section">
        <h3 class="section-title">Objetivos y Plan Nutricional</h3>
        <div class="form-grid">
          <textarea v-model="form.objetivos" placeholder="Objetivos del paciente" class="form-textarea"></textarea>
          <textarea v-model="form.diagnostico" placeholder="Diagnóstico nutricional" class="form-textarea"></textarea>
          <textarea v-model="form.recomendaciones" placeholder="Recomendaciones iniciales" class="form-textarea"></textarea>
          <textarea v-model="form.plan" placeholder="Plan alimentario base" class="form-textarea"></textarea>
        </div>
      </section>

      <button type="submit" class="submit-button">Guardar Consulta</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ConsultaNutricional',
  data() {
    return {
      form: {
  nombre: '', rut: '', edad: null, sexo: '', telefono: '', email: '', fecha: '',
  peso: null, altura: null, cintura: null, cadera: null, grasa: null,
  antecedentes: '', antecedente_familiar: '', antecedente_quirurgico: '', medicamento: '', alergia: '',
  habitos: '', alcohol: '', droga: '', tabaco: '', actividad_fisica: '',
  frecuencia: '', preferencias: '', registro24h: '',
  objetivos: '', diagnostico: '', recomendaciones: '', plan: '',
  asiste_con: '', hogar: '', vive_con: '', escolaridad: '', acc_vivienda: '', servicios_basicos: '',
  diuresis: '', deposiciones: '', frecuencia_bristol: '', sueno: '', sudoracion_nocturna: '', otros_signos: ''
},
      idFicha: null
    }
  },
  computed: {
    calcularIMC() { /* ... */ }
  },
  mounted() {
    // AQUÍ accede a la ruta así ⬇️
    this.idFicha = this.$route.params.id

    if (this.idFicha) {
      axios.get(`/api/fichas/${this.idFicha}`)
        .then(res => {
          this.form = { ...this.form, ...res.data }
        })
        .catch(() => {
          alert('No se pudo cargar la ficha.')
        })
    }
  },
  methods: {
    handleSubmit() {
      if (this.idFicha) {
        axios.put(`/api/fichas/${this.idFicha}`, this.form)
          .then(() => alert('Ficha actualizada con éxito'))
          .catch(() => alert('Error al actualizar ficha'))
      } else {
        axios.post('/api/fichas', this.form)
          .then(() => alert('Ficha creada con éxito'))
          .catch(() => alert('Error al crear ficha'))
      }
    }
  }
}

</script>
  <style scoped>
  .consulta-container {
    width: 100%;
    padding: 2rem;
    display: flex;
    justify-content: center;
  }
  
  .consulta-form {
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
  
  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .form-group {
    margin-bottom: 0.5rem;
  }
  
  .full-width {
    grid-column: span 2;
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
    border-color: #b35fc3;
    box-shadow: 0 0 0 3px rgba(179, 95, 195, 0.2);
  }
  
  .form-input.disabled {
    background-color: #f7fafc;
    color: #4a5568;
  }
  
  .form-textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    min-height: 100px;
    resize: vertical;
  }
  
  .form-textarea:focus {
    outline: none;
    border-color: #b35fc3;
    box-shadow: 0 0 0 3px rgba(179, 95, 195, 0.2);
  }
  
  .submit-button {
    width: 100%;
    padding: 1rem;
    background-color: #b35fc3;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1.1rem;
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
    .consulta-container {
      padding: 1rem;
    }
  
    .consulta-form {
      padding: 1.5rem;
      box-shadow: none;
    }
  
    .form-grid {
      grid-template-columns: 1fr;
    }
  
    .full-width {
      grid-column: span 1;
    }
  
    .form-title {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
    }
  
    .section-title {
      font-size: 1.1rem;
    }
  
    .submit-button {
      padding: 0.8rem;
    }
  }
  </style>