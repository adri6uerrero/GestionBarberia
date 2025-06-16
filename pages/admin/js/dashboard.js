// dashboard.js - Script para el panel de administración

document.addEventListener('DOMContentLoaded', function() {
    // Ya no necesitamos las verificaciones de autenticación aquí, están en fix-navigation.js
    const currentUser = JSON.parse(localStorage.getItem('barberwebUser') || '{}');
    
    // Establecer nombre del administrador
    document.getElementById('admin-name').textContent = currentUser.name;
    
    // Establecer fecha actual
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = today.toLocaleDateString('es-ES', options);
    
    // Inicializar estilos para los indicadores de estado
    addStatusStyles();
    
    // Cargar datos
    loadDashboardData();
    
    // Configurar navegación
    setupNavigation();
    
    // Configurar gestión de servicios
    setupServicesManagement();
    
    // Configurar gestión de barberos
    setupBarbersManagement();
    
    // Configurar gestión de productos
    setupProductsManagement();
    
    // Configurar gestión de usuarios
    setupUsersManagement();
    
    // Configurar calendario de citas
    setupAppointmentsCalendar();
});

// Función para cargar los datos del dashboard
function loadDashboardData() {
    // Cargar datos desde localStorage
    const appointments = JSON.parse(localStorage.getItem('barberwebAppointments') || '[]');
    const users = JSON.parse(localStorage.getItem('barberwebUsers') || '[]');
    const services = JSON.parse(localStorage.getItem('barberwebServices') || '[]');
    const products = JSON.parse(localStorage.getItem('barberwebProducts') || '[]');
    const barbers = JSON.parse(localStorage.getItem('barberwebBarbers') || '[]');
    
    // Actualizar estadísticas
    updateStatistics(appointments, users, products);
    
    // Cargar citas recientes
    loadRecentAppointments(appointments, users, services, barbers);
}

// Función para actualizar las estadísticas del dashboard
function updateStatistics(appointments, users, products) {
    // Total de citas
    document.getElementById('total-appointments').textContent = appointments.length;
    
    // Total de usuarios (excluyendo admins)
    const clientUsers = users.filter(user => user.role !== 'admin');
    document.getElementById('total-users').textContent = clientUsers.length;
    
    // Simular productos vendidos
    document.getElementById('products-sold').textContent = '45'; // En una implementación real, se calcularía
    
    // Calcular ingresos del mes actual
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthAppointments = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return (
            appointmentDate.getMonth() === currentMonth && 
            appointmentDate.getFullYear() === currentYear &&
            appointment.status !== 'cancelled'
        );
    });
    
    let monthRevenue = 0;
    
    monthAppointments.forEach(appointment => {
        const service = services.find(service => service.id === appointment.serviceId);
        if (service) {
            monthRevenue += service.price;
        }
    });
    
    // Añadir ventas de productos simuladas (en implementación real se calcularía)
    monthRevenue += 350;
    
    document.getElementById('month-revenue').textContent = `${monthRevenue.toFixed(2)}€`;
}

