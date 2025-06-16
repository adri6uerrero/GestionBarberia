// Función para verificar si el usuario está logueado
function isLoggedIn() {
    return localStorage.getItem('barberwebUser') !== null;
}

// Script para corregir navegación
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado y es administrador
    if (!isLoggedIn()) {
        window.location.href = '../../pages/login.html';
        return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('barberwebUser'));
    if (currentUser.role !== 'admin') {
        window.location.href = '../../index.html';
        alert('Acceso restringido. Solo administradores pueden acceder a esta página.');
        return;
    }
    
    // Configurar botón de cerrar sesión
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('barberwebUser');
            window.location.href = '/index.html'; // Usar ruta absoluta desde la raíz
        });
    }
    
    // Obtener todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const sections = document.querySelectorAll('.dashboard-section');
    
    // Quitar evento click existente y añadir uno nuevo
    navLinks.forEach(link => {
        // Clonar y reemplazar para eliminar eventos anteriores
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Añadir nuevo evento click
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            console.log('Navegando a sección:', targetSection);
            
            // Desactivar todos los enlaces y secciones
            navLinks.forEach(link => link.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Activar el enlace y sección seleccionados
            this.classList.add('active');
            
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
                console.log('Sección activada:', targetSection);
                
                // Cargar datos específicos de la sección
                if (targetSection === 'services-section' && typeof loadServices === 'function') {
                    loadServices();
                } else if (targetSection === 'barbers-section' && typeof loadBarbers === 'function') {
                    loadBarbers();
                } else if (targetSection === 'products-section' && typeof loadProducts === 'function') {
                    loadProducts();
                } else if (targetSection === 'appointments-section' && typeof loadCalendar === 'function') {
                    loadCalendar();
                } else if (targetSection === 'users-section' && typeof loadUsers === 'function') {
                    loadUsers();
                }
            } else {
                console.error('Sección no encontrada:', targetSection);
            }
        });
    });
    
    console.log('Navegación corregida. Enlaces disponibles:', navLinks.length);
    console.log('Secciones disponibles:', sections.length);
});
