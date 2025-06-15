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
            v-model="form.email"
            placeholder="Correo electrónico"
            type="email"
            class="form-input"
          />
          <input
            v-model="form.telefono"
            placeholder="Teléfono"
            class="form-input"
          />
          <select v-model="form.sexo" required class="form-input">
            <option disabled value="">Sexo</option>
            <option>F</option>
            <option>M</option>
          </select>
          <input
            v-model="form.fechaNacimiento"
            type="date"
            class="form-input"
          />
        </div>
      </section>

      <!-- Anamnesis Social -->
      <section class="form-section">
        <h3 class="section-title">Anamnesis Social</h3>
        <div class="form-grid">
          <input
            v-model="form.asisteCon"
            placeholder="Asiste con..."
            class="form-input"
          />
          <input v-model="form.hijos" placeholder="Hijos" class="form-input" />
          <input
            v-model="form.viveCon"
            placeholder="Vive con..."
            class="form-input"
          />
          <input
            v-model="form.ocupacion"
            placeholder="Ocupación"
            class="form-input"
          />
          <input
            v-model="form.escolaridad"
            placeholder="Escolaridad"
            class="form-input"
          />
          <input
            v-model="form.redesDeApoyo"
            placeholder="Redes de apoyo"
            class="form-input"
          />
          <input
            v-model="form.serviciosBasicos"
            placeholder="Servicios básicos"
            class="form-input"
          />
        </div>
      </section>

      <!-- Anamnesis Alimentaria -->
      <section class="form-section">
        <h3 class="section-title">Anamnesis Alimentaria</h3>
        <div class="form-grid">
          <input
            v-model="form.alergiaIntolerancia"
            placeholder="Alergias e intolerancias"
            class="form-input"
          />
          <input
            v-model="form.alimentoNoGusta"
            placeholder="Alimentos que no le gustan"
            class="form-input"
          />
          <input
            v-model="form.alimentoPreferencia"
            placeholder="Alimentos preferidos"
            class="form-input"
          />
          <input
            v-model="form.cocinaEnCasa"
            placeholder="¿Cocina en casa?"
            class="form-input"
          />
          <input
            v-model="form.habitualmenteComeEn"
            placeholder="Habitualmente come en..."
            class="form-input"
          />
        </div>
      </section>

      <!-- Anamnesis Clínica -->
      <section class="form-section">
        <h3 class="section-title">Anamnesis Clínica</h3>
        <div class="form-grid">
          <input
            v-model="form.antecedenteFamiliar"
            placeholder="Antecedente familiar"
            class="form-input"
          />
          <input
            v-model="form.patologiaBase"
            placeholder="Patología base"
            class="form-input"
          />
          <input
            v-model="form.medicamento"
            placeholder="Medicamentos"
            class="form-input"
          />
          <input
            v-model="form.anetecedenteQuirurgico"
            placeholder="Antecedente quirúrgico"
            class="form-input"
          />
          <input
            v-model="form.alergia"
            placeholder="Alergias"
            class="form-input"
          />
        </div>
      </section>

      <!-- Signos y síntomas -->
      <section class="form-section">
        <h3 class="section-title">Signos y Síntomas</h3>
        <div class="form-grid">
          <input
            v-model="form.diuresis"
            placeholder="Diuresis"
            class="form-input"
          />
          <input
            v-model="form.apetito"
            placeholder="Apetito"
            class="form-input"
          />
          <input
            v-model="form.calambre"
            placeholder="Calambre"
            class="form-input"
          />
          <input
            v-model="form.polidipsia"
            placeholder="Polidipsia"
            class="form-input"
          />
          <input
            v-model="form.poliuria"
            placeholder="Poliuria"
            class="form-input"
          />
          <input
            v-model="form.deposicionBristol"
            placeholder="Deposición (Bristol)"
            class="form-input"
          />
          <input
            v-model="form.tinnitus"
            placeholder="Tinnitus"
            class="form-input"
          />
          <input
            v-model="form.sudoracionNocturna"
            placeholder="Sudoración nocturna"
            class="form-input"
          />
          <input
            v-model="form.polifagia"
            placeholder="Polifagia"
            class="form-input"
          />
          <input
            v-model="form.otroSigno"
            placeholder="Otro síntoma"
            class="form-input"
          />
        </div>
      </section>

      <!-- Hábitos -->
      <section class="form-section">
        <h3 class="section-title">Hábitos</h3>
        <div class="form-grid">
          <input
            v-model="form.alcohol"
            placeholder="Alcohol"
            class="form-input"
          />
          <input v-model="form.droga" placeholder="Drogas" class="form-input" />
          <input
            v-model="form.actividadFisica"
            placeholder="Actividad física"
            class="form-input"
          />
        </div>
      </section>

      <!-- TENDENCIA CONSUMO -->
      <section class="form-section">
        <h3 class="section-title">Encuesta de Tendencia de Consumo</h3>

        <div
          v-for="(item, index) in form.encuestaConsumo"
          :key="index"
          class="form-grid align-center"
        >
          <div class="form-group">
            <label>Alimento</label>
            <select v-model="item.fkAlimento_id" class="form-input" required>
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
            <label>Días por semana</label>
            <select
              v-model="item.cuantosDiasSemana"
              class="form-input"
              required
            >
              <option disabled value="">Seleccione días</option>
              <option v-for="n in 7" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>

          <div class="form-group full-width">
            <button
              type="button"
              @click="quitarAlimento(index)"
              class="submit-button"
              style="background: #e53e3e"
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
  mounted() {
    this.cargarAlimentos();
  },
  data() {
    return {
      alimentosDisponibles: [],
      form: {
        // Datos paciente
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

        // Anamnesis Alimentaria
        alergiaIntolerancia: "",
        alimentoNoGusta: "",
        alimentoPreferencia: "",
        cocinaEnCasa: "",
        habitualmenteComeEn: "",

        // Anamnesis Clínica
        antecedenteFamiliar: "",
        patologiaBase: "",
        medicamento: "",
        anetecedenteQuirurgico: "",
        alergia: "",

        // Signos y síntomas
        diuresis: "",
        apetito: "",
        calambre: "",
        polidipsia: "",
        poliuria: "",
        deposicionBristol: "",
        tinnitus: "",
        sudoracionNocturna: "",
        polifagia: "",
        otroSigno: "",

        // Hábitos
        alcohol: "",
        droga: "",
        actividadFisica: "",

        // Alimentos a enviar
        encuestaConsumo: [],
      },
    };
  },
  methods: {
    async cargarAlimentos() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_API_URL}/alimento`);
        this.alimentosDisponibles = res.data;
        console.log("alimentos", res);
      } catch (err) {
        console.error("Error cargando alimentos:", err);
      }
    },

    agregarAlimento() {
      this.form.encuestaConsumo.push({
        fkAlimento_id: "",
        cuantosDiasSemana: 1,
      });
    },

    quitarAlimento(index) {
      this.form.encuestaConsumo.splice(index, 1);
    },
    async handleSubmit() {
      try {
        const fechaFormateada = new Date(
          this.form.fechaNacimiento
        ).toISOString();

        // 1. Crear usuario
        const usuarioPayload = {
          rut: this.form.rut,
          nombre: this.form.nombre,
          correo: this.form.email,
          telefono: this.form.telefono,
          sexo: this.form.sexo,
          fechaNacimiento: fechaFormateada,
          rRolUsuario: { fkRol_id: 2 },
        };

        const resUsuario = await axios.post(
          `${process.env.VUE_APP_API_URL}/usuario`,
          usuarioPayload
        );
        const usuarioId = resUsuario.data.id;
        console.log("respuesta crear usuario", resUsuario);

        // 2. Crear anamnesis social
        const resAnamnesisSocial = await axios.post(
          `${process.env.VUE_APP_API_URL}/anamnesis-social`,
          {
            asisteCon: this.form.asisteCon,
            hijos: this.form.hijos,
            viveCon: this.form.viveCon,
            ocupacion: this.form.ocupacion,
            escolaridad: this.form.escolaridad,
            redesDeApoyo: this.form.redesDeApoyo,
            serviciosBasicos: this.form.serviciosBasicos,
          }
        );

        console.log("respuesta crear amanan social", resAnamnesisSocial);

        // 3. Crear anamnesis alimentaria
        const resAnamnesisAlimentaria = await axios.post(
          `${process.env.VUE_APP_API_URL}/anamnesis-alimentaria`,
          {
            alergiaIntolerancia: this.form.alergiaIntolerancia,
            alimentoNoGusta: this.form.alimentoNoGusta,
            alimentoPreferencia: this.form.alimentoPreferencia,
            cocinaEnCasa: this.form.cocinaEnCasa,
            habitualmenteComeEn: this.form.habitualmenteComeEn,
          }
        );
        console.log(
          "respuesta crear amanan alimentaria",
          resAnamnesisAlimentaria
        );

        // 4. Crear anamnesis clínica
        const resAnamnesisClinica = await axios.post(
          `${process.env.VUE_APP_API_URL}/anamnesis-clinica`,
          {
            antecedenteFamiliar: this.form.antecedenteFamiliar,
            patologiaBase: this.form.patologiaBase,
            medicamento: this.form.medicamento,
            anetecedenteQuirurgico: this.form.anetecedenteQuirurgico,
            alergia: this.form.alergia,
            signoSintoma: {
              diuresis: this.form.diuresis,
              apetito: this.form.apetito,
              calambre: this.form.calambre,
              polidipsia: this.form.polidipsia,
              poliuria: this.form.poliuria,
              deposicionBristol: this.form.deposicionBristol,
              tinitus: this.form.tinnitus,
              sudoracionNocturna: this.form.sudoracionNocturna,
              polifagia: this.form.polifagia,
              otro: this.form.otroSigno,
            },
            habito: {
              alcohol: this.form.alcohol,
              droga: this.form.droga,
              actividadFisica: this.form.actividadFisica,
            },
          }
        );

        console.log("respuesta crear amanan clinica", resAnamnesisClinica);

        // 5. Crear encuesta de tendencia consumo (esto ahora sí antes de la ficha)
        const encuestaPayload = {
          rEncuestaTendenciaConsumoAlimentos: this.form.encuestaConsumo.map(
            (item) => ({
              fkAlimento_id: item.fkAlimento_id,
              cuantosDiasSemana: item.cuantosDiasSemana.toString(),
            })
          ),
        };

        const resEncuesta = await axios.post(
          `${process.env.VUE_APP_API_URL}/encuesta-tendencia-consumo`,
          encuestaPayload
        );

        console.log("payload encuesta", encuestaPayload);
        console.log("respuesta crear encuesta alimentcia", resEncuesta);

        const encuestaId = resEncuesta.data.id;

        // 6. Finalmente crear la ficha incluyendo el id de encuesta
        const fichaPayload = {
          fkUsuario_id: usuarioId,
          fkAnamnesisSocial_id: resAnamnesisSocial.data.id,
          fkAnamnesisClinica_id: resAnamnesisClinica.data.id,
          fkAnamnesisAlimentaria_id: resAnamnesisAlimentaria.data.id,
          fkEncuestaTendenciaConsumo_id: encuestaId,
        };

        const resFicha = await axios.post(
          `${process.env.VUE_APP_API_URL}/ficha`,
          fichaPayload
        );

        console.log("payload ficha", fichaPayload);
        console.log("respuesta crear ficha", resFicha);
        alert("✅ Ficha creada correctamente");
      } catch (error) {
        console.error(error);
        alert("❌ Error al guardar");
      }
    },
  },
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