// Función para cargar las citas recientes
function loadRecentAppointments(appointments, users, services, barbers) {
    const tableBody = document.getElementById('recent-appointments-body');
    
    // Ordenar citas por fecha (más recientes primero)
    const sortedAppointments = [...appointments].sort((a, b) => {
        const dateA = new Date(a.date + 'T' + a.time);
        const dateB = new Date(b.date + 'T' + b.time);
        return dateB - dateA;
    });
    
    // Tomar las 10 más recientes
    const recentAppointments = sortedAppointments.slice(0, 10);
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Si no hay citas
    if (recentAppointments.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="7" style="text-align:center;">No hay citas registradas</td>`;
        tableBody.appendChild(row);
        return;
    }
    
    // Añadir citas a la tabla
    recentAppointments.forEach(appointment => {
        const user = users.find(user => user.id === appointment.userId);
        const service = services.find(service => service.id === appointment.serviceId);
        const barber = barbers.find(barber => barber.id === appointment.barberId);
        
        if (!user || !service || !barber) return;
        
        const row = document.createElement('tr');
        
        // Obtener clase para el estado
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
        
        // Formatear fecha
        const appointmentDate = new Date(appointment.date);
        const formattedDate = appointmentDate.toLocaleDateString('es-ES');
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${service.name}</td>
            <td>${barber.name}</td>
            <td>${formattedDate}</td>
            <td>${appointment.time}</td>
            <td><span class="appointment-status ${statusClass}">${statusText}</span></td>
            <td class="action-buttons">
                <button class="btn-action btn-view" data-id="${appointment.id}" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action btn-edit" data-id="${appointment.id}" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action btn-delete" data-id="${appointment.id}" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        // Agregar eventos a botones
        const viewBtn = row.querySelector('.btn-view');
        const editBtn = row.querySelector('.btn-edit');
        const deleteBtn = row.querySelector('.btn-delete');
        
        viewBtn.addEventListener('click', () => viewAppointment(appointment.id));
        editBtn.addEventListener('click', () => editAppointment(appointment.id));
        deleteBtn.addEventListener('click', () => deleteAppointment(appointment.id));
        
        tableBody.appendChild(row);
    });
}

// Función para configurar la navegación del sidebar
function setupNavigation() {
    // Botón del menú
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // Enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            
            // Desactivar todos los enlaces y secciones
            navLinks.forEach(link => link.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Activar el enlace y sección seleccionados
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Cargar datos específicos de la sección
            if (targetSection === 'services-section') {
                loadServices();
            } else if (targetSection === 'barbers-section') {
                loadBarbers();
            } else if (targetSection === 'products-section') {
                loadProducts();
            } else if (targetSection === 'appointments-section') {
                loadCalendar();
            } else if (targetSection === 'users-section') {
                loadUsers();
            }
        });
    });
}

// Función para ver detalles de una cita
function viewAppointment(appointmentId) {
    // Aquí se implementaría la lógica para mostrar un modal con detalles de la cita
    console.log('Ver detalles de la cita:', appointmentId);
    alert('Ver detalles de la cita: ' + appointmentId);
}

// Función para editar una cita
function editAppointment(appointmentId) {
    // Aquí se implementaría la lógica para editar una cita
    console.log('Editar cita:', appointmentId);
    alert('Editar cita: ' + appointmentId);
}

// Función para eliminar una cita
function deleteAppointment(appointmentId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
        const appointments = JSON.parse(localStorage.getItem('barberwebAppointments') || '[]');
        const updatedAppointments = appointments.filter(appointment => appointment.id !== parseInt(appointmentId));
        
        localStorage.setItem('barberwebAppointments', JSON.stringify(updatedAppointments));
        
        // Recargar datos
        loadDashboardData();
        
        // Mostrar mensaje
        showAlert('Cita eliminada correctamente', 'success');
    }
}

// ---- GESTIÓN DE SERVICIOS ----

// Configurar la gestión de servicios
function setupServicesManagement() {
    // Botón para añadir servicio
    const addServiceBtn = document.getElementById('add-service-btn');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', () => openServiceModal());
    }
    
    // Formulario para añadir/editar servicio
    const serviceForm = document.getElementById('service-form');
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveService();
        });
    }
    
    // Botón para cancelar
    const cancelButton = document.getElementById('cancel-service');
    if (cancelButton) {
        cancelButton.addEventListener('click', closeServiceModal);
    }
    
    // Botón de cerrar modal
    const closeButton = document.querySelector('.modal .close');
    if (closeButton) {
        closeButton.addEventListener('click', closeServiceModal);
    }
    
    // Cargar servicios si estamos en la sección de servicios
    if (document.getElementById('services-section').classList.contains('active')) {
        loadServices();
    }
}

// Cargar servicios en la tabla
function loadServices() {
    const tableBody = document.getElementById('services-table-body');
    if (!tableBody) return;
    
    const services = JSON.parse(localStorage.getItem('barberwebServices') || '[]');
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Mostrar mensaje si no hay servicios
    if (services.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="7" style="text-align: center;">No hay servicios registrados</td>';
        tableBody.appendChild(row);
        return;
    }
    
    // Mostrar servicios en la tabla
    services.forEach(service => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${service.id}</td>
            <td>
                <img src="${service.imageUrl}" alt="${service.name}" class="service-image">
            </td>
            <td>${service.name}</td>
            <td>${service.description.length > 50 ? service.description.substring(0, 50) + '...' : service.description}</td>
            <td>${service.price.toFixed(2)} €</td>
            <td>${service.duration} min</td>
            <td class="action-buttons">
                <button class="btn-action btn-edit" data-id="${service.id}" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action btn-delete" data-id="${service.id}" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        // Añadir eventos a los botones
        const editButton = row.querySelector('.btn-edit');
        editButton.addEventListener('click', () => openServiceModal(service.id));
        
        const deleteButton = row.querySelector('.btn-delete');
        deleteButton.addEventListener('click', () => deleteService(service.id));
        
        tableBody.appendChild(row);
    });
}

// Abrir el modal para añadir o editar un servicio
function openServiceModal(serviceId = null) {
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('service-modal-title');
    
    // Limpiar formulario
    document.getElementById('service-form').reset();
    
    if (serviceId) {
        // Modo edición
        modalTitle.textContent = 'Editar Servicio';
        
        const services = JSON.parse(localStorage.getItem('barberwebServices') || '[]');
        const service = services.find(s => s.id === serviceId);
        
        if (service) {
            document.getElementById('service-id').value = service.id;
            document.getElementById('service-name').value = service.name;
            document.getElementById('service-description').value = service.description;
            document.getElementById('service-price').value = service.price;
            document.getElementById('service-duration').value = service.duration;
            document.getElementById('service-image').value = service.imageUrl;
        }
    } else {
        // Modo añadir
        modalTitle.textContent = 'Añadir Servicio';
        document.getElementById('service-id').value = '';
    }
    
    // Mostrar modal con una animación suave
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Cerrar el modal de servicio
function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Guardar un servicio (nuevo o editado)
function saveService() {
    const serviceId = document.getElementById('service-id').value;
    const name = document.getElementById('service-name').value;
    const description = document.getElementById('service-description').value;
    const price = parseFloat(document.getElementById('service-price').value);
    const duration = parseInt(document.getElementById('service-duration').value);
    const imageUrl = document.getElementById('service-image').value;
    
    if (!name || !description || isNaN(price) || isNaN(duration) || !imageUrl) {
        // Mostrar error si faltan campos
        alert('Por favor, completa todos los campos correctamente');
        return;
    }
    
    const services = JSON.parse(localStorage.getItem('barberwebServices') || '[]');
    
    if (serviceId) {
        // Editar servicio existente
        const index = services.findIndex(s => s.id === parseInt(serviceId));
        
        if (index !== -1) {
            services[index] = {
                ...services[index],
                name,
                description,
                price,
                duration,
                imageUrl
            };
        }
        
        showAlert('Servicio actualizado correctamente', 'success');
    } else {
        // Añadir nuevo servicio
        const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
        
        services.push({
            id: newId,
            name,
            description,
            price,
            duration,
            imageUrl
        });
        
        showAlert('Servicio añadido correctamente', 'success');
    }
    
    // Guardar cambios y actualizar tabla
    localStorage.setItem('barberwebServices', JSON.stringify(services));
    loadServices();
    
    // Cerrar modal
    closeServiceModal();
}

// Eliminar un servicio
function deleteService(serviceId) {
    if (!confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
        return;
    }
    
    // Verificar si el servicio está siendo usado en citas
    const appointments = JSON.parse(localStorage.getItem('barberwebAppointments') || '[]');
    const serviceInUse = appointments.some(appointment => appointment.serviceId === serviceId);
    
    if (serviceInUse) {
        alert('No se puede eliminar este servicio porque está siendo utilizado en citas existentes.');
        return;
    }
    
    const services = JSON.parse(localStorage.getItem('barberwebServices') || '[]');
    const updatedServices = services.filter(service => service.id !== serviceId);
    
    localStorage.setItem('barberwebServices', JSON.stringify(updatedServices));
    
    // Actualizar tabla
    loadServices();
    
    showAlert('Servicio eliminado correctamente', 'success');
}

// ---- GESTIÓN DE BARBEROS ----

// Configurar la gestión de barberos
function setupBarbersManagement() {
    // Botón para añadir barbero
    const addBarberBtn = document.getElementById('add-barber-btn');
    if (addBarberBtn) {
        addBarberBtn.addEventListener('click', () => openBarberModal());
    }
    
    // Formulario para añadir/editar barbero
    const barberForm = document.getElementById('barber-form');
    if (barberForm) {
        barberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveBarber();
        });
    }
    
    // Botón para cancelar
    const cancelButton = document.getElementById('cancel-barber');
    if (cancelButton) {
        cancelButton.addEventListener('click', closeBarberModal);
    }
    
    // Botón de cerrar modal
    const closeButton = document.querySelector('#barber-modal .close');
    if (closeButton) {
        closeButton.addEventListener('click', closeBarberModal);
    }
    
    // Cargar barberos si estamos en la sección de barberos
    if (document.getElementById('barbers-section') && 
        document.getElementById('barbers-section').classList.contains('active')) {
        loadBarbers();
    }
}

// Cargar barberos en la tabla
function loadBarbers() {
    const tableBody = document.getElementById('barbers-table-body');
    if (!tableBody) return;
    
    const barbers = JSON.parse(localStorage.getItem('barberwebBarbers') || '[]');
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Mostrar mensaje si no hay barberos
    if (barbers.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="7" style="text-align: center;">No hay barberos registrados</td>';
        tableBody.appendChild(row);
        return;
    }
    
    // Mostrar barberos en la tabla
    barbers.forEach(barber => {
        const row = document.createElement('tr');
        
        // Traducir estado a texto legible
        let statusText = '';
        let statusClass = '';
        
        switch (barber.status) {
            case 'active':
                statusText = 'Activo';
                statusClass = 'status-active';
                break;
            case 'vacation':
                statusText = 'Vacaciones';
                statusClass = 'status-vacation';
                break;
            case 'inactive':
                statusText = 'Inactivo';
                statusClass = 'status-inactive';
                break;
            default:
                statusText = 'Desconocido';
        }
        
        row.innerHTML = `
            <td>${barber.id}</td>
            <td>
                <img src="${barber.imageUrl}" alt="${barber.name}" class="barber-image">
            </td>
            <td>${barber.name}</td>
            <td>${barber.specialty}</td>
            <td>${barber.experience} años</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td class="action-buttons">
                <button class="btn-action btn-edit" data-id="${barber.id}" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action btn-delete" data-id="${barber.id}" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        // Añadir eventos a los botones
        const editButton = row.querySelector('.btn-edit');
        editButton.addEventListener('click', () => openBarberModal(barber.id));
        
        const deleteButton = row.querySelector('.btn-delete');
        deleteButton.addEventListener('click', () => deleteBarber(barber.id));
        
        tableBody.appendChild(row);
    });
}

