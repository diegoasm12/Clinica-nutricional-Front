<template>
  <div class="consulta-container">
    <form @submit.prevent="handleSubmit" class="consulta-form">
      <h2 class="form-title">Consulta Nutricional</h2>

      <!-- 1. Datos del paciente -->
      <section class="form-section">
        <h3 class="section-title">Datos del paciente</h3>
        <div class="form-grid">
          <input
            v-model="form.nombre"
            placeholder="Nombre completo"
            required
            class="form-input"
          />
          <input
            v-model="form.rut"
            placeholder="RUT o ID"
            required
            class="form-input"
          />
          <input
            v-model.number="form.edad"
            type="number"
            placeholder="Edad"
            required
            class="form-input"
          />
          <select v-model="form.sexo" required class="form-input">
            <option disabled value="">Sexo</option>
            <option>F</option>
            <option>M</option>
          </select>
          <input
            v-model="form.telefono"
            placeholder="Teléfono"
            class="form-input"
          />
          <input
            v-model="form.email"
            placeholder="Correo electrónico"
            type="email"
            class="form-input"
          />
          <input
            v-model="form.fechaNacimiento"
            type="date"
            class="form-input"
          />
        </div>
      </section>

      <!-- 2. Anamnesis social -->
      <section class="form-section">
        <h3 class="section-title">Anamnesis Social</h3>
        <div class="form-grid">
          <input
            v-model="form.asiste_con"
            placeholder="Asiste con..."
            class="form-input"
          />
          <input
            v-model="form.hogar"
            placeholder="Descripción del hogar"
            class="form-input"
          />
          <input
            v-model="form.vive_con"
            placeholder="Vive con..."
            class="form-input"
          />
          <input
            v-model="form.escolaridad"
            placeholder="Escolaridad"
            class="form-input"
          />
          <input
            v-model="form.acc_vivienda"
            placeholder="Acceso a vivienda"
            class="form-input"
          />
          <input
            v-model="form.servicios_basicos"
            placeholder="Servicios básicos disponibles"
            class="form-input"
          />
        </div>
      </section>

      <!-- 3. Datos antropométricos -->
      <section class="form-section">
        <h3 class="section-title">Datos antropométricos</h3>
        <div class="form-grid">
          <input
            v-model.number="form.peso"
            placeholder="Peso (kg)"
            type="number"
            step="0.1"
            class="form-input"
          />
          <input
            v-model.number="form.altura"
            placeholder="Estatura (cm)"
            type="number"
            step="0.1"
            class="form-input"
          />
          <input
            :value="calcularIMC"
            placeholder="IMC (calculado)"
            disabled
            class="form-input disabled"
          />
          <input
            v-model.number="form.cintura"
            placeholder="Cintura (cm)"
            type="number"
            step="0.1"
            class="form-input"
          />
          <input
            v-model.number="form.cadera"
            placeholder="Cadera (cm)"
            type="number"
            step="0.1"
            class="form-input"
          />
          <input
            v-model.number="form.grasa"
            placeholder="% Grasa corporal (opcional)"
            type="number"
            step="0.1"
            class="form-input"
          />
        </div>
      </section>

      <!-- 4. Anamnesis clínica -->
      <section class="form-section">
        <h3 class="section-title">Anamnesis Clínica</h3>
        <div class="form-grid">
          <input
            v-model="form.antecedente_familiar"
            placeholder="Antecedente familiar"
            class="form-input"
          />
          <input
            v-model="form.medicamento"
            placeholder="Medicamentos que toma"
            class="form-input"
          />
          <input
            v-model="form.alergia"
            placeholder="Alergias conocidas"
            class="form-input"
          />
          <input
            v-model="form.antecedente_quirurgico"
            placeholder="Antecedentes quirúrgicos"
            class="form-input"
          />
        </div>
      </section>

      <!-- 5. Signos y síntomas -->
      <section class="form-section">
        <h3 class="section-title">Signos y Síntomas</h3>
        <div class="form-grid">
          <input
            v-model="form.diuresis"
            placeholder="Diuresis"
            class="form-input"
          />
          <input
            v-model="form.deposiciones"
            placeholder="Deposiciones"
            class="form-input"
          />
          <input
            v-model="form.frecuencia_bristol"
            placeholder="Frecuencia tipo Bristol"
            class="form-input"
          />
          <input
            v-model="form.sueno"
            placeholder="Calidad de sueño"
            class="form-input"
          />
          <input
            v-model="form.sudoracion_nocturna"
            placeholder="Sudoración nocturna"
            class="form-input"
          />
          <input
            v-model="form.otros_signos"
            placeholder="Otros signos y síntomas"
            class="form-input"
          />
        </div>
      </section>

      <!-- 6. Hábitos -->
      <section class="form-section">
        <h3 class="section-title">Hábitos</h3>
        <div class="form-grid">
          <input
            v-model="form.alcohol"
            placeholder="Consumo de alcohol"
            class="form-input"
          />
          <input
            v-model="form.droga"
            placeholder="Consumo de drogas"
            class="form-input"
          />
          <input
            v-model="form.tabaco"
            placeholder="Consumo de tabaco"
            class="form-input"
          />
          <input
            v-model="form.actividad_fisica"
            placeholder="Actividad física semanal"
            class="form-input"
          />
        </div>
      </section>

      <!-- 7. Evaluación dietética -->
      <section class="form-section">
        <h3 class="section-title">Evaluación Dietética</h3>
        <div class="form-grid">
          <textarea
            v-model="form.frecuencia"
            placeholder="Frecuencia de comidas"
            class="form-textarea"
          ></textarea>
          <textarea
            v-model="form.preferencias"
            placeholder="Preferencias y restricciones"
            class="form-textarea"
          ></textarea>
          <textarea
            v-model="form.registro24h"
            placeholder="Registro de 24 horas"
            class="form-textarea"
          ></textarea>
        </div>
      </section>

      <!-- 8. Objetivos y plan -->
      <section class="form-section">
        <h3 class="section-title">Objetivos y Plan Nutricional</h3>
        <div class="form-grid">
          <textarea
            v-model="form.objetivos"
            placeholder="Objetivos del paciente"
            class="form-textarea"
          ></textarea>
          <textarea
            v-model="form.diagnostico"
            placeholder="Diagnóstico nutricional"
            class="form-textarea"
          ></textarea>
          <textarea
            v-model="form.recomendaciones"
            placeholder="Recomendaciones iniciales"
            class="form-textarea"
          ></textarea>
          <textarea
            v-model="form.plan"
            placeholder="Plan alimentario base"
            class="form-textarea"
          ></textarea>
        </div>
      </section>
  <!-- 9. Encuesta de tendencia de consumo de alimentos -->
