<template>
  <div>
    <div class="busqueda-container">
      <div class="search-header">
        <h2 class="section-title">Búsqueda de Fichas Nutricionales</h2>
        <div class="search-box">
          <input 
            v-model="searchTerm" 
            @keyup.enter="buscarFichas" 
            placeholder="Buscar por RUT o nombre del paciente" 
            class="search-input"
          />
          <button @click="buscarFichas" class="search-button">Buscar</button>
        </div>
      </div>
      
      <!-- Filtros adicionales -->
      <div class="filters-section">
        <div class="filter-group">
          <label>Ordenar por:</label>
          <select v-model="sortBy" class="filter-select">
            <option value="fecha">Fecha (más reciente)</option>
            <option value="nombre">Nombre</option>
            <option value="rut">RUT</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Estado:</label>
          <select v-model="filtroEstado" class="filter-select">
            <option value="todos">Todos</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
        </div>
      </div>
      
      <!-- Resultados de la búsqueda -->
      <div v-if="loading" class="loading">
        <p>Cargando fichas...</p>
      </div>
      
      <div v-else-if="fichas.length === 0" class="no-results">
        <p>No se encontraron fichas. Intente con otra búsqueda.</p>
      </div>
      
      <div v-else class="results-section">
        <h3 class="results-title">{{ fichas.length }} resultados encontrados</h3>
        
        <div class="fichas-grid">
          <div v-for="ficha in fichasOrdenadas" :key="ficha.id" class="ficha-card" :class="{ 'inactivo': ficha.estado === 'inactivo' }">
            <div class="ficha-header">
              <h3>{{ ficha.nombre }}</h3>
              <span class="estado-badge" :class="ficha.estado">{{ ficha.estado === 'activo' ? 'Activo' : 'Inactivo' }}</span>
            </div>
            
            <div class="ficha-info">
              <p><strong>RUT:</strong> {{ ficha.rut }}</p>
              <p><strong>Edad:</strong> {{ ficha.edad }} años</p>
              <p><strong>Última consulta:</strong> {{ formatDate(ficha.fecha) }}</p>
              <p><strong>IMC actual:</strong> {{ ficha.imc }}</p>
            </div>
            
            <div class="ficha-actions">
              <button @click="verDetalle(ficha.id)" class="action-button view">Ver detalles</button>
              <button @click="nuevaConsulta(ficha.id)" class="action-button primary">Nueva consulta</button>
            </div>
          </div>
        </div>
        
        <!-- Paginación -->
        <div class="pagination">
          <button 
            @click="cambiarPagina(paginaActual - 1)" 
            :disabled="paginaActual === 1" 
            class="pagination-button"
          >
            Anterior
          </button>
          <span class="pagination-info">Página {{ paginaActual }} de {{ totalPaginas }}</span>
          <button 
            @click="cambiarPagina(paginaActual + 1)" 
            :disabled="paginaActual === totalPaginas" 
            class="pagination-button"
          >
            Siguiente
          </button>
        </div>
      </div>
      
      <!-- Modal detalle ficha -->
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Ficha de {{ fichaSeleccionada.nombre }}</h2>
            <button @click="closeModal" class="close-button">&times;</button>
          </div>
          
          <div class="modal-body">
            <div class="detalle-section">
              <h3>Datos Personales</h3>
              <div class="detalle-grid">
                <p><strong>RUT:</strong> {{ fichaSeleccionada.rut }}</p>
                <p><strong>Edad:</strong> {{ fichaSeleccionada.edad }} años</p>
                <p><strong>Sexo:</strong> {{ fichaSeleccionada.sexo }}</p>
                <p><strong>Teléfono:</strong> {{ fichaSeleccionada.telefono }}</p>
                <p><strong>Email:</strong> {{ fichaSeleccionada.email }}</p>
              </div>
            </div>
            
            <div class="detalle-section">
              <h3>Historial de Consultas</h3>
              <div v-if="fichaSeleccionada.historial && fichaSeleccionada.historial.length">
                <div v-for="(consulta, index) in fichaSeleccionada.historial" :key="index" class="consulta-item">
                  <div class="consulta-header">
                    <h4>Consulta {{ formatDate(consulta.fecha) }}</h4>
                    <span class="consulta-tag">{{ consulta.tipo || 'Control' }}</span>
                  </div>
                  <div class="consulta-datos">
                    <p><strong>Peso:</strong> {{ consulta.peso }} kg</p>
                    <p><strong>Altura:</strong> {{ consulta.altura }} cm</p>
                    <p><strong>IMC:</strong> {{ consulta.imc }}</p>
                  </div>
                  <div class="consulta-notas">
                    <p><strong>Observaciones:</strong> {{ consulta.observaciones }}</p>
                    <p><strong>Plan:</strong> {{ consulta.plan }}</p>
                  </div>
                </div>
              </div>
              <div v-else class="no-data">
                <p>No hay consultas registradas.</p>
              </div>
            </div>

            <div class="detalle-section">
              <h3>Archivos Adjuntos</h3>
              <div class="archivos-container">
                <div class="subir-archivo">
                  <input 
                    type="file" 
                    id="fileInput" 
                    ref="fileInput" 
                    @change="handleFileUpload" 
                    multiple 
                    style="display: none"
                  >
                  <button @click="triggerFileInput" class="upload-button">
                    <i class="fas fa-cloud-upload-alt"></i> Subir Archivos
                  </button>
                  <span class="upload-hint">Formatos permitidos: PDF, JPG, PNG, DOCX (Max. 10MB)</span>
                </div>
                
                <div v-if="archivosCargando" class="loading-files">
                  <p>Cargando archivos...</p>
                </div>
                
                <div v-else-if="archivos.length === 0" class="no-files">
                  <p>No hay archivos adjuntos</p>
                </div>
                
                <div v-else class="archivos-list">
                  <div v-for="(archivo, index) in archivos" :key="index" class="archivo-item">
                    <div class="archivo-info">
                      <i :class="getFileIcon(archivo.tipo)"></i>
                      <span class="archivo-nombre">{{ archivo.nombre }}</span>
                      <span class="archivo-fecha">{{ formatDate(archivo.fecha) }}</span>
                      <span class="archivo-tamano">{{ formatFileSize(archivo.tamano) }}</span>
                    </div>
                    <div class="archivo-acciones">
                      <button @click="descargarArchivo(archivo)" class="action-button small">
                        <i class="fas fa-download"></i>
                      </button>
                      <button @click="previsualizarArchivo(archivo)" class="action-button small">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button @click="eliminarArchivo(archivo.id)" class="action-button small danger">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="detalle-section">
              <h3>Exportación de archivos</h3>
                <div class="botones-container">
                  <button @click="exportarPlan(fichaSeleccionada.id)" class="action-button primary">Exportar plan alimenticio</button>
                  <button @click="exportaFicha(fichaSeleccionada.id)" class="action-button primary" style="margin-left: 10px;">Exportar ficha</button>
                </div>
            </div>
          </div>

          
          
          <div class="modal-footer">
            <button @click="nuevaConsulta(fichaSeleccionada.id)" class="action-button primary">Nueva consulta</button>
            <button @click="editarFicha(fichaSeleccionada.id)" class="action-button secondary">Editar ficha</button>
            <button @click="eliminarFicha(fichaSeleccionada.id)" class="action-button danger">Eliminar ficha</button>
            <button @click="mostrarControlPeriodico = true" class="action-button control">Agregar control periódico</button>
            <button @click="mostrarHistorial = true" class="action-button history">Ver Historial Clínico</button>
            <button @click="closeModal" class="action-button cancel">Cerrar</button>
          </div>
        </div>
      </div>

      <ControlPeriodico 
        v-if="mostrarControlPeriodico"
        :ficha-id="fichaSeleccionada.id" 
        @control-guardado="actualizarControles"
        @cerrar="mostrarControlPeriodico = false"
      />
      <HistorialClinico 
        v-if="mostrarHistorial"
        :paciente-id="fichaSeleccionada.id"
        @cerrar="mostrarHistorial = false"
      />
    </div>
  </div>