// Abrir el modal para añadir o editar un barbero
function openBarberModal(barberId = null) {
    const modal = document.getElementById('barber-modal');
    const modalTitle = document.getElementById('barber-modal-title');
    
    // Limpiar formulario
    document.getElementById('barber-form').reset();
    
    if (barberId) {
        // Modo edición
        modalTitle.textContent = 'Editar Barbero';
        
        const barbers = JSON.parse(localStorage.getItem('barberwebBarbers') || '[]');
        const barber = barbers.find(b => b.id === barberId);
        
        if (barber) {
            document.getElementById('barber-id').value = barber.id;
            document.getElementById('barber-name').value = barber.name;
            document.getElementById('barber-specialty').value = barber.specialty;
            document.getElementById('barber-experience').value = barber.experience;
            document.getElementById('barber-bio').value = barber.bio;
            document.getElementById('barber-image').value = barber.imageUrl;
            document.getElementById('barber-status').value = barber.status;
        }
    } else {
        // Modo añadir
        modalTitle.textContent = 'Añadir Barbero';
        document.getElementById('barber-id').value = '';
    }
    
    // Mostrar modal con una animación suave
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Cerrar el modal de barbero
function closeBarberModal() {
    const modal = document.getElementById('barber-modal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Guardar un barbero (nuevo o editado)
function saveBarber() {
    const barberId = document.getElementById('barber-id').value;
    const name = document.getElementById('barber-name').value;
    const specialty = document.getElementById('barber-specialty').value;
    const experience = parseInt(document.getElementById('barber-experience').value);
    const bio = document.getElementById('barber-bio').value;
    const imageUrl = document.getElementById('barber-image').value;
    const status = document.getElementById('barber-status').value;
    
    if (!name || !specialty || isNaN(experience) || !bio || !imageUrl || !status) {
        // Mostrar error si faltan campos
        alert('Por favor, completa todos los campos correctamente');
        return;
    }
    
    const barbers = JSON.parse(localStorage.getItem('barberwebBarbers') || '[]');
    
    if (barberId) {
        // Editar barbero existente
        const index = barbers.findIndex(b => b.id === parseInt(barberId));
        
        if (index !== -1) {
            barbers[index] = {
                ...barbers[index],
                name,
                specialty,
                experience,
                bio,
                imageUrl,
                status
            };
        }
        
        showAlert('Barbero actualizado correctamente', 'success');
    } else {
        // Añadir nuevo barbero
        const newId = barbers.length > 0 ? Math.max(...barbers.map(b => b.id)) + 1 : 1;
        
        barbers.push({
            id: newId,
            name,
            specialty,
            experience,
            bio,
            imageUrl,
            status
        });
        
        showAlert('Barbero añadido correctamente', 'success');
    }
    
    // Guardar cambios y actualizar tabla
    localStorage.setItem('barberwebBarbers', JSON.stringify(barbers));
    loadBarbers();
    
    // Cerrar modal
    closeBarberModal();
}

// Eliminar un barbero
function deleteBarber(barberId) {
    if (!confirm('¿Estás seguro de que deseas eliminar este barbero?')) {
        return;
    }
    
    // Verificar si el barbero está siendo usado en citas
    const appointments = JSON.parse(localStorage.getItem('barberwebAppointments') || '[]');
    const barberInUse = appointments.some(appointment => appointment.barberId === barberId);
    
    if (barberInUse) {
        alert('No se puede eliminar este barbero porque tiene citas asignadas.');
        return;
    }
    
    const barbers = JSON.parse(localStorage.getItem('barberwebBarbers') || '[]');
    const updatedBarbers = barbers.filter(barber => barber.id !== barberId);
    
    localStorage.setItem('barberwebBarbers', JSON.stringify(updatedBarbers));
    
    // Actualizar tabla
    loadBarbers();
    
    showAlert('Barbero eliminado correctamente', 'success');
}

// Añadir estilos CSS para los indicadores de estado
function addStatusStyles() {
    // Solo añadir los estilos si no existen
    if (!document.getElementById('status-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'status-styles';
        styleSheet.textContent = `
            .status-badge {
                display: inline-block;
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                text-align: center;
            }
            .status-active {
                background-color: rgba(39, 174, 96, 0.2);
                color: #27AE60;
            }
            .status-vacation {
                background-color: rgba(241, 196, 15, 0.2);
                color: #F1C40F;
            }
            .status-inactive {
                background-color: rgba(192, 57, 43, 0.2);
                color: #C0392B;
            }
            .stock-low {
                background-color: rgba(231, 76, 60, 0.2);
                color: #E74C3C;
            }
            .stock-medium {
                background-color: rgba(241, 196, 15, 0.2);
                color: #F1C40F;
            }
            .stock-high {
                background-color: rgba(39, 174, 96, 0.2);
                color: #27AE60;
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// ---- GESTIÓN DE PRODUCTOS ----

// Configurar la gestión de productos
function setupProductsManagement() {
    // Botón para añadir producto
    const addProductBtn = document.getElementById('add-product-btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => openProductModal());
    }
    
    // Formulario para añadir/editar producto
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProduct();
        });
    }
    
    // Botón para cancelar
    const cancelButton = document.getElementById('cancel-product');
    if (cancelButton) {
        cancelButton.addEventListener('click', closeProductModal);
    }
    
    // Botón de cerrar modal
    const closeButton = document.querySelector('#product-modal .close');
    if (closeButton) {
        closeButton.addEventListener('click', closeProductModal);
    }
    
    // Cargar productos si estamos en la sección de productos
    if (document.getElementById('products-section') && 
        document.getElementById('products-section').classList.contains('active')) {
        loadProducts();
    }
}

// Cargar productos en la tabla
function loadProducts() {
    const tableBody = document.getElementById('products-table-body');
    if (!tableBody) return;
    
    const products = JSON.parse(localStorage.getItem('barberwebProducts') || '[]');
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Mostrar mensaje si no hay productos
    if (products.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="8" style="text-align: center;">No hay productos registrados</td>';
        tableBody.appendChild(row);
        return;
    }
    
    // Mostrar productos en la tabla
    products.forEach(product => {
        const row = document.createElement('tr');
        
        // Determinar estado del stock
        let stockClass = '';
        if (product.stock <= 5) {
            stockClass = 'stock-low';
        } else if (product.stock <= 20) {
            stockClass = 'stock-medium';
        } else {
            stockClass = 'stock-high';
        }
        
        // Traducir categoría a texto legible en español
        let categoryText = '';
        switch (product.category) {
            case 'shampoo':
                categoryText = 'Champú';
                break;
            case 'conditioner':
                categoryText = 'Acondicionador';
                break;
            case 'styling':
                categoryText = 'Productos de peinado';
                break;
            case 'beard':
                categoryText = 'Cuidado de barba';
                break;
            case 'skincare':
                categoryText = 'Cuidado facial';
                break;
            case 'accessories':
                categoryText = 'Accesorios';
                break;
            default:
                categoryText = product.category || 'Sin categoría';
        }
        
        row.innerHTML = `
            <td>${product.id}</td>
            <td>
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
            </td>
            <td>${product.name}</td>
            <td class="description-cell">${product.description.substring(0, 50)}${product.description.length > 50 ? '...' : ''}</td>
            <td>${product.price.toFixed(2)} €</td>
            <td><span class="status-badge ${stockClass}">${product.stock} uds.</span></td>
            <td>${categoryText}</td>
            <td class="action-buttons">
                <button class="btn-action btn-edit" data-id="${product.id}" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action btn-delete" data-id="${product.id}" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        // Añadir eventos a los botones
        const editButton = row.querySelector('.btn-edit');
        editButton.addEventListener('click', () => openProductModal(product.id));
        
        const deleteButton = row.querySelector('.btn-delete');
        deleteButton.addEventListener('click', () => deleteProduct(product.id));
        
        tableBody.appendChild(row);
    });
}

// Abrir el modal para añadir o editar un producto
function openProductModal(productId = null) {
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('product-modal-title');
    
    // Limpiar formulario
    document.getElementById('product-form').reset();
    
    if (productId) {
        // Modo edición
        modalTitle.textContent = 'Editar Producto';
        
        const products = JSON.parse(localStorage.getItem('barberwebProducts') || '[]');
        const product = products.find(p => p.id === productId);
        
        if (product) {
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-description').value = product.description;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-stock').value = product.stock;
            document.getElementById('product-category').value = product.category;
            document.getElementById('product-image').value = product.imageUrl;
        }
    } else {
        // Modo añadir
        modalTitle.textContent = 'Añadir Producto';
        document.getElementById('product-id').value = '';
    }
    
    // Mostrar modal con una animación suave
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Cerrar el modal de producto
function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Guardar un producto (nuevo o editado)
function saveProduct() {
    const productId = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    const category = document.getElementById('product-category').value;
    const imageUrl = document.getElementById('product-image').value;
    
    if (!name || !description || isNaN(price) || isNaN(stock) || !category || !imageUrl) {
        // Mostrar error si faltan campos
        alert('Por favor, completa todos los campos correctamente');
        return;
    }
    
    const products = JSON.parse(localStorage.getItem('barberwebProducts') || '[]');
    
    if (productId) {
        // Editar producto existente
        const index = products.findIndex(p => p.id === parseInt(productId));
        
        if (index !== -1) {
            products[index] = {
                ...products[index],
                name,
                description,
                price,
                stock,
                category,
                imageUrl
            };
        }
        
        showAlert('Producto actualizado correctamente', 'success');
    } else {
        // Añadir nuevo producto
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        
        products.push({
            id: newId,
            name,
            description,
            price,
            stock,
            category,
            imageUrl
        });
        
        showAlert('Producto añadido correctamente', 'success');
    }
    
    // Guardar cambios y actualizar tabla
    localStorage.setItem('barberwebProducts', JSON.stringify(products));
    loadProducts();
    
    // Cerrar modal
    closeProductModal();
}

// Eliminar un producto
function deleteProduct(productId) {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        return;
    }
    
    // Aquí podríamos añadir verificaciones adicionales si fuera necesario
    // Por ejemplo, comprobar si el producto está en pedidos pendientes, etc.
    
    const products = JSON.parse(localStorage.getItem('barberwebProducts') || '[]');
    const updatedProducts = products.filter(product => product.id !== productId);
    
    localStorage.setItem('barberwebProducts', JSON.stringify(updatedProducts));
    
    // Actualizar tabla
    loadProducts();
    
    showAlert('Producto eliminado correctamente', 'success');
}

// ---- GESTIÓN DEL CALENDARIO DE CITAS ----

let currentCalendarDate = new Date();
let selectedBarberId = '';

// Configurar el calendario de citas
function setupAppointmentsCalendar() {
    // Configurar navegación del calendario
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const barberFilter = document.getElementById('barber-filter');
    const viewAllBtn = document.getElementById('view-all');
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            loadCalendar();
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            loadCalendar();
        });
    }
    
    if (barberFilter) {
        // Cargar opciones de barberos
        loadBarberOptions();
        
        barberFilter.addEventListener('change', function() {
            selectedBarberId = this.value;
            viewAllBtn.classList.remove('active');
            loadCalendar();
        });
    }
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            selectedBarberId = '';
            if (barberFilter) barberFilter.value = '';
            this.classList.add('active');
            loadCalendar();
        });
    }
    
    // Configurar modal de detalles de cita
    const closeButtons = document.querySelectorAll('#appointment-details-modal .close, #close-details-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeAppointmentModal);
    });
    
    // Botón para cancelar cita
    const cancelAppointmentBtn = document.getElementById('cancel-appointment-btn');
    if (cancelAppointmentBtn) {
        cancelAppointmentBtn.addEventListener('click', () => {
            const appointmentId = cancelAppointmentBtn.getAttribute('data-id');
            if (appointmentId) cancelAppointment(appointmentId);
        });
    }
    
    // Cargar el calendario si estamos en la sección de citas
    if (document.getElementById('appointments-section') && 
        document.getElementById('appointments-section').classList.contains('active')) {
        loadCalendar();
    }
}