<section class="form-section">
  <h3 class="section-title">Encuesta de Tendencia de Consumo</h3>

  <div
    v-for="(item, index) in form.rEncuestaTendenciaConsumoAlimentos"
    :key="index"
    class="form-grid align-center"
    style="align-items: center"
  >
    <div class="form-group">
      <label class="form-label">Alimento</label>
      <select v-model="item.fkAlimento" class="form-input" required>
        <option disabled value="">Seleccione un alimento</option>
        <option
          v-for="alimento in alimentosDisponibles"
          :key="alimento.id"
          :value="alimento.id"
        >
          {{ alimento.alimento }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Días por semana</label>
      <select v-model="item.cuantosDiasSemana" class="form-input" required>
        <option disabled value="">Días</option>
        <option v-for="n in 7" :key="n" :value="n">{{ n }}</option>
      </select>
    </div>

    <div class="form-group full-width" style="margin-top: 0.5rem">
      <button
        type="button"
        @click="quitarAlimento(index)"
        class="submit-button"
        style="background-color: #e53e3e"
      >
        Quitar alimento
      </button>
    </div>
  </div>

  <button
    type="button"
    @click="agregarAlimento"
    class="submit-button"
    style="margin-top: 1rem"
  >
    + Agregar alimento
  </button>
</section>

      <button type="submit" class="submit-button">Guardar Consulta</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FichaClinica",
  data() {
    return {
      alimentosDisponibles: [],
      form: {
        rut: "",
        nombre: "",
        email: "",
        telefono: "",
        sexo: "",
        fechaNacimiento: "",

        // Anamnesis Social
        asisteCon: "",
        hijos: "",
        viveCon: "",
        ocupacion: "",
        escolaridad: "",
        redesDeApoyo: "",
        serviciosBasicos: "",

        // Anamnesis Clínica
        antecedenteFamiliar: "",
        patologiaBase: "",
        medicamento: "",
        antecedenteQuirurgico: "",
        alergia: "",

        // Signos y síntomas
        diuresis: "",
        deposiciones: "",
        frecuenciaBristol: "",
        sueno: "",
        sudoracionNocturna: "",
        otrosSignos: "",

        // Hábitos
        alcohol: "",
        droga: "",
        tabaco: "",
        actividadFisica: "",

        // Evaluación dietética
        frecuencia: "",
        preferencias: "",
        registro24h: "",

        // Objetivos y plan
        objetivos: "",
        diagnostico: "",
        recomendaciones: "",
        plan: "",

        // Datos antropométricos
        peso: null,
        altura: null,
        cintura: null,
        cadera: null,
        grasa: null,

        // Encuesta consumo
        rEncuestaTendenciaConsumoAlimentos: []
      },
    };
  },
  computed: {
    calcularIMC() {
      if (this.form.peso && this.form.altura) {
        const alturaEnMetros = this.form.altura / 100;
        return (this.form.peso / (alturaEnMetros ** 2)).toFixed(2);
      }
      return "";
    }
  },
  mounted() {
    this.cargarAlimentos();
  },
  methods: {
    async cargarAlimentos() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_API_URL}/alimento`)
        this.alimentosDisponibles = res.data;
      } catch (err) {
        console.error("❌ Error cargando alimentos:", err);
      }
    },

    agregarAlimento() {
      this.form.rEncuestaTendenciaConsumoAlimentos.push({
        fkAlimento: "",
        cuantosDiasSemana: 0
      });
    },

    quitarAlimento(index) {
      this.form.rEncuestaTendenciaConsumoAlimentos.splice(index, 1);
    },

    async handleSubmit() {
      try {
        const fecha = new Date(this.form.fechaNacimiento);
        if (isNaN(fecha.getTime())) {
          alert("❌ Fecha de nacimiento inválida. Usa formato AAAA-MM-DD");
          return;
        }
        const fechaFormateada = fecha.toISOString();

        const usuarioPayload = {
          rut: this.form.rut,
          nombre: this.form.nombre,
          correo: this.form.email,
          telefono: this.form.telefono,
          sexo: this.form.sexo,
          fechaNacimiento: fechaFormateada,
          rRolUsuario: {
            fkRol_id: 2,
          },
        };

        const resUsuario = await axios.post(
          `${process.env.VUE_APP_API_URL}/usuario`,
          usuarioPayload
        );
        const usuarioId = resUsuario.data.id;

        const anamnesisSocialPayload = {
          asisteCon: this.form.asisteCon,
          hijos: this.form.hijos,
          viveCon: this.form.viveCon,
          ocupacion: this.form.ocupacion,
          escolaridad: this.form.escolaridad,
          redesDeApoyo: this.form.redesDeApoyo,
          serviciosBasicos: this.form.serviciosBasicos,
        };

        const resAnamnesisSocial = await axios.post(
          `${process.env.VUE_APP_API_URL}/anamnesis-social`,
          anamnesisSocialPayload
        );
        const anamnesisSocialId = resAnamnesisSocial.data.id;

        const anamnesisClinicaPayload = {
          antecedenteFamiliar: this.form.antecedenteFamiliar,
          patologiaBase: this.form.patologiaBase,
          medicamento: this.form.medicamento,
          antecedenteQuirurgico: this.form.antecedenteQuirurgico,
          alergia: this.form.alergia,
          signoSintoma: {
            diuresis: this.form.diuresis,
            deposicionBristol: this.form.frecuenciaBristol,
            sueno: this.form.sueno,
            sudoracionNocturna: this.form.sudoracionNocturna,
            otro: this.form.otrosSignos,
          },
          habito: {
            alcohol: this.form.alcohol,
            droga: this.form.droga,
            tabaco: this.form.tabaco,
            actividadFisica: this.form.actividadFisica,
          }
        };

        const resAnamnesisClinica = await axios.post(
          `${process.env.VUE_APP_API_URL}/anamnesis-clinica`,
          anamnesisClinicaPayload
        );
        const anamnesisClinicaId = resAnamnesisClinica.data.id;

        const alimentariaPayload = {
          frecuencia: this.form.frecuencia,
          preferencias: this.form.preferencias,
          registro24h: this.form.registro24h
        };

        const resAlimentaria = await axios.post(
          `${process.env.VUE_APP_API_URL}/anamnesis-alimentaria`,
          alimentariaPayload
        );
        const alimentariaId = resAlimentaria.data.id;

        const encuestaPayload = {
          alimentos: this.form.rEncuestaTendenciaConsumoAlimentos.map((item) => ({
            fkAlimento: { id: item.fkAlimento },
            cuantosDiasSemana: item.cuantosDiasSemana
          }))
        };

        const resEncuesta = await axios.post(
          `${process.env.VUE_APP_API_URL}/encuesta-tendencia-consumo`,
          encuestaPayload
        );
        const encuestaId = resEncuesta.data.id;

        const fichaPayload = {
          fkUsuario_id: usuarioId,
          fkAnamnesisSocial_id: anamnesisSocialId,
          fkAnamnesisClinica_id: anamnesisClinicaId,
          fkAnamnesisAlimentaria_id: alimentariaId,
          fkEncuestaTendenciaConsumo_id: encuestaId
        };

        const resFicha = await axios.post(
          `${process.env.VUE_APP_API_URL}/ficha`,
          fichaPayload
        );

        console.log("✅ Ficha creada correctamente:", resFicha.data);
        alert("✅ Ficha creada con éxito");
      } catch (error) {
        console.error("❌ Error al crear ficha:", error.response?.data || error.message);
        alert("❌ Error al crear ficha. Revisa consola para más detalles.");
      }
    }
  }
};
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