</template>

<script>
import ControlPeriodico from './ControlPeriodico.vue';
import HistorialClinico from '@/components/HistorialClinico.vue';

export default {
  name: 'BusquedaFichas',
  components: {
    ControlPeriodico,
    HistorialClinico
  },
  data() {
    return {
      searchTerm: '',
      loading: false,
      fichas: [],
      sortBy: 'fecha',
      filtroEstado: 'todos',
      paginaActual: 1,
      itemsPorPagina: 6,
      showModal: false,
      fichaSeleccionada: {},
      mostrarControlPeriodico: false,
      mostrarHistorial: false,
      archivos: [],
      archivosCargando: false
    }
  },
  computed: {
    fichasFiltradas() {
      let resultado = [...this.fichas]
      
      // Filtro por estado
      if (this.filtroEstado !== 'todos') {
        resultado = resultado.filter(ficha => ficha.estado === this.filtroEstado)
      }
      
      return resultado
    },
    fichasOrdenadas() {
      let resultado = [...this.fichasFiltradas]
      
      // Ordenamiento
      if (this.sortBy === 'fecha') {
        resultado.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      } else if (this.sortBy === 'nombre') {
        resultado.sort((a, b) => a.nombre.localeCompare(b.nombre))
      } else if (this.sortBy === 'rut') {
        resultado.sort((a, b) => a.rut.localeCompare(b.rut))
      }
      
      // Paginación
      const inicio = (this.paginaActual - 1) * this.itemsPorPagina
      const fin = inicio + this.itemsPorPagina
      
      return resultado.slice(inicio, fin)
    },
    totalPaginas() {
      return Math.ceil(this.fichasFiltradas.length / this.itemsPorPagina)
    }
  },
  mounted() {
    this.cargarDatosEjemplo();
    // Simular carga de archivos existentes
    this.archivosCargando = true;
    setTimeout(() => {
      this.archivos = [
        {
          id: 1,
          nombre: 'Analisis_sangre.pdf',
          tipo: 'application/pdf',
          tamano: 245760,
          fecha: '2023-05-15',
          url: '#'
        },
        {
          id: 2,
          nombre: 'Receta_medica.docx',
          tipo: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          tamano: 512000,
          fecha: '2023-06-20',
          url: '#'
        },
        {
          id: 3,
          nombre: 'Foto_progreso.jpg',
          tipo: 'image/jpeg',
          tamano: 1024000,
          fecha: '2023-07-10',
          url: '#'
        }
      ];
      this.archivosCargando = false;
    }, 1000);
  },
  methods: {
    buscarFichas() {
      this.loading = true
      
      // Simulamos una búsqueda en base de datos
      setTimeout(() => {
        if (this.searchTerm) {
          this.fichas = this.fichas.filter(ficha => 
            ficha.rut.includes(this.searchTerm) || 
            ficha.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
          )
        } else {
          // Si no hay término de búsqueda, recargamos todos los datos
          this.cargarDatosEjemplo()
        }
        
        this.paginaActual = 1
        this.loading = false
      }, 500)
    },
    cargarDatosEjemplo() {
      // Datos de ejemplo para mostrar la funcionalidad
      this.fichas = [
        {
          id: 1,
          nombre: 'Juan Pérez González',
          rut: '12.345.678-9',
          edad: 35,
          sexo: 'Masculino',
          telefono: '+56 9 1234 5678',
          email: 'juan.perez@ejemplo.com',
          fecha: '2023-04-15',
          imc: '24.5',
          estado: 'activo',
          historial: [
            {
              fecha: '2023-04-15',
              peso: 78.5,
              altura: 179,
              imc: 24.5,
              observaciones: 'Paciente con buena adherencia al plan. Se observa disminución de peso respecto a la consulta anterior.',
              plan: 'Seguir con plan de alimentación balanceado. Incrementar la actividad física a 4 días por semana.'
            },
            {
              fecha: '2023-02-10',
              peso: 80.2,
              altura: 179,
              imc: 25.0,
              observaciones: 'Paciente refiere ansiedad por alimentos dulces en las tardes.',
              plan: 'Ajuste de plan alimentario incluyendo colaciones saludables para controlar ansiedad.'
            }
          ]
        },
        {
          id: 2,
          nombre: 'María Fernández López',
          rut: '18.765.432-1',
          edad: 28,
          sexo: 'Femenino',
          telefono: '+56 9 8765 4321',
          email: 'maria.fernandez@ejemplo.com',
          fecha: '2023-05-20',
          imc: '22.1',
          estado: 'activo',
          historial: [
            {
              fecha: '2023-05-20',
              peso: 58.3,
              altura: 162,
              imc: 22.1,
              observaciones: 'Paciente busca mejorar hábitos alimentarios. Sin patologías de base.',
              plan: 'Plan alimentario de 1800 kcal con distribución adecuada de macronutrientes.'
            }
          ]
        },
        {
          id: 3,
          nombre: 'Roberto Soto Mendoza',
          rut: '9.876.543-2',
          edad: 45,
          sexo: 'Masculino',
          telefono: '+56 9 5432 1098',
          email: 'roberto.soto@ejemplo.com',
          fecha: '2023-03-05',
          imc: '27.8',
          estado: 'inactivo',
          historial: [
            {
              fecha: '2023-03-05',
              peso: 85.4,
              altura: 175,
              imc: 27.8,
              observaciones: 'Paciente con sobrepeso y presión arterial elevada. Requiere reducción de sodio en la dieta.',
              plan: 'Plan DASH modificado con restricción de sodio y control de carbohidratos refinados.'
            },
            {
              fecha: '2023-01-15',
              peso: 87.2,
              altura: 175,
              imc: 28.4,
              observaciones: 'Evaluación inicial. Paciente con antecedentes familiares de hipertensión.',
              plan: 'Plan alimentario hipocalórico con reducción moderada de sodio.'
            }
          ]
        },
        {
          id: 4,
          nombre: 'Laura Gutiérrez Vega',
          rut: '14.852.963-7',
          edad: 31,
          sexo: 'Femenino',
          telefono: '+56 9 7485 2369',
          email: 'laura.gutierrez@ejemplo.com',
          fecha: '2023-06-10',
          imc: '20.8',
          estado: 'activo',
          historial: [
            {
              fecha: '2023-06-10',
              peso: 54.1,
              altura: 161,
              imc: 20.8,
              observaciones: 'Paciente vegetariana que busca mejorar su composición corporal y aumentar masa muscular.',
              plan: 'Plan vegetariano con adecuada ingesta proteica y suplementación de B12.'
            }
          ]
        },
        {
          id: 5,
          nombre: 'Carlos Muñoz Rojas',
          rut: '16.357.159-5',
          edad: 42,
          sexo: 'Masculino',
          telefono: '+56 9 3571 5980',
          email: 'carlos.munoz@ejemplo.com',
          fecha: '2023-02-25',
          imc: '30.2',
          estado: 'activo',
          historial: [
            {
              fecha: '2023-02-25',
              peso: 96.5,
              altura: 179,
              imc: 30.2,
              tipo: 'Primera evaluación',
              observaciones: 'Paciente con obesidad grado I y resistencia a la insulina.',
              plan: 'Plan de alimentación con control de índice glicémico y porciones.'
            }
          ]
        },
        {
          id: 6,
          nombre: 'Ana López Silva',
          rut: '19.753.159-8',
          edad: 25,
          sexo: 'Femenino',
          telefono: '+56 9 1598 7532',
          email: 'ana.lopez@ejemplo.com',
          fecha: '2023-05-05',
          imc: '19.5',
          estado: 'activo',
          historial: [
            {
              fecha: '2023-05-05',
              peso: 50.2,
              altura: 160,
              imc: 19.5,
              observaciones: 'Paciente busca mejorar alimentación para rendimiento deportivo (runner).',
              plan: 'Plan de alimentación adaptado a sus necesidades deportivas con distribución adecuada de macros.'
            }
          ]
        },
        {
          id: 7,
          nombre: 'Daniel Castro Bravo',
          rut: '15.987.654-3',
          edad: 38,
          sexo: 'Masculino',
          telefono: '+56 9 8765 4321',
          email: 'daniel.castro@ejemplo.com',
          fecha: '2023-01-30',
          imc: '26.4',
          estado: 'inactivo',
          historial: [
            {
              fecha: '2023-01-30',
              peso: 82.5,
              altura: 177,
              imc: 26.4,
              observaciones: 'Paciente con antecedentes de colesterol elevado. Busca mejorar su perfil lipídico.',
              plan: 'Plan alimentario con control de grasas saturadas y aumento de ácidos grasos omega 3.'
            }
          ]
        }
      ]
    },
    formatDate(dateString) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
      return new Date(dateString).toLocaleDateString('es-CL', options)
    },
    cambiarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina
      }
    },
    verDetalle(id) {
      const ficha = this.fichas.find(f => f.id === id)
      if (ficha) {
        this.fichaSeleccionada = { ...ficha }
        this.showModal = true
      }
    },
    closeModal() {
      this.showModal = false
    },
    nuevaConsulta(id) {
      alert(`Redirigiendo a nueva consulta para paciente ID: ${id}`)
    },
    editarFicha(id) {
      alert(`Editando ficha del paciente ID: ${id}`)
    },
    eliminarFicha(id) {
      alert(`borrando ficha del paciente ID: ${id}`)
    },
    exportarPlan(id) {
      alert(`Exportando plan alimenticio de ficha con ID: ${id}`)
    },
    exportarFicha(id) {
      alert(`Exportando ficha con ID: ${id}`)
    },
    actualizarControles(nuevoControl) {
      if (!this.fichaSeleccionada.historial) {
        this.fichaSeleccionada.historial = [];
      }
      this.fichaSeleccionada.historial.push(nuevoControl);
      this.mostrarControlPeriodico = false;
    },
    // Métodos para manejo de archivos
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const files = event.target.files;
      if (files.length > 0) {
        this.subirArchivos(files);
      }
    },
    async subirArchivos(files) {
      this.archivosCargando = true;
      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          
          if (file.size > 10 * 1024 * 1024) {
            alert(`El archivo ${file.name} excede el tamaño máximo de 10MB`);
            continue;
          }
          
          const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
          if (!validTypes.includes(file.type)) {
            alert(`El formato de ${file.name} no está permitido`);
            continue;
          }
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          this.archivos.push({
            id: Date.now() + i,
            nombre: file.name,
            tipo: file.type,
            tamano: file.size,
            fecha: new Date().toISOString(),
            url: URL.createObjectURL(file)
          });
        }
      } catch (error) {
        console.error('Error al subir archivos:', error);
        alert('Error al subir archivos');
      } finally {
        this.archivosCargando = false;
        this.$refs.fileInput.value = '';
      }
    },
    descargarArchivo(archivo) {
      const link = document.createElement('a');
      link.href = archivo.url;
      link.download = archivo.nombre;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    previsualizarArchivo(archivo) {
      if (archivo.tipo.includes('image')) {
        window.open(archivo.url, '_blank');
      } else if (archivo.tipo === 'application/pdf') {
        window.open(archivo.url, '_blank');
      } else {
        alert('Vista previa no disponible para este tipo de archivo');
      }
    },
    async eliminarArchivo(id) {
      if (confirm('¿Está seguro que desea eliminar este archivo?')) {
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          this.archivos = this.archivos.filter(a => a.id !== id);
        } catch (error) {
          console.error('Error al eliminar archivo:', error);
          alert('Error al eliminar archivo');
        }
      }
    },
    getFileIcon(tipo) {
      if (tipo.includes('image')) return 'fas fa-file-image';
      if (tipo === 'application/pdf') return 'fas fa-file-pdf';
      if (tipo.includes('word')) return 'fas fa-file-word';
      return 'fas fa-file';
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
  }
}
</script>