// Cargar las opciones de barberos en el filtro
function loadBarberOptions() {
    const barberFilter = document.getElementById('barber-filter');
    if (!barberFilter) return;
    
    const barbers = JSON.parse(localStorage.getItem('barberwebBarbers') || '[]');
    
    // Mantener solo la opción "Seleccionar barbero"
    barberFilter.innerHTML = '<option value="">Seleccionar barbero</option>';
    
    // Filtrar solo barberos activos y añadir opciones
    barbers.filter(barber => barber.status === 'active').forEach(barber => {
        const option = document.createElement('option');
        option.value = barber.id;
        option.textContent = barber.name;
        barberFilter.appendChild(option);
    });
}

// Cargar el calendario con las citas
function loadCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthDisplay = document.getElementById('current-month-display');
    
    if (!calendarGrid || !monthDisplay) return;
    
    // Mostrar mes y año actual
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    monthDisplay.textContent = `${monthNames[currentCalendarDate.getMonth()]} ${currentCalendarDate.getFullYear()}`;
    
    // Calcular el primer día del mes (0 = domingo, 1 = lunes, ...)
    const firstDay = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), 1);
    let startingDay = firstDay.getDay(); // 0 (domingo) a 6 (sábado)
    startingDay = startingDay === 0 ? 6 : startingDay - 1; // Convertir a 0 (lunes) a 6 (domingo)
    
    // Último día del mes
    const lastDay = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, 0);
    const totalDays = lastDay.getDate();
    
    // Limpiar calendario
    calendarGrid.innerHTML = '';
    
    // Cargar citas
    const appointments = JSON.parse(localStorage.getItem('barberwebAppointments') || '[]');
    const services = JSON.parse(localStorage.getItem('barberwebServices') || '[]');
    const barbers = JSON.parse(localStorage.getItem('barberwebBarbers') || '[]');
    
    // Añadir días en blanco antes del primer día del mes
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Añadir los días del mes
    for (let day = 1; day <= totalDays; day++) {
        const currentDate = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), day);
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Verificar si es hoy
        const today = new Date();
        if (currentDate.getDate() === today.getDate() && 
            currentDate.getMonth() === today.getMonth() && 
            currentDate.getFullYear() === today.getFullYear()) {
            dayElement.classList.add('today');
        }
        
        // Crear encabezado del día
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        dayElement.appendChild(dayHeader);
        
        // Contenedor de citas
        const appointmentsContainer = document.createElement('div');
        appointmentsContainer.className = 'day-appointments';
        
        // Filtrar citas para este día y barbero (si se seleccionó uno)
        const dayAppointments = appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.date);
            const sameDay = appointmentDate.getDate() === currentDate.getDate() && 
                           appointmentDate.getMonth() === currentDate.getMonth() && 
                           appointmentDate.getFullYear() === currentDate.getFullYear();
                           
            return sameDay && (selectedBarberId ? appointment.barberId === parseInt(selectedBarberId) : true);
        });
        
        // Añadir citas al día
        dayAppointments.forEach(appointment => {
            const appointmentDiv = document.createElement('div');
            appointmentDiv.className = 'calendar-appointment';
            
            // Buscar detalles del servicio y barbero
            const service = services.find(s => s.id === appointment.serviceId) || { name: 'Servicio desconocido' };
            const barber = barbers.find(b => b.id === appointment.barberId) || { name: 'Barbero desconocido' };
            
            appointmentDiv.innerHTML = `
                <div class="appointment-time">${appointment.time}</div>
                <div class="appointment-info">
                    <span class="appointment-service">${service.name}</span>
                    <span class="appointment-client">${appointment.clientName}</span>
                </div>
            `;
            
            // Añadir evento para mostrar detalles
            appointmentDiv.addEventListener('click', () => showAppointmentDetails(appointment));
            
            appointmentsContainer.appendChild(appointmentDiv);
        });
        
        dayElement.appendChild(appointmentsContainer);
        calendarGrid.appendChild(dayElement);
    }
}

