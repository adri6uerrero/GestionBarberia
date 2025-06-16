document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado
    if (!isLoggedIn()) {
        document.getElementById('login-required').style.display = 'block';
        document.getElementById('user-content').style.display = 'none';
        return;
    }
    
    // Mostrar contenido para usuarios logueados
    document.getElementById('login-required').style.display = 'none';
    document.getElementById('user-content').style.display = 'block';
    
    // Cargar datos
    const currentUser = JSON.parse(localStorage.getItem('barberwebUser'));
    const appointments = JSON.parse(localStorage.getItem('barberwebAppointments') || '[]');
    const services = JSON.parse(localStorage.getItem('barberwebServices') || '[]');
    const barbers = JSON.parse(localStorage.getItem('barberwebBarbers') || '[]');
    
    // Filtrar citas del usuario actual
    const userAppointments = appointments.filter(appointment => appointment.userId === currentUser.id);
    
    // Separar en citas próximas e historial
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingAppointments = userAppointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= today && appointment.status !== 'cancelled';
    });
    
    const historyAppointments = userAppointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate < today || appointment.status === 'completed' || appointment.status === 'cancelled';
    });
    
    // Función para crear una tarjeta de cita
    function createAppointmentCard(appointment, isUpcoming = true) {
        const service = services.find(s => s.id === appointment.serviceId);
        const barber = barbers.find(b => b.id === appointment.barberId);
        
        if (!service || !barber) return null; // Skip if service or barber not found
        
        const appointmentDate = new Date(appointment.date);
        const formattedDate = appointmentDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Status label
        let statusClass = '';
        let statusText = '';
        
        switch(appointment.status) {
            case 'pending':
                statusClass = 'status-pending';
                statusText = 'Pendiente';
                break;
            case 'completed':
                statusClass = 'status-completed';
                statusText = 'Completada';
                break;
            case 'cancelled':
                statusClass = 'status-cancelled';
                statusText = 'Cancelada';
                break;
            default:
                statusClass = 'status-pending';
                statusText = 'Pendiente';
        }
        
        const card = document.createElement('div');
        card.className = 'appointment-card';
        card.dataset.id = appointment.id;
        
        card.innerHTML = `
            <div class="appointment-info">
                <div class="appointment-date">
                    ${formattedDate} - ${appointment.time}
                    <span class="appointment-status ${statusClass}">${statusText}</span>
                </div>
                <div class="appointment-detail">
                    <i class="fas fa-cut"></i>
                    <span>${service.name}</span>
                </div>
                <div class="appointment-detail">
                    <i class="fas fa-user"></i>
                    <span>${barber.name}</span>
                </div>
                <div class="appointment-detail">
                    <i class="fas fa-money-bill-wave"></i>
                    <span>${service.price}€</span>
                </div>
                <div class="appointment-detail">
                    <i class="fas fa-hourglass-half"></i>
                    <span>${service.duration} minutos</span>
                </div>
            </div>
        `;
        
        // Añadir botones de acción solo para citas pendientes y próximas
        if (isUpcoming && appointment.status === 'pending') {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'appointment-actions';
            
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'btn-cancel';
            cancelBtn.textContent = 'Cancelar';
            cancelBtn.dataset.id = appointment.id;
            cancelBtn.addEventListener('click', function() {
                cancelAppointment(appointment.id);
            });
            
            const rescheduleBtn = document.createElement('button');
            rescheduleBtn.className = 'btn-reschedule';
            rescheduleBtn.textContent = 'Reprogramar';
            rescheduleBtn.dataset.id = appointment.id;
            rescheduleBtn.addEventListener('click', function() {
                window.location.href = `appointment.html?reschedule=${appointment.id}`;
            });
            
            actionsDiv.appendChild(rescheduleBtn);
            actionsDiv.appendChild(cancelBtn);
            card.appendChild(actionsDiv);
        }
        
        return card;
    }
    
    // Función para cancelar una cita
    function cancelAppointment(appointmentId) {
        if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
            const appointments = JSON.parse(localStorage.getItem('barberwebAppointments') || '[]');
            const appointmentIndex = appointments.findIndex(a => a.id === parseInt(appointmentId));
            
            if (appointmentIndex !== -1) {
                appointments[appointmentIndex].status = 'cancelled';
                localStorage.setItem('barberwebAppointments', JSON.stringify(appointments));
                
                // Mostrar mensaje y recargar
                showAlert('Cita cancelada correctamente', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        }
    }
    
    // Mostrar citas próximas
    const upcomingContainer = document.getElementById('upcoming-appointments');
    const upcomingEmpty = document.getElementById('upcoming-empty');
    
    if (upcomingAppointments.length === 0) {
        upcomingContainer.style.display = 'none';
        upcomingEmpty.style.display = 'block';
    } else {
        upcomingContainer.style.display = 'flex';
        upcomingEmpty.style.display = 'none';
        
        upcomingAppointments.forEach(appointment => {
            const card = createAppointmentCard(appointment, true);
            if (card) upcomingContainer.appendChild(card);
        });
    }
    
    // Mostrar historial
    const historyContainer = document.getElementById('history-appointments');
    const historyEmpty = document.getElementById('history-empty');
    
    if (historyAppointments.length === 0) {
        historyContainer.style.display = 'none';
        historyEmpty.style.display = 'block';
    } else {
        historyContainer.style.display = 'flex';
        historyEmpty.style.display = 'none';
        
        historyAppointments.forEach(appointment => {
            const card = createAppointmentCard(appointment, false);
            if (card) historyContainer.appendChild(card);
        });
    }
    
    // Configurar cambio de pestañas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Desactivar todas las pestañas
            tabs.forEach(t => t.classList.remove('active'));
            
            // Activar esta pestaña
            this.classList.add('active');
            
            // Obtener el contenido asociado
            const tabId = this.getAttribute('data-tab');
            
            // Ocultar todos los contenidos
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar el contenido correspondiente
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
});
