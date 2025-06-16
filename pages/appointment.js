// Variables para almacenar la selección del usuario
let selectedService = null;
let selectedBarber = null;
let selectedDate = null;
let selectedTime = null;

// Datos cargados desde localStorage
let services = [];
let barbers = [];
let appointments = [];

document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos
    services = JSON.parse(localStorage.getItem('barberwebServices') || '[]');
    barbers = JSON.parse(localStorage.getItem('barberwebBarbers') || '[]');
    appointments = JSON.parse(localStorage.getItem('barberwebAppointments') || '[]');
    
    // Comprobar si hay un servicio preseleccionado en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceIdParam = urlParams.get('service');
    
    // Inicializar pasos
    initServiceSelection(serviceIdParam);
    initBarberSelection();
    initDateTimeSelection();
    initConfirmation();
    
    // Configurar navegación entre pasos
    setupStepNavigation();
});

// Inicializa la selección de servicios
function initServiceSelection(preselectedServiceId) {
    const servicesGrid = document.getElementById('services-grid');
    
    // Generar tarjetas de servicios
    services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        serviceItem.dataset.id = service.id;
        
        serviceItem.innerHTML = `
            <h4>${service.name}</h4>
            <div class="service-price">${service.price}€</div>
            <div class="service-duration"><i class="far fa-clock"></i> ${service.duration} min</div>
        `;
        
        // Si este servicio está preseleccionado en la URL, marcarlo como seleccionado
        if (preselectedServiceId && service.id === parseInt(preselectedServiceId)) {
            serviceItem.classList.add('selected');
            selectedService = service;
            document.getElementById('next-to-step-2').disabled = false;
        }
        
        // Agregar evento de click
        serviceItem.addEventListener('click', function() {
            // Desmarcar cualquier servicio seleccionado previamente
            document.querySelectorAll('.service-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Marcar este servicio como seleccionado
            this.classList.add('selected');
            
            // Guardar selección
            selectedService = service;
            
            // Habilitar el botón siguiente
            document.getElementById('next-to-step-2').disabled = false;
        });
        
        servicesGrid.appendChild(serviceItem);
    });
}