// Mostrar detalles de una cita
function showAppointmentDetails(appointment) {
    const modal = document.getElementById('appointment-details-modal');
    const detailsContent = document.getElementById('appointment-details-content');
    const cancelBtn = document.getElementById('cancel-appointment-btn');
    
    if (!modal || !detailsContent) return;
    
    // Buscar detalles adicionales
    const services = JSON.parse(localStorage.getItem('barberwebServices') || '[]');
    const barbers = JSON.parse(localStorage.getItem('barberwebBarbers') || '[]');
    const users = JSON.parse(localStorage.getItem('barberwebUsers') || '[]');
    
    const service = services.find(s => s.id === appointment.serviceId) || { name: 'Servicio desconocido', price: 0 };
    const barber = barbers.find(b => b.id === appointment.barberId) || { name: 'Barbero desconocido' };
    const user = users.find(u => u.id === appointment.userId);
    
    // Formatear fecha
    const appointmentDate = new Date(appointment.date);
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = appointmentDate.toLocaleDateString('es-ES', dateOptions);
    
    // Mostrar detalles
    detailsContent.innerHTML = `
        <div class="appointment-detail-row">
            <span class="detail-label">Cliente:</span>
            <span class="detail-value">${appointment.clientName}</span>
        </div>
        <div class="appointment-detail-row">
            <span class="detail-label">Email:</span>
            <span class="detail-value">${user ? user.email : appointment.clientEmail || '-'}</span>
        </div>
        <div class="appointment-detail-row">
            <span class="detail-label">Teléfono:</span>
            <span class="detail-value">${user ? user.phone : appointment.clientPhone || '-'}</span>
        </div>
        <div class="appointment-detail-row">
            <span class="detail-label">Fecha:</span>
            <span class="detail-value">${formattedDate}</span>
        </div>
        <div class="appointment-detail-row">
            <span class="detail-label">Hora:</span>
            <span class="detail-value">${appointment.time}</span>
        </div>
        <div class="appointment-detail-row">
            <span class="detail-label">Servicio:</span>
            <span class="detail-value">${service.name}</span>
        </div>
        <div class="appointment-detail-row">
            <span class="detail-label">Precio:</span>
            <span class="detail-value">${service.price.toFixed(2)} €</span>
        </div>
        <div class="appointment-detail-row">
            <span class="detail-label">Barbero:</span>
            <span class="detail-value">${barber.name}</span>
        </div>
        <div class="appointment-detail-row">
            <span class="detail-label">Estado:</span>
            <span class="detail-value status-badge ${appointment.status === 'cancelled' ? 'status-inactive' : 'status-active'}">
            ${appointment.status === 'cancelled' ? 'Cancelada' : 'Confirmada'}</span>
        </div>
        ${appointment.notes ? `<div class="appointment-detail-row">
            <span class="detail-label">Notas:</span>
            <span class="detail-value">${appointment.notes}</span>
        </div>` : ''}
    `;
    
    // Actualizar botones
    if (cancelBtn) {
        cancelBtn.setAttribute('data-id', appointment.id);
        cancelBtn.style.display = appointment.status === 'cancelled' ? 'none' : 'inline-block';
    }
    
    // Mostrar modal
    modal.style.display = 'block';
}

