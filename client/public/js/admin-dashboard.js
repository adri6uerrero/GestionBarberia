// Datos de ejemplo para el dashboard administrativo
const dashboardData = {
  // Estadísticas generales
  stats: {
    ingresosHoy: "350€",
    ingresosSemanales: "2,450€",
    citasCompletadas: 168,
    clientesNuevos: 24
  },
  
  // Horarios de trabajo de los barberos
  horariosTrabajo: {
    1: { // Carlos
      lunes: { inicio: "09:00", fin: "18:00" },
      martes: { inicio: "09:00", fin: "18:00" },
      miercoles: { inicio: "09:00", fin: "18:00" },
      jueves: { inicio: "09:00", fin: "18:00" },
      viernes: { inicio: "09:00", fin: "18:00" },
      sabado: { inicio: "10:00", fin: "15:00" },
      domingo: { inicio: null, fin: null } // No trabaja
    },
    2: { // Manuel
      lunes: { inicio: "10:00", fin: "19:00" },
      martes: { inicio: "10:00", fin: "19:00" },
      miercoles: { inicio: null, fin: null }, // Día libre
      jueves: { inicio: "10:00", fin: "19:00" },
      viernes: { inicio: "10:00", fin: "19:00" },
      sabado: { inicio: "10:00", fin: "15:00" },
      domingo: { inicio: null, fin: null } // No trabaja
    },
    3: { // Roberto
      lunes: { inicio: null, fin: null }, // Día libre
      martes: { inicio: "09:00", fin: "18:00" },
      miercoles: { inicio: "09:00", fin: "18:00" },
      jueves: { inicio: "09:00", fin: "18:00" },
      viernes: { inicio: "09:00", fin: "18:00" },
      sabado: { inicio: "10:00", fin: "15:00" },
      domingo: { inicio: null, fin: null } // No trabaja
    }
  },
  
  // Citas programadas (ejemplo)
  citasProgramadas: [
    {
      id: 1,
      fecha: "2025-05-16",
      hora: "10:00",
      cliente: "Carlos García",
      barbero: 1,
      servicio: "Corte y barba",
      duracion: 60,
      precio: "30€",
      estado: "confirmada"
    },
    {
      id: 2,
      fecha: "2025-05-16",
      hora: "11:00",
      cliente: "Miguel Rodríguez",
      barbero: 2,
      servicio: "Corte de pelo",
      duracion: 30,
      precio: "20€",
      estado: "confirmada"
    },
    {
      id: 3,
      fecha: "2025-05-16",
      hora: "12:00",
      cliente: "Juan Pérez",
      barbero: 3,
      servicio: "Barba",
      duracion: 30,
      precio: "15€",
      estado: "confirmada"
    },
    {
      id: 4,
      fecha: "2025-05-17",
      hora: "09:30",
      cliente: "Alejandro Martínez",
      barbero: 1,
      servicio: "Corte y arreglo de cejas",
      duracion: 45,
      precio: "25€",
      estado: "pendiente"
    },
    {
      id: 5,
      fecha: "2025-05-17",
      hora: "16:00",
      cliente: "David López",
      barbero: 3,
      servicio: "Corte completo",
      duracion: 60,
      precio: "35€",
      estado: "confirmada"
    }
  ],
  
  // Datos de ventas mensuales para gráficos
  ventasMensuales: [
    { mes: "Enero", ingresos: 5200 },
    { mes: "Febrero", ingresos: 4800 },
    { mes: "Marzo", ingresos: 5500 },
    { mes: "Abril", ingresos: 6200 },
    { mes: "Mayo", ingresos: 5900 }
  ],
  
  // Servicios más populares
  serviciosPopulares: [
    { nombre: "Corte de pelo", cantidad: 78, porcentaje: 45 },
    { nombre: "Corte y barba", cantidad: 52, porcentaje: 30 },
    { nombre: "Barba", cantidad: 28, porcentaje: 16 },
    { nombre: "Corte y cejas", cantidad: 15, porcentaje: 9 }
  ]
};

