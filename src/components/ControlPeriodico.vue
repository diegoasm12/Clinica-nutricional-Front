<template>
  <div class="modal-overlay" @click.self="cerrarModal">
    <div class="modal-container">
      <div class="modal-header">
        <h3>Nuevo Control Periódico</h3>
        <button @click="cerrarModal" class="close-button">&times;</button>
      </div>
      
      <form @submit.prevent="guardarControl" class="control-form">
        <div class="form-group">
          <label>Fecha del control</label>
          <input v-model="control.fecha" type="date" required class="form-input">
        </div>
        
        <div class="form-group">
          <label>Peso (kg)</label>
          <input v-model.number="control.peso" type="number" step="0.1" required class="form-input">
        </div>
        
        <div class="form-group">
          <label>Altura (cm)</label>
          <input v-model.number="control.altura" type="number" step="0.1" required class="form-input">
        </div>
        
        <div class="form-group">
          <label>IMC (calculado)</label>
          <input :value="calcularIMC" disabled class="form-input disabled">
        </div>
        
        <div class="form-group">
          <label>Adherencia al tratamiento</label>
          <select v-model="control.adherencia" required class="form-input">
            <option value="">Seleccione...</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Observaciones</label>
          <textarea v-model="control.observaciones" required class="form-textarea" 
                   placeholder="Ej: Evolución del paciente, cambios observados..."></textarea>
        </div>
        
        <div class="form-group">
          <label>Plan de seguimiento</label>
          <textarea v-model="control.plan" required class="form-textarea" 
                   placeholder="Ej: Ajustes al plan alimentario, recomendaciones..."></textarea>
        </div>
        
        <div class="form-actions">
          <button type="button" @click="cerrarModal" class="cancel-button">
            Cancelar
          </button>
          <button type="submit" class="submit-button">
            Guardar Control
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fichaId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      control: {
        fichaId: this.fichaId,
        fecha: new Date().toISOString().substr(0, 10),
        peso: null,
        altura: null,
        imc: null,
        adherencia: '',
        observaciones: '',
        plan: ''
      }
    }
  },
  computed: {
    calcularIMC() {
      if (!this.control.peso || !this.control.altura) return '';
      const alturaM = this.control.altura / 100;
      return (this.control.peso / (alturaM * alturaM)).toFixed(2);
    }
  },
  methods: {
    cerrarModal() {
      this.$emit('cerrar');
    },
    async guardarControl() {
      if (!this.validarFormulario()) return;
      
      try {
        // Calcular IMC antes de guardar
        this.control.imc = this.calcularIMC;
        
        // Emitir el evento con los datos del control
        this.$emit('control-guardado', this.control);
        
        // Resetear el formulario
        this.control = {
          fichaId: this.fichaId,
          fecha: new Date().toISOString().substr(0, 10),
          peso: null,
          altura: null,
          imc: null,
          adherencia: '',
          observaciones: '',
          plan: ''
        };
        
      } catch (error) {
        console.error('Error al guardar control:', error);
        alert('Ocurrió un error al guardar el control');
      }
    },
    validarFormulario() {
      if (!this.control.fecha) {
        alert('Por favor ingrese la fecha del control');
        return false;
      }
      if (!this.control.peso || this.control.peso <= 0) {
        alert('Por favor ingrese un peso válido');
        return false;
      }
      if (!this.control.altura || this.control.altura <= 0) {
        alert('Por favor ingrese una altura válida');
        return false;
      }
      if (!this.control.adherencia) {
        alert('Por favor seleccione la adherencia al tratamiento');
        return false;
      }
      if (!this.control.observaciones) {
        alert('Por favor ingrese observaciones');
        return false;
      }
      if (!this.control.plan) {
        alert('Por favor ingrese un plan de seguimiento');
        return false;
      }
      return true;
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eaeaea;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.control-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
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
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-button {
  padding: 0.75rem 1.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover {
  background-color: #3e8e41;
}

.cancel-button {
  padding: 0.75rem 1.5rem;
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button:hover {
  background-color: #cbd5e0;
}

@media (max-width: 768px) {
  .modal-container {
    width: 95%;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .submit-button, .cancel-button {
    width: 100%;
  }
}
</style>