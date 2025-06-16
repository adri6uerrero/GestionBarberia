// Función para verificar si el usuario está logueado
function isLoggedIn() {
    return localStorage.getItem('barberwebUser') !== null;
}

// Función para verificar si el usuario es administrador
function isAdmin() {
    const user = JSON.parse(localStorage.getItem('barberwebUser') || '{}');
    return user.role === 'admin';
}

// Función para actualizar elementos de navegación según el estado de login
function updateNavigation() {
    const loginBtn = document.querySelector('.btn-login');
    
    if (loginBtn) {
        if (isLoggedIn()) {
            const user = JSON.parse(localStorage.getItem('barberwebUser'));
            loginBtn.textContent = user.name;
            loginBtn.href = isAdmin() ? 'pages/admin/dashboard.html' : 'pages/profile.html';
            
            // Agregar menú desplegable para logout
            loginBtn.addEventListener('click', function(e) {
                const isDropdownVisible = document.querySelector('.dropdown-menu');
                
                if (!isDropdownVisible) {
                    e.preventDefault();
                    const dropdown = document.createElement('div');
                    dropdown.className = 'dropdown-menu';
                    
                    if (isAdmin()) {
                        dropdown.innerHTML = `
                            <a href="pages/admin/dashboard.html">Dashboard</a>
                            <a href="#" id="logout">Cerrar sesión</a>
                        `;
                    } else {
                        dropdown.innerHTML = `
                            <a href="pages/profile.html">Mi Perfil</a>
                            <a href="pages/my-appointments.html">Mis Citas</a>
                            <a href="#" id="logout">Cerrar sesión</a>
                        `;
                    }
                    
                    loginBtn.parentNode.appendChild(dropdown);
                    
                    document.getElementById('logout').addEventListener('click', function() {
                        localStorage.removeItem('barberwebUser');
                        window.location.href = 'index.html';
                    });
                } else {
                    isDropdownVisible.remove();
                }
            });
        } else {
            loginBtn.textContent = 'Login';
            loginBtn.href = 'pages/login.html';
        }
    }
}

// Función para mostrar mensajes de alerta
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.classList.add('show');
        
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => alertDiv.remove(), 300);
        }, 3000);
    }, 100);
}

// Ajustar rutas relativas según la ubicación actual
function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
        return '../';
    }
    return './';
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
    
    // Añadir clase active al enlace de navegación actual
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        if (currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
});