// Cerrar el modal de detalles de cita
function closeAppointmentModal() {
    const modal = document.getElementById('appointment-details-modal');
    if (modal) modal.style.display = 'none';
}

// Cancelar una cita
function cancelAppointment(appointmentId) {
    if (!confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
        return;
    }
    
    const appointments = JSON.parse(localStorage.getItem('barberwebAppointments') || '[]');
    const index = appointments.findIndex(a => a.id === parseInt(appointmentId));
    
    if (index !== -1) {
        appointments[index].status = 'cancelled';
        localStorage.setItem('barberwebAppointments', JSON.stringify(appointments));
        
        showAlert('Cita cancelada correctamente', 'success');
        
        // Cerrar modal y recargar calendario
        closeAppointmentModal();
        loadCalendar();
    }
}

// ---- GESTIÓN DE USUARIOS ----

// Configurar la gestión de usuarios
function setupUsersManagement() {
    // Configurar búsqueda
    const searchInput = document.getElementById('user-search');
    const searchBtn = document.getElementById('search-user-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            loadUsers(searchTerm);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim().toLowerCase();
                loadUsers(searchTerm);
            }
        });
    }
    
    // Configurar filtro de tiempo
    const timeFilter = document.getElementById('time-filter');
    if (timeFilter) {
        timeFilter.addEventListener('change', () => {
            const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
            loadUsers(searchTerm);
        });
    }
    
    // Configurar modal de historial
    const closeButtons = document.querySelectorAll('#user-history-modal .close, #close-history-btn');
    closeButtons.forEach(btn => {
        if (btn) btn.addEventListener('click', closeHistoryModal);
    });
    
    // Cargar usuarios si estamos en la sección de usuarios
    if (document.getElementById('users-section') && 
        document.getElementById('users-section').classList.contains('active')) {
        loadUsers();
    }
}