<style scoped>
.busqueda-container {
  width: 100%;
  padding: 2rem;
  background-color: #f9fafc;
}

.search-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-title {
  color: #2c3e50;
  font-size: 1.8rem;
  margin: 0;
}

.botones-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 768px) {
  .botones-container {
    flex-direction: column;
  }
}

.search-box {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #b35fc3;
  box-shadow: 0 0 0 3px rgba(179, 95, 195, 0.2);
}

.search-button {
  background-color: #b35fc3;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  background-color: #9e4fb0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.filters-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 500;
  color: #4a5568;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: white;
}

.results-title {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 1rem;
}

.fichas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.ficha-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.ficha-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.ficha-card.inactivo {
  opacity: 0.7;
  border-left: 4px solid #cbd5e0;
}

.ficha-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.ficha-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.estado-badge {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  font-weight: 600;
}

.estado-badge.activo {
  background-color: #c6f6d5;
  color: #276749;
}

.estado-badge.inactivo {
  background-color: #e2e8f0;
  color: #4a5568;
}

.ficha-info {
  margin-bottom: 1rem;
}

.ficha-info p {
  margin: 0.25rem 0;
  color: #4a5568;
}

.ficha-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.action-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button.view {
  background-color: #e2e8f0;
  color: #2c3e50;
}