// Función para crear el calendario de citas
function generarCalendario(fecha) {
  const fechaActual = fecha ? new Date(fecha) : new Date();
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  
  // Crear array con los días de la semana
  const diasSemana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  
  // Formatear fecha seleccionada para mostrar
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormateada = fechaActual.toLocaleDateString('es-ES', options);
  
  // Actualizar título del calendario
  document.getElementById('current-date').textContent = fechaFormateada;
  
  // Obtener contenedor del calendario
  const calendarGrid = document.getElementById('calendar-grid');
  calendarGrid.innerHTML = '';
  
  // Crear encabezados para cada barbero
  const headerRow = document.createElement('div');
  headerRow.className = 'calendar-row header';
  
  // Añadir celda de hora
  const timeHeader = document.createElement('div');
  timeHeader.className = 'calendar-cell time-header';
  timeHeader.textContent = 'Hora';
  headerRow.appendChild(timeHeader);
  
  // Añadir encabezados de barberos
  barbersData.forEach(barber => {
    const barberHeader = document.createElement('div');
    barberHeader.className = 'calendar-cell barber-header';
    barberHeader.innerHTML = `
      <div class="barber-avatar">
        <img src="${barber.image}" alt="${barber.name}" />
      </div>
      <div class="barber-name">${barber.name}</div>
    `;
    headerRow.appendChild(barberHeader);
  });
  
  calendarGrid.appendChild(headerRow);
  
  // Generar filas de horas (de 9:00 a 19:00)
  const horaInicio = 9;
  const horaFin = 19;
  
  // Obtener día de la semana (0-6, donde 0 es domingo)
  const diaSemana = diasSemana[fechaActual.getDay()];
  
  // Formatear fecha para comparar con citas
  const fechaStr = fechaActual.toISOString().split('T')[0];
  
  for (let hora = horaInicio; hora <= horaFin; hora++) {
    // Crear fila para cada hora
    const timeRow = document.createElement('div');
    timeRow.className = 'calendar-row';
    
    // Añadir celda de hora
    const timeCell = document.createElement('div');
    timeCell.className = 'calendar-cell time-cell';
    timeCell.textContent = `${hora}:00`;
    timeRow.appendChild(timeCell);
    
    // Añadir celdas para cada barbero
    barbersData.forEach(barber => {
      const barberCell = document.createElement('div');
      barberCell.className = 'calendar-cell';
      
      // Comprobar si el barbero trabaja a esta hora
      const horarioBarbero = dashboardData.horariosTrabajo[barber.id];
      const horarioDia = horarioBarbero[diaSemana];
      
      if (!horarioDia.inicio) {
        // No trabaja este día
        barberCell.classList.add('no-disponible');
        barberCell.innerHTML = '<span class="no-trabaja">No trabaja</span>';
      } else {
        const horaInicioTrabajo = parseInt(horarioDia.inicio.split(':')[0]);
        const horaFinTrabajo = parseInt(horarioDia.fin.split(':')[0]);
        
        if (hora < horaInicioTrabajo || hora >= horaFinTrabajo) {
          // Fuera de horario de trabajo
          barberCell.classList.add('fuera-horario');
          barberCell.innerHTML = '<span class="no-disponible">No disponible</span>';
        } else {
          // Dentro del horario de trabajo, buscar si hay cita
          const citaEnHora = dashboardData.citasProgramadas.find(cita => 
            cita.fecha === fechaStr && 
            cita.hora.split(':')[0] == hora && 
            cita.barbero === barber.id
          );
          
          if (citaEnHora) {
            // Hay una cita en esta hora
            barberCell.classList.add('cita-programada');
            barberCell.dataset.citaId = citaEnHora.id;
            barberCell.innerHTML = `
              <div class="cita-info">
                <div class="cita-cliente">${citaEnHora.cliente}</div>
                <div class="cita-servicio">${citaEnHora.servicio}</div>
                <div class="cita-duracion">${citaEnHora.duracion} min - ${citaEnHora.precio}</div>
              </div>
            `;
          } else {
            // Hora libre
            barberCell.classList.add('hora-libre');
            barberCell.innerHTML = '<span class="disponible">Disponible</span>';
          }
        }
      }
      
      timeRow.appendChild(barberCell);
    });
    
    calendarGrid.appendChild(timeRow);
  }
}

