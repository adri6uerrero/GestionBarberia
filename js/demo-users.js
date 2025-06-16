/**
 * Script para crear usuarios de demostración para BarberWeb
 * Incluye un usuario administrador y un usuario cliente normal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si ya existen usuarios en el sistema
    const existingUsers = JSON.parse(localStorage.getItem('barberwebUsers') || '[]');
    
    // Solo crear usuarios de demo si no hay usuarios en el sistema
    if (existingUsers.length === 0) {
        console.log('Creando usuarios de demostración...');
        
        // Crear usuarios de demostración
        const demoUsers = [
            {
                id: 1,
                name: 'Admin Demo',
                email: 'admin@barberweb.com',
                password: 'admin123',
                role: 'admin',
                phone: '600123456',
                registerDate: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Cliente Demo',
                email: 'cliente@example.com',
                password: 'cliente123',
                role: 'user',
                phone: '600654321',
                registerDate: new Date().toISOString()
            }
        ];
        
        // Guardar en localStorage
        localStorage.setItem('barberwebUsers', JSON.stringify(demoUsers));
        console.log('Usuarios de demostración creados con éxito');
    } else {
        console.log('Ya existen usuarios en el sistema. No se crearán usuarios de demostración.');
    }
});

// Si se carga este script directamente, ejecutar la inicialización
if (typeof module === 'undefined') {
    // Ejecutar directamente si no hay usuarios
    const existingUsers = JSON.parse(localStorage.getItem('barberwebUsers') || '[]');
    if (existingUsers.length === 0) {
        // Crear usuarios de demostración
        const demoUsers = [
            {
                id: 1,
                name: 'Admin Demo',
                email: 'admin@barberweb.com',
                password: 'admin123',
                role: 'admin',
                phone: '600123456',
                registerDate: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Cliente Demo',
                email: 'cliente@example.com',
                password: 'cliente123',
                role: 'user',
                phone: '600654321',
                registerDate: new Date().toISOString()
            }
        ];
        
        // Guardar en localStorage
        localStorage.setItem('barberwebUsers', JSON.stringify(demoUsers));
        console.log('Usuarios de demostración creados manualmente');
        alert('Usuarios de demostración creados con éxito:\n\nAdministrador: admin@barberweb.com / admin123\nCliente: cliente@example.com / cliente123');
    }
}