.action-button.view:hover {
  background-color: #cbd5e0;
}

.action-button.primary {
  background-color: #b35fc3;
  color: white;
}

.action-button.primary:hover {
  background-color: #9e4fb0;
}

.action-button.secondary {
  background-color: #4299e1;
  color: white;
}

.action-button.secondary:hover {
  background-color: #3182ce;
}

.action-button.danger {
  background-color: red;
  color: white;
}

.action-button.danger:hover {
  background-color: red;
}

.action-button.history {
  background-color: #6b46c1;
  color: white;
}

.action-button.history:hover {
  background-color: #553c9a;
}

.action-button.control {
  background-color: green;
  color: white;
}

.action-button.danger:hover {
  background-color: green;
}

.action-button.cancel {
  background-color: #e2e8f0;
  color: #4a5568;
}

.action-button.cancel:hover {
  background-color: #cbd5e0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-button {
  padding: 0.5rem 1rem;
  background-color: #e2e8f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-button:hover:not(:disabled) {
  background-color: #cbd5e0;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  color: #4a5568;
}

.loading, .no-results {
  text-align: center;
  padding: 2rem;
  color: #4a5568;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #4a5568;
}

.modal-body {
  padding: 1.5rem;
}

.detalle-section {
  margin-bottom: 2rem;
}