// Función para inicializar los gráficos
function inicializarGraficos() {
  // Datos para la gráfica de ventas
  const ventasDataLabels = dashboardData.ventasMensuales.map(item => item.mes);
  const ventasData = dashboardData.ventasMensuales.map(item => item.ingresos);
  
  // Simular gráfica de ventas (en un app real usaríamos Chart.js o similar)
  const chartContainer = document.getElementById('ventas-chart');
  chartContainer.innerHTML = '';
  
  // Crear barras para simular una gráfica
  ventasData.forEach((valor, index) => {
    const porcentaje = (valor / Math.max(...ventasData)) * 100;
    
    const barContainer = document.createElement('div');
    barContainer.className = 'chart-bar-container';
    
    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.style.height = `${porcentaje}%`;
    
    const label = document.createElement('div');
    label.className = 'chart-label';
    label.textContent = ventasDataLabels[index];
    
    const value = document.createElement('div');
    value.className = 'chart-value';
    value.textContent = `${valor}€`;
    
    barContainer.appendChild(value);
    barContainer.appendChild(bar);
    barContainer.appendChild(label);
    
    chartContainer.appendChild(barContainer);
  });
  
  // Simular gráfica de servicios populares
  const serviciosPopulares = document.getElementById('servicios-populares');
  serviciosPopulares.innerHTML = '';
  
  dashboardData.serviciosPopulares.forEach(servicio => {
    const servicioItem = document.createElement('div');
    servicioItem.className = 'servicio-item';
    
    servicioItem.innerHTML = `
      <div class="servicio-info">
        <div class="servicio-nombre">${servicio.nombre}</div>
        <div class="servicio-cantidad">${servicio.cantidad} reservas</div>
      </div>
      <div class="servicio-barra-container">
        <div class="servicio-barra" style="width: ${servicio.porcentaje}%"></div>
      </div>
      <div class="servicio-porcentaje">${servicio.porcentaje}%</div>
    `;
    
    serviciosPopulares.appendChild(servicioItem);
  });
}

// Función para mostrar las estadísticas en la dashboard
function mostrarEstadisticas() {
  document.getElementById('ingresos-hoy').textContent = dashboardData.stats.ingresosHoy;
  document.getElementById('ingresos-semanales').textContent = dashboardData.stats.ingresosSemanales;
  document.getElementById('citas-completadas').textContent = dashboardData.stats.citasCompletadas;
  document.getElementById('clientes-nuevos').textContent = dashboardData.stats.clientesNuevos;
}

// Función para inicializar la navegación del dashboard
function inicializarNavegacion() {
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      // Quitar clase active de todos los elementos del menú
      document.querySelectorAll('.menu-item').forEach(menuItem => {
        menuItem.classList.remove('active');
      });
      
      // Añadir clase active al elemento clickeado
      item.classList.add('active');
      
      // Ocultar todos los tabs
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
      });
      
      // Mostrar el tab correspondiente
      const targetTab = item.getAttribute('data-target');
      document.getElementById(targetTab).classList.add('active');
    });
  });
  
  // Botones de navegación del calendario
  document.getElementById('prev-day').addEventListener('click', () => {
    const fechaActualStr = document.getElementById('current-date').textContent;
    const fechaActual = new Date(fechaActualStr);
    fechaActual.setDate(fechaActual.getDate() - 1);
    generarCalendario(fechaActual);
  });
  
  document.getElementById('next-day').addEventListener('click', () => {
    const fechaActualStr = document.getElementById('current-date').textContent;
    const fechaActual = new Date(fechaActualStr);
    fechaActual.setDate(fechaActual.getDate() + 1);
    generarCalendario(fechaActual);
  });
  
  document.getElementById('today').addEventListener('click', () => {
    generarCalendario(new Date());
  });
}

// Verificar si el usuario está autenticado
function verificarAutenticacion() {
  const usuarioActual = localStorage.getItem('currentUser');
  if (!usuarioActual) {
    // Redirigir a login si no hay usuario autenticado
    window.location.href = 'login.html';
    return false;
  }
  
  const usuario = JSON.parse(usuarioActual);
  
  // Verificar si el usuario es administrador
  if (usuario.role !== 'admin') {
    // Redirigir a página de usuario si no es admin
    window.location.href = 'mis-citas.html';
    return false;
  }
  
  // Mostrar información del usuario
  document.getElementById('user-name').textContent = usuario.name;
  document.getElementById('user-avatar').textContent = usuario.name.charAt(0);
  
  return true;
}

// Función de inicialización del dashboard
function inicializarDashboard() {
  // Verificar autenticación
  if (!verificarAutenticacion()) {
    return;
  }
  
  // Inicializar elementos del dashboard
  mostrarEstadisticas();
  inicializarGraficos();
  inicializarNavegacion();
  generarCalendario();
  
  // Añadir listener para logout
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });
}

// Inicializar cuando se cargue la página
document.addEventListener('DOMContentLoaded', inicializarDashboard);