// Inicializa la selección de barberos
function initBarberSelection() {
    const barbersGrid = document.getElementById('barbers-grid');
    
    // Generar tarjetas de barberos
    barbers.forEach(barber => {
        const barberItem = document.createElement('div');
        barberItem.className = 'barber-item';
        barberItem.dataset.id = barber.id;
        
        barberItem.innerHTML = `
            <div class="barber-image" style="background-image: url('${barber.imageUrl}')"></div>
            <h4>${barber.name}</h4>
            <div class="barber-specialty">${barber.specialty}</div>
            <div class="barber-experience">${barber.experience}</div>
        `;
        
        // Agregar evento de click
        barberItem.addEventListener('click', function() {
            // Desmarcar cualquier barbero seleccionado previamente
            document.querySelectorAll('.barber-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Marcar este barbero como seleccionado
            this.classList.add('selected');
            
            // Guardar selección
            selectedBarber = barber;
            
            // Habilitar el botón siguiente
            document.getElementById('next-to-step-3').disabled = false;
        });
        
        barbersGrid.appendChild(barberItem);
    });
}

// Inicializa la selección de fecha y hora
function initDateTimeSelection() {
    // Configurar el calendario
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Elementos del DOM
    const calendarDays = document.getElementById('calendar-days');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const timeSlots = document.getElementById('time-slots');
    
    // Función para generar el calendario
    function generateCalendar(month, year) {
        // Actualizar texto del mes actual
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;
        
        // Limpiar calendario existente
        calendarDays.innerHTML = '';
        
        // Obtener el primer día del mes (0 = Domingo, 1 = Lunes, ...)
        const firstDay = new Date(year, month, 1).getDay();
        // Ajustar para que la semana empiece en Lunes (0 = Lunes, 6 = Domingo)
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
        
        // Obtener el último día del mes
        const lastDay = new Date(year, month + 1, 0).getDate();
        
        // Crear celdas vacías para los días antes del primer día del mes
        for (let i = 0; i < adjustedFirstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarDays.appendChild(emptyDay);
        }
        
        // Crear celdas para cada día del mes
        for (let day = 1; day <= lastDay; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            
            // Verificar si es hoy
            const dateToCheck = new Date(year, month, day);
            const today = new Date();
            
            if (
                dateToCheck.getDate() === today.getDate() &&
                dateToCheck.getMonth() === today.getMonth() &&
                dateToCheck.getFullYear() === today.getFullYear()
            ) {
                dayCell.classList.add('today');
            }
            
            // Deshabilitar días pasados
            if (dateToCheck < new Date(today.setHours(0,0,0,0))) {
                dayCell.classList.add('disabled');
            } else {
                // Agregar evento de click para días habilitados
                dayCell.addEventListener('click', function() {
                    // Desmarcar cualquier día seleccionado previamente
                    document.querySelectorAll('.calendar-day').forEach(day => {
                        if (!day.classList.contains('empty')) {
                            day.classList.remove('selected');
                        }
                    });
                    
                    // Marcar este día como seleccionado
                    this.classList.add('selected');
                    
                    // Guardar fecha seleccionada
                    selectedDate = new Date(year, month, day);
                    
                    // Generar franjas horarias disponibles
                    generateTimeSlots(selectedDate);
                });
            }
            
            calendarDays.appendChild(dayCell);
        }
    }
    
    // Generar franjas horarias para la fecha seleccionada
    function generateTimeSlots(date) {
        // Limpiar slots existentes
        timeSlots.innerHTML = '';
        
        // Horario comercial de la barbería (de 9:00 a 20:00)
        const openingHour = 9;
        const closingHour = 20;
        
        // Duración de cada cita en horas (por defecto 0.5 = 30min)
        const appointmentDuration = selectedService ? selectedService.duration / 60 : 0.5;
        
        // Generar franjas horarias
        for (let hour = openingHour; hour < closingHour; hour += appointmentDuration) {
            const wholeHour = Math.floor(hour);
            const minutes = Math.round((hour - wholeHour) * 60);
            
            const timeString = `${wholeHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = timeString;
            timeSlot.dataset.time = timeString; // Guardar el formato correcto en un atributo data
            
            // Verificar disponibilidad (comprobar si ya hay citas para este barbero en esta fecha y hora)
            const isBooked = appointments.some(appointment => {
                const appointmentDate = new Date(appointment.date);
                return (
                    appointment.barberId === selectedBarber.id &&
                    appointmentDate.getFullYear() === date.getFullYear() &&
                    appointmentDate.getMonth() === date.getMonth() &&
                    appointmentDate.getDate() === date.getDate() &&
                    appointment.time === timeString
                );
            });
            
            // Si ya está ocupado, deshabilitar esta franja horaria
            if (isBooked) {
                timeSlot.classList.add('disabled');
            } else {
                // Agregar evento de click para franjas disponibles
                timeSlot.addEventListener('click', function() {
                    // Desmarcar cualquier hora seleccionada previamente
                    document.querySelectorAll('.time-slot').forEach(slot => {
                        slot.classList.remove('selected');
                    });
                    
                    // Marcar esta hora como seleccionada
                    this.classList.add('selected');
                    
                    // Guardar hora seleccionada usando el formato correcto
                    selectedTime = this.dataset.time;
                    
                    // Habilitar el botón siguiente
                    document.getElementById('next-to-step-4').disabled = false;
                });
            }
            
            timeSlots.appendChild(timeSlot);
        }
    }
    
    // Configurar navegación del calendario
    prevMonthButton.addEventListener('click', function() {
        // Ir al mes anterior
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    nextMonthButton.addEventListener('click', function() {
        // Ir al mes siguiente
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    // Generar calendario inicial
    generateCalendar(currentMonth, currentYear);
}

// Inicializa la confirmación de la cita
function initConfirmation() {
    const confirmButton = document.getElementById('confirm-appointment');
    
    confirmButton.addEventListener('click', function() {
        // Verificar si el usuario está logueado
        if (!isLoggedIn()) {
            document.getElementById('login-required').style.display = 'block';
            return;
        }
        
        // Obtener datos del usuario actual
        const currentUser = JSON.parse(localStorage.getItem('barberwebUser'));
        
        // Crear nueva cita
        const newAppointment = {
            id: appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1,
            userId: currentUser.id,
            serviceId: selectedService.id,
            barberId: selectedBarber.id,
            date: selectedDate.toISOString().split('T')[0],
            time: selectedTime,
            status: 'pending'
        };
        
        // Añadir la cita a la lista de citas
        appointments.push(newAppointment);
        
        // Guardar en localStorage
        localStorage.setItem('barberwebAppointments', JSON.stringify(appointments));
        
        // Mostrar mensaje de confirmación
        showAlert('Cita reservada correctamente', 'success');
        
        // Redirigir a la página de citas
        setTimeout(() => {
            window.location.href = 'my-appointments.html';
        }, 1500);
    });
}

// Configura la navegación entre los pasos del formulario
function setupStepNavigation() {
    // Elementos del DOM
    const steps = Array.from(document.querySelectorAll('.step'));
    const stepContents = Array.from(document.querySelectorAll('.step-content'));
    
    // Funciones para navegar entre pasos
    function goToStep(stepIndex) {
        // Actualizar clases de los pasos
        steps.forEach((step, index) => {
            if (index < stepIndex) {
                step.classList.remove('active');
                step.classList.add('completed');
            } else if (index === stepIndex) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active');
                step.classList.remove('completed');
            }
        });
        
        // Actualizar contenido visible
        stepContents.forEach((content, index) => {
            if (index === stepIndex) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }
    
    // Paso 1 -> Paso 2
    document.getElementById('next-to-step-2').addEventListener('click', function() {
        goToStep(1);
    });
    
    // Paso 2 -> Paso 1
    document.getElementById('back-to-step-1').addEventListener('click', function() {
        goToStep(0);
    });
    
    // Paso 2 -> Paso 3
    document.getElementById('next-to-step-3').addEventListener('click', function() {
        goToStep(2);
    });
    
    // Paso 3 -> Paso 2
    document.getElementById('back-to-step-2').addEventListener('click', function() {
        goToStep(1);
    });
    
    // Paso 3 -> Paso 4
    document.getElementById('next-to-step-4').addEventListener('click', function() {
        // Actualizar información de confirmación
        document.getElementById('confirm-service').textContent = selectedService.name;
        document.getElementById('confirm-barber').textContent = selectedBarber.name;
        
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('confirm-date').textContent = selectedDate.toLocaleDateString('es-ES', options);
        
        document.getElementById('confirm-time').textContent = selectedTime;
        document.getElementById('confirm-price').textContent = `${selectedService.price}€`;
        document.getElementById('confirm-duration').textContent = `${selectedService.duration} minutos`;
        
        goToStep(3);
    });
    
    // Paso 4 -> Paso 3
    document.getElementById('back-to-step-3').addEventListener('click', function() {
        goToStep(2);
    });
}
