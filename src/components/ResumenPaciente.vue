<template>
  <div>
    <div class="modal-overlay" @click.self="cerrar">
      <div class="modal-contenido">
        <div class="modal-header">
          <h2>Resumen del Paciente</h2>
          <button @click="cerrar" class="boton-cerrar">&times;</button>
        </div>
        
        <div class="modal-body">
          <div class="info-paciente">
            <h3>{{ paciente.nombre }}</h3>
            <p>RUT: {{ paciente.rut }}</p>
          </div>
          
          <div class="datos-clave">
            <div class="dato-clave">
              <span class="dato-titulo">Peso actual</span>
              <span class="dato-valor">{{ paciente.peso }} kg</span>
              <span class="dato-tendencia" :class="tendenciaPeso.clase">
                {{ tendenciaPeso.texto }}
              </span>
            </div>
            
            <div class="dato-clave">
              <span class="dato-titulo">IMC</span>
              <span class="dato-valor">{{ paciente.imc }}</span>
              <span class="dato-clasificacion">{{ clasificacionIMC }}</span>
            </div>
            
            <div class="dato-clave">
              <span class="dato-titulo">Diagnóstico</span>
              <span class="dato-valor">{{ paciente.diagnostico }}</span>
            </div>
            
            <div class="dato-clave">
              <span class="dato-titulo">Último control</span>
              <span class="dato-valor">{{ formatoFecha(paciente.ultimaVisita) }}</span>
            </div>
          </div>
          
          <div class="grafico-evolucion">
            <h4>Evolución de peso</h4>
            <div class="grafico-placeholder">
              <!-- Aquí iría un gráfico real en implementación completa -->
              <p>Gráfico de evolución de peso</p>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="cerrar" class="boton-secundario">Cerrar</button>
          <button @click="abrirHistorial" class="boton-primario">Ver Historial Completo</button>
        </div>
      </div>
    </div>
    
    <HistorialClinico 
      v-if="mostrarHistorial"
      :paciente-id="paciente.id"
      @cerrar="cerrarHistorial"
    />
  </div>
</template>

<script>
import HistorialClinico from '@/components/HistorialClinico.vue';

export default {
  components: {
    HistorialClinico
  },
  props: {
    paciente: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      mostrarHistorial: false
    }
  },
  computed: {
    tendenciaPeso() {
      if (!this.paciente.historial || this.paciente.historial.length < 2) {
        return { texto: 'Sin datos previos', clase: 'neutral' };
      }
      
      const ultimoPeso = this.paciente.peso;
      const penultimoPeso = this.paciente.historial[1].peso;
      const diferencia = ultimoPeso - penultimoPeso;
      
      if (diferencia > 0) {
        return { texto: `+${diferencia.toFixed(1)} kg`, clase: 'aumento' };
      } else if (diferencia < 0) {
        return { texto: `${diferencia.toFixed(1)} kg`, clase: 'disminucion' };
      } else {
        return { texto: 'Sin cambio', clase: 'neutral' };
      }
    },
    clasificacionIMC() {
      const imc = parseFloat(this.paciente.imc);
      if (!imc) return 'No calculado';
      
      if (imc < 18.5) return 'Bajo peso';
      if (imc < 25) return 'Normal';
      if (imc < 30) return 'Sobrepeso';
      if (imc < 35) return 'Obesidad I';
      if (imc < 40) return 'Obesidad II';
      return 'Obesidad III';
    }
  },
  methods: {
    formatoFecha(fecha) {
      return new Date(fecha).toLocaleDateString('es-CL');
    },
    cerrar() {
      this.$emit('cerrar');
    },
    abrirHistorial() {
      this.mostrarHistorial = true;
    },
    cerrarHistorial() {
      this.mostrarHistorial = false;
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
  z-index: 1000;
}

.modal-contenido {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

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
  z-index: 1000;
}

.modal-contenido {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 700px;
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

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
}

.boton-cerrar {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
}

.boton-cerrar:hover {
  color: #333;
}

.modal-body {
  padding: 1.5rem;
}

.info-paciente h3 {
  margin: 0 0 0.5rem;
  color: #2c3e50;
  font-size: 1.3rem;
}

.info-paciente p {
  margin: 0;
  color: #718096;
}

.datos-clave {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
}

.dato-clave {
  background-color: #f7fafc;
  border-radius: 6px;
  padding: 1rem;
  border-left: 4px solid #4299e1;
}

.dato-titulo {
  display: block;
  font-size: 0.85rem;
  color: #718096;
  margin-bottom: 0.5rem;
}

.dato-valor {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.dato-tendencia, .dato-clasificacion {
  display: block;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.dato-tendencia.aumento {
  color: #e53e3e;
}

.dato-tendencia.disminucion {
  color: #38a169;
}

.dato-tendencia.neutral {
  color: #718096;
}

.dato-clasificacion {
  color: #4a5568;
  font-weight: 500;
}

.grafico-evolucion {
  margin-top: 2rem;
}

.grafico-evolucion h4 {
  margin: 0 0 1rem;
  color: #4a5568;
}

.grafico-placeholder {
  height: 200px;
  background-color: #f7fafc;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #eaeaea;
}

.boton-primario {
  padding: 0.75rem 1.5rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.boton-primario:hover {
  background-color: #3182ce;
}

.boton-secundario {
  padding: 0.75rem 1.5rem;
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.boton-secundario:hover {
  background-color: #cbd5e0;
}

@media (max-width: 768px) {
  .datos-clave {
    grid-template-columns: 1fr;
  }
  
  .modal-footer {
    flex-direction: column-reverse;
  }
  
  .boton-primario, .boton-secundario {
    width: 100%;
  }
}
</style>