.detalle-section h3 {
  color: #4a5568;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.detalle-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.consulta-item {
  background-color: #f7fafc;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.consulta-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.consulta-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 1rem;
}

.consulta-tag {
  background-color: #ebf4ff;
  color: #4299e1;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
}

.consulta-datos {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.consulta-datos p {
  margin: 0;
}

.consulta-notas p {
  margin: 0.5rem 0;
}

.no-data {
  color: #718096;
  font-style: italic;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

/* Estilos para la nueva sección de archivos */
.archivos-container {
  background-color: #f7fafc;
  border-radius: 8px;
  padding: 1.5rem;
}

.subir-archivo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.upload-button {
  padding: 0.75rem 1.5rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-start;
}

.upload-button:hover {
  background-color: #3182ce;
}

.upload-button i {
  margin-right: 0.5rem;
}

.upload-hint {
  font-size: 0.85rem;
  color: #718096;
}

.loading-files, .no-files {
  text-align: center;
  padding: 1rem;
  color: #718096;
}

.archivos-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.archivo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 6px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.archivo-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;
}

.archivo-info i {
  font-size: 1.25rem;
  color: #4a5568;
  min-width: 24px;
}

.archivo-nombre {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #2c3e50;
}

.archivo-fecha, .archivo-tamano {
  font-size: 0.85rem;
  color: #718096;
  white-space: nowrap;
  margin-left: 1rem;
}

.archivo-acciones {
  display: flex;
  gap: 0.5rem;
}

.action-button.small {
  padding: 0.5rem;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-button.small i {
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .busqueda-container {
    padding: 1rem;
  }
  
  .search-box {
    flex-direction: column;
  }
  
  .filters-section {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .filter-select {
    width: 100%;
  }
  
  .fichas-grid {
    grid-template-columns: 1fr;
  }
  
  .detalle-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    width: 95%;
    max-height: 95vh;
  }
  
  .modal-footer {
    flex-wrap: wrap;
  }
  
  .action-button {
    flex: 1;
    text-align: center;
  }

  .archivo-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .archivo-fecha, .archivo-tamano {
    margin-left: 0;
  }
  
  .archivo-item {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  
  .archivo-acciones {
    justify-content: flex-end;
  }
}
</style>