// Cargar usuarios con servicios recientes
function loadUsers(searchTerm = '') {
    const tableBody = document.getElementById('users-table-body');
    const timeFilter = document.getElementById('time-filter');
    
    if (!tableBody) return;
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Obtener datos
    const appointments = JSON.parse(localStorage.getItem('barberwebAppointments') || '[]');
    const users = JSON.parse(localStorage.getItem('barberwebUsers') || '[]');
    const services = JSON.parse(localStorage.getItem('barberwebServices') || '[]');
    const barbers = JSON.parse(localStorage.getItem('barberwebBarbers') || '[]');
    
    // Filtrar por tiempo
    const now = new Date();
    const daysFilter = timeFilter ? parseInt(timeFilter.value) || 0 : 30;
    
    const filteredAppointments = daysFilter === 'all' ? appointments : appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        const diffTime = Math.abs(now - appointmentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= daysFilter;
    });
    
    // Agrupar citas por usuario
    const userAppointments = {};
    
    filteredAppointments.forEach(appointment => {
        // Si el usuario no tiene ID de usuario, crearlo temporal con el email
        const userId = appointment.userId || `temp_${appointment.clientEmail}`;
        
        if (!userAppointments[userId]) {
            userAppointments[userId] = [];
        }
        userAppointments[userId].push(appointment);
    });
    
    // Crear array con usuarios y sus citas
    const usersWithAppointments = [];
    
    for (const userId in userAppointments) {
        // Buscar usuario en el sistema o crear uno temporal
        let user;
        
        if (userId.startsWith('temp_')) {
            // Crear usuario temporal a partir de la primera cita
            const firstAppointment = userAppointments[userId][0];
            user = {
                id: userId,
                name: firstAppointment.clientName,
                email: firstAppointment.clientEmail,
                phone: firstAppointment.clientPhone || 'No disponible',
                isTemp: true
            };
        } else {
            // Buscar usuario registrado
            user = users.find(u => u.id === parseInt(userId));
            if (!user) continue;
        }
        
        // Obtener la última cita
        const sortedAppointments = userAppointments[userId].sort((a, b) => 
            new Date(b.date) - new Date(a.date));
        const lastAppointment = sortedAppointments[0];
        
        // Buscar detalles de servicio y barbero
        const service = services.find(s => s.id === lastAppointment.serviceId);
        const barber = barbers.find(b => b.id === lastAppointment.barberId);
        
        // Calcular total gastado
        const totalSpent = sortedAppointments.reduce((total, app) => {
            const appService = services.find(s => s.id === app.serviceId);
            return total + (appService ? appService.price : 0);
        }, 0);
        
        // Formatear fecha
        const lastDate = new Date(lastAppointment.date);
        const formattedDate = lastDate.toLocaleDateString('es-ES');
        
        // Añadir a la lista final
        usersWithAppointments.push({
            user,
            lastAppointment,
            service: service || { name: 'Servicio desconocido' },
            barber: barber || { name: 'Barbero desconocido' },
            formattedDate,
            totalAppointments: sortedAppointments.length,
            totalSpent,
            appointments: sortedAppointments
        });
    }
    
    // Filtrar por término de búsqueda
    let displayUsers = usersWithAppointments;
    
    if (searchTerm) {
        displayUsers = usersWithAppointments.filter(item => {
            return (
                item.user.name.toLowerCase().includes(searchTerm) ||
                item.user.email.toLowerCase().includes(searchTerm) ||
                (item.user.phone && item.user.phone.toLowerCase().includes(searchTerm))
            );
        });
    }
    
    // Mostrar mensaje si no hay usuarios
    if (displayUsers.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="9" style="text-align: center;">No se encontraron usuarios con citas en el periodo seleccionado</td>';
        tableBody.appendChild(row);
        return;
    }
    
    // Mostrar usuarios en la tabla
    displayUsers.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.user.id}</td>
            <td>${item.user.name}</td>
            <td>${item.user.email}</td>
            <td>${item.user.phone}</td>
            <td>${item.formattedDate}</td>
            <td>${item.totalAppointments}</td>
            <td>${item.barber.name}</td>
            <td>${item.totalSpent.toFixed(2)} €</td>
            <td class="action-buttons">
                <button class="btn-action btn-view" data-id="${item.user.id}" title="Ver historial">
                    <i class="fas fa-history"></i>
                </button>
            </td>
        `;
        
        // Añadir evento para ver historial
        const viewButton = row.querySelector('.btn-view');
        viewButton.addEventListener('click', () => showUserHistory(item));
        
        tableBody.appendChild(row);
    });
}

// Mostrar historial de usuario
function showUserHistory(userInfo) {
    const modal = document.getElementById('user-history-modal');
    const nameDisplay = document.getElementById('user-name-display');
    const totalAppointments = document.getElementById('total-appointments');
    const totalSpent = document.getElementById('total-spent');
    const favoriteBarber = document.getElementById('favorite-barber');
    const favoriteService = document.getElementById('favorite-service');
    const historyTableBody = document.getElementById('history-table-body');
    
    if (!modal || !historyTableBody) return;
    
    // Mostrar nombre
    if (nameDisplay) nameDisplay.textContent = userInfo.user.name;
    
    // Mostrar estadísticas
    if (totalAppointments) totalAppointments.textContent = userInfo.totalAppointments;
    if (totalSpent) totalSpent.textContent = `${userInfo.totalSpent.toFixed(2)} €`;
    
    // Calcular barbero favorito
    const barberCounts = {};
    userInfo.appointments.forEach(app => {
        barberCounts[app.barberId] = (barberCounts[app.barberId] || 0) + 1;
    });
    
    let maxCount = 0;
    let favoriteBarberId = null;
    
    for (const id in barberCounts) {
        if (barberCounts[id] > maxCount) {
            maxCount = barberCounts[id];
            favoriteBarberId = parseInt(id);
        }
    }
    
    const barbers = JSON.parse(localStorage.getItem('barberwebBarbers') || '[]');
    const favBarber = barbers.find(b => b.id === favoriteBarberId);
    
    if (favoriteBarber) {
        favoriteBarber.textContent = favBarber ? favBarber.name : '-';
    }
    
    // Calcular servicio favorito
    const serviceCounts = {};
    userInfo.appointments.forEach(app => {
        serviceCounts[app.serviceId] = (serviceCounts[app.serviceId] || 0) + 1;
    });
    
    maxCount = 0;
    let favoriteServiceId = null;
    
    for (const id in serviceCounts) {
        if (serviceCounts[id] > maxCount) {
            maxCount = serviceCounts[id];
            favoriteServiceId = parseInt(id);
        }
    }
    
    const services = JSON.parse(localStorage.getItem('barberwebServices') || '[]');
    const favService = services.find(s => s.id === favoriteServiceId);
    
    if (favoriteService) {
        favoriteService.textContent = favService ? favService.name : '-';
    }
    
    // Limpiar tabla de historial
    historyTableBody.innerHTML = '';
    
    // Ordenar citas por fecha (más recientes primero)
    const sortedAppointments = [...userInfo.appointments].sort((a, b) => 
        new Date(b.date) - new Date(a.date));
    
    // Mostrar historial de citas
    sortedAppointments.forEach(appointment => {
        const service = services.find(s => s.id === appointment.serviceId) || { name: 'Desconocido', price: 0 };
        const barber = barbers.find(b => b.id === appointment.barberId) || { name: 'Desconocido' };
        
        const appointmentDate = new Date(appointment.date);
        const formattedDate = appointmentDate.toLocaleDateString('es-ES') + ' ' + appointment.time;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${service.name}</td>
            <td>${barber.name}</td>
            <td>${service.price.toFixed(2)} €</td>
        `;
        
        // Marcar citas canceladas
        if (appointment.status === 'cancelled') {
            row.classList.add('cancelled-appointment');
        }
        
        historyTableBody.appendChild(row);
    });
    
    // Mostrar modal
    modal.style.display = 'block';
}

// Cerrar el modal de historial
function closeHistoryModal() {
    const modal = document.getElementById('user-history-modal');
    if (modal) modal.style.display = 'none';
}

// Función para mostrar alertas
function showAlert(message, type = 'info') {
    // Solo crear el contenedor si no existe
    let alertContainer = document.querySelector('.alert-container');
    
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.className = 'alert-container';
        document.body.appendChild(alertContainer);
    }
    
    // Crear la alerta
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Añadir a la página
    alertContainer.appendChild(alert);
    
    // Animar entrada
    setTimeout(() => alert.classList.add('show'), 10);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}
