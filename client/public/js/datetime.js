// Simulación de citas ya reservadas
const bookedAppointments = [
  { date: '2025-05-20', time: '10:00', barber: 1 },
  { date: '2025-05-20', time: '16:30', barber: 2 },
  { date: '2025-05-21', time: '11:00', barber: 3 },
  { date: '2025-05-22', time: '09:30', barber: 1 }
];

// Función para inicializar calendario
function initCalendar() {
  const today = new Date();
  updateCalendar(today.getFullYear(), today.getMonth());
  
  // Añadir eventos a los botones de navegación
  document.querySelectorAll('.calendar-nav-btn').forEach((btn, index) => {
    btn.addEventListener('click', function() {
      const currentDate = new Date(document.querySelector('.calendar-month').dataset.year, 
                                  document.querySelector('.calendar-month').dataset.month);
      if (index === 0) { // Mes anterior
        currentDate.setMonth(currentDate.getMonth() - 1);
      } else { // Mes siguiente
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
      updateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
  });
}

// Función para actualizar el calendario con el mes indicado
function updateCalendar(year, month) {
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  // Actualizar encabezado del mes
  const calendarMonth = document.querySelector('.calendar-month');
  calendarMonth.textContent = `${monthNames[month]} ${year}`;
  calendarMonth.dataset.year = year;
  calendarMonth.dataset.month = month;
  
  // Limpiar días anteriores
  const dayElements = document.querySelectorAll('.calendar-day:not(.calendar-day-name)');
  dayElements.forEach(day => day.remove());
  
  // Añadir días del mes actual
  const calendarGrid = document.querySelector('.calendar-grid');
  const today = new Date();
  
  // Añadir días vacíos para completar la semana
  let firstDayOfWeek = firstDay.getDay() - 1; // Lunes es 0
  if (firstDayOfWeek < 0) firstDayOfWeek = 6; // Domingo
  
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day disabled';
    calendarGrid.appendChild(emptyDay);
  }
  
  // Añadir los días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = day;
    
    const currentDate = new Date(year, month, day);
    const formattedDate = formatDate(currentDate);
    dayElement.dataset.date = formattedDate;
    
    // Deshabilitar días pasados
    if (currentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      dayElement.classList.add('disabled');
    } else {
      // Añadir evento para seleccionar fecha
      dayElement.addEventListener('click', function() {
        selectDate(this);
      });
    }
    
    calendarGrid.appendChild(dayElement);
  }
}

// Función para formatear fecha en formato YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Función para seleccionar una fecha
function selectDate(dayElement) {
  if (dayElement.classList.contains('disabled')) return;
  
  // Deseleccionar fecha anterior
  document.querySelectorAll('.calendar-day').forEach(day => {
    day.classList.remove('selected');
  });
  
  // Seleccionar nueva fecha
  dayElement.classList.add('selected');
  selectedDate = dayElement.dataset.date;
  
  // Actualizar horarios disponibles
  updateTimeSlots();
  
  // Actualizar confirmación
  updateConfirmation();
}

// Función para actualizar slots de tiempo disponibles
function updateTimeSlots() {
  // Resetear selección de hora
  selectedTime = null;
  
  // Actualizar UI de horarios
  document.querySelectorAll('.time-slot').forEach(slot => {
    slot.classList.remove('selected', 'disabled');
    
    // Verificar si el horario ya está reservado para ese barbero y fecha
    const timeValue = slot.textContent;
    const isBooked = bookedAppointments.some(appointment => 
      appointment.date === selectedDate && 
      appointment.time === timeValue && 
      appointment.barber === selectedBarber.id
    );
    
    if (isBooked) {
      slot.classList.add('disabled');
    } else {
      // Añadir evento para seleccionar hora
      slot.addEventListener('click', function() {
        if (!this.classList.contains('disabled')) {
          selectTime(this);
        }
      });
    }
  });
}

// Función para seleccionar una hora
function selectTime(timeSlot) {
  // Deseleccionar hora anterior
  document.querySelectorAll('.time-slot').forEach(slot => {
    slot.classList.remove('selected');
  });
  
  // Seleccionar nueva hora
  timeSlot.classList.add('selected');
  selectedTime = timeSlot.textContent;
  
  // Actualizar confirmación
  updateConfirmation();
  
  // Mostrar botón flotante
  if (selectedDate && selectedTime) {
    document.getElementById('floating-confirm-button').classList.add('visible');
  }
}