// Datos de ejemplo para la demostración
const sampleData = {
    services: [
        { id: 1, name: 'Corte Básico', price: 15, duration: 30, description: 'Corte de pelo clásico o moderno según preferencia.', imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
        { id: 2, name: 'Arreglo de Barba', price: 10, duration: 20, description: 'Perfilado y arreglo de barba con navaja y productos especiales.', imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
        { id: 3, name: 'Corte y Barba', price: 22, duration: 45, description: 'Combinación de corte de pelo y arreglo de barba.', imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
        { id: 4, name: 'Coloración', price: 35, duration: 60, description: 'Tinte del color de tu elección con productos de calidad.', imageUrl: 'https://images.unsplash.com/photo-1634302086887-13b5585a8831?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
        { id: 5, name: 'Tratamiento Capilar', price: 28, duration: 45, description: 'Limpieza capilar profunda con productos premium.', imageUrl: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 6, name: 'Afeitado Clásico', price: 18, duration: 25, description: 'Afeitado tradicional con toalla caliente y navaja.', imageUrl: 'https://images.unsplash.com/photo-1580087433295-ab2600c1030e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
    ],
    products: [
        { id: 1, name: 'Pomada Fijadora', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Pomada para un fijado fuerte y duradero.' },
        { id: 2, name: 'Aceite para Barba', price: 15.99, imageUrl: 'https://images.unsplash.com/photo-1620018646973-e3e257a1002c?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Aceite nutritivo para el cuidado de la barba.' },
        { id: 3, name: 'Champú Anticaída', price: 16.75, imageUrl: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Champú especial para prevenir la caída del cabello.' },
        { id: 4, name: 'Cera Modeladora', price: 12.25, imageUrl: 'https://images.unsplash.com/photo-1673350963902-2a8366b3d4ca?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Cera para moldear con fijación media.' },
        { id: 5, name: 'Kit Afeitado Clásico', price: 45, imageUrl: 'https://images.unsplash.com/photo-1604368640692-027f44ffb8cf?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Kit completo con brocha, jabón y navaja.' },
        { id: 6, name: 'Peine Profesional', price: 8.50, imageUrl: 'https://images.unsplash.com/photo-1634082983637-c1382c567945?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Peine de calidad profesional para todo tipo de cabello.' }
    ],
    barbers: [
        { id: 1, name: 'Carlos Rodríguez', specialty: 'Cortes Modernos', experience: '8 años', imageUrl: 'https://plus.unsplash.com/premium_photo-1671741519429-c0465c1b5c12?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 2, name: 'Juan Martínez', specialty: 'Barbas', experience: '5 años', imageUrl: 'https://images.unsplash.com/photo-1553521041-d168abd31de3?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 3, name: 'Miguel Fernández', specialty: 'Cortes Clásicos', experience: '10 años', imageUrl: 'https://images.unsplash.com/photo-1582893561942-d61adcb2e534?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
    ]
};

// Función para cargar datos de ejemplo
function loadSampleData(forceReload = false) {
    // Forzar recarga de datos si se especifica
    if (forceReload) {
        localStorage.setItem('barberwebServices', JSON.stringify(sampleData.services));
        localStorage.setItem('barberwebProducts', JSON.stringify(sampleData.products));
        localStorage.setItem('barberwebBarbers', JSON.stringify(sampleData.barbers));
        console.log('Datos de ejemplo recargados correctamente');
        return;
    }
    
    // Cargar datos solo si no existen
    if (!localStorage.getItem('barberwebServices')) {
        localStorage.setItem('barberwebServices', JSON.stringify(sampleData.services));
    }
    
    if (!localStorage.getItem('barberwebProducts')) {
        localStorage.setItem('barberwebProducts', JSON.stringify(sampleData.products));
    }
    
    if (!localStorage.getItem('barberwebBarbers')) {
        localStorage.setItem('barberwebBarbers', JSON.stringify(sampleData.barbers));
    }
}

// Función para reiniciar los datos (para desarrollo)
function resetDemoData() {
    if (confirm('¿Estás seguro de que deseas reiniciar todos los datos de demostración? Esta acción no se puede deshacer.')) {
        loadSampleData(true);
        alert('Datos reiniciados correctamente. Recarga la página para ver los cambios.');
        window.location.reload();
    }
}

// Crear usuario administrador por defecto
function setupDefaultUsers() {
    if (!localStorage.getItem('barberwebUsers')) {
        const users = [
            {
                id: 1,
                email: 'admin@barberweb.com',
                password: 'admin123', // En una aplicación real se usaría encriptación
                name: 'Administrador',
                role: 'admin'
            },
            {
                id: 2,
                email: 'usuario@ejemplo.com',
                password: 'usuario123', // En una aplicación real se usaría encriptación
                name: 'Usuario Ejemplo',
                role: 'user'
            }
        ];
        
        localStorage.setItem('barberwebUsers', JSON.stringify(users));
    }
    
    // Crear algunas citas de ejemplo
    if (!localStorage.getItem('barberwebAppointments')) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const appointments = [
            {
                id: 1,
                userId: 2,
                serviceId: 3,
                barberId: 1,
                date: tomorrow.toISOString().split('T')[0],
                time: '10:00',
                status: 'pending'
            }
        ];
        
        localStorage.setItem('barberwebAppointments', JSON.stringify(appointments));
    }
}

// Inicialización de datos

// Cargar datos de muestra al inicializar y forzar recarga siempre
document.addEventListener('DOMContentLoaded', function() {
    // Limpiar datos antiguos
    localStorage.removeItem('barberwebServices');
    localStorage.removeItem('barberwebProducts');
    localStorage.removeItem('barberwebBarbers');
    
    // Cargar datos nuevos
    loadSampleData(true);
    setupDefaultUsers();
    console.log('Datos actualizados con nuevas imágenes: ' + new Date().toISOString() + ' - Todas las fotos de barberos actualizadas');
});
