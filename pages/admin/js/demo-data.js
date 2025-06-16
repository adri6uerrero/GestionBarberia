// Script para cargar datos de demostración
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si ya existen datos
    const hasData = localStorage.getItem('barberwebHasDemo') === 'true';
    
    if (!hasData) {
        console.log('Cargando datos de demostración...');
        loadDemoData();
        localStorage.setItem('barberwebHasDemo', 'true');
    }
});

function loadDemoData() {
    // Datos de servicios de ejemplo
    const services = [
        { id: 1, name: 'Corte Básico', duration: 30, price: 15, description: 'Corte básico de cabello', imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', active: true },
        { id: 2, name: 'Corte y Barba', duration: 45, price: 25, description: 'Corte de cabello y arreglo de barba', imageUrl: 'https://images.unsplash.com/photo-1553521041-58f98417a78d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', active: true },
        { id: 3, name: 'Afeitado Clásico', duration: 30, price: 18, description: 'Afeitado clásico con navaja y toalla caliente', imageUrl: 'https://images.unsplash.com/photo-1589984658177-27572538d16b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', active: true },
        { id: 4, name: 'Coloración', duration: 60, price: 35, description: 'Aplicación de color para cabello', imageUrl: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', active: true },
        { id: 5, name: 'Tratamiento Capilar', duration: 45, price: 28, description: 'Tratamiento para cabello dañado', imageUrl: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', active: false }
    ];
    
    // Datos de barberos de ejemplo
    const barbers = [
        { id: 1, name: 'Carlos Rodríguez', specialty: 'Cortes clásicos', experience: 5, imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', status: 'active' },
        { id: 2, name: 'Miguel Ángel', specialty: 'Barbas y degradados', experience: 8, imageUrl: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', status: 'active' },
        { id: 3, name: 'Antonio López', specialty: 'Coloración y estilos modernos', experience: 3, imageUrl: 'https://images.unsplash.com/photo-1580518337843-f959e992563b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', status: 'vacation' },
        { id: 4, name: 'Juan Martínez', specialty: 'Cortes clásicos y afeitados', experience: 7, imageUrl: 'https://images.unsplash.com/photo-1512864084360-7c0c4d0a0845?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', status: 'active' }
    ];
    
    // Datos de productos de ejemplo
    const products = [
        { id: 1, name: 'Pomada Fijadora', price: 12.99, description: 'Pomada de fijación fuerte para estilos duraderos', imageUrl: 'https://images.unsplash.com/photo-1612830085793-296674e79f36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', category: 'styling', stock: 25 },
        { id: 2, name: 'Aceite para Barba', price: 15.50, description: 'Aceite hidratante para barba con aroma a sándalo', imageUrl: 'https://images.unsplash.com/photo-1621607512614-83249aeb9bea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', category: 'beard', stock: 18 },
        { id: 3, name: 'Champú Anticaída', price: 18.75, description: 'Champú especial para prevenir la caída del cabello', imageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', category: 'hair', stock: 8 },
        { id: 4, name: 'Cera Modeladora', price: 14.25, description: 'Cera para modelar con fijación media', imageUrl: 'https://images.unsplash.com/photo-1585150781619-a42edfb54973?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', category: 'styling', stock: 32 },
        { id: 5, name: 'Kit Afeitado Clásico', price: 45.00, description: 'Kit completo con brocha, jabón y navaja', imageUrl: 'https://images.unsplash.com/photo-1518228344082-3efded9eb810?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', category: 'shaving', stock: 5 }
    ];
    
    // Datos de usuarios de ejemplo
    const users = [
        { id: 1, name: 'Juan Carlos Pérez', email: 'juancarlos@example.com', phone: '612345678', password: 'password123', role: 'client' },
        { id: 2, name: 'Luis Martínez', email: 'luis@example.com', phone: '623456789', password: 'password123', role: 'client' },
        { id: 3, name: 'Ana Rodríguez', email: 'ana@example.com', phone: '634567890', password: 'password123', role: 'client' },
        { id: 4, name: 'María López', email: 'maria@example.com', phone: '645678901', password: 'password123', role: 'client' },
        { id: 5, name: 'Admin', email: 'admin@barberweb.com', password: 'admin123', role: 'admin' }
    ];
    
    // Crear citas de ejemplo para el mes actual
    const appointments = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    // Horas disponibles
    const availableTimes = ['09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'];
    
    // Generar algunas citas para este mes
    let appointmentId = 1;
    
    // Generar citas para clientes registrados
    for (let i = 1; i <= 4; i++) {
        const user = users[i-1];
        
        // Crear 2-4 citas por usuario
        const numAppointments = 2 + Math.floor(Math.random() * 3);
        
        for (let j = 0; j < numAppointments; j++) {
            const day = 1 + Math.floor(Math.random() * 28); // Día aleatorio del mes
            const hour = availableTimes[Math.floor(Math.random() * availableTimes.length)];
            const barberId = 1 + Math.floor(Math.random() * barbers.length);
            const serviceId = 1 + Math.floor(Math.random() * services.length);
            
            // Estado aleatorio (80% confirmadas, 10% canceladas, 10% completadas)
            let status = 'confirmed';
            const statusRandom = Math.random();
            if (statusRandom > 0.9) status = 'completed';
            else if (statusRandom > 0.8) status = 'cancelled';
            
            appointments.push({
                id: appointmentId++,
                userId: user.id,
                clientName: user.name,
                clientEmail: user.email,
                clientPhone: user.phone,
                date: new Date(currentYear, currentMonth, day).toISOString().split('T')[0],
                time: hour,
                barberId: barberId,
                serviceId: serviceId,
                status: status,
                notes: ''
            });
        }
    }
    
    // Algunas citas para clientes no registrados (sin userId)
    for (let i = 0; i < 5; i++) {
        const day = 1 + Math.floor(Math.random() * 28);
        const hour = availableTimes[Math.floor(Math.random() * availableTimes.length)];
        const barberId = 1 + Math.floor(Math.random() * barbers.length);
        const serviceId = 1 + Math.floor(Math.random() * services.length);
        
        const names = ['Pedro González', 'Laura Sánchez', 'Roberto Fernández', 'Sofía Martín', 'Alejandro Díaz'];
        const emails = ['pedro@example.com', 'laura@example.com', 'roberto@example.com', 'sofia@example.com', 'alejandro@example.com'];
        const phones = ['656789012', '667890123', '678901234', '689012345', '690123456'];
        
        appointments.push({
            id: appointmentId++,
            clientName: names[i],
            clientEmail: emails[i],
            clientPhone: phones[i],
            date: new Date(currentYear, currentMonth, day).toISOString().split('T')[0],
            time: hour,
            barberId: barberId,
            serviceId: serviceId,
            status: 'confirmed',
            notes: 'Cliente sin cuenta'
        });
    }
    
    // Guardar datos en localStorage
    localStorage.setItem('barberwebServices', JSON.stringify(services));
    localStorage.setItem('barberwebBarbers', JSON.stringify(barbers));
    localStorage.setItem('barberwebProducts', JSON.stringify(products));
    localStorage.setItem('barberwebUsers', JSON.stringify(users));
    localStorage.setItem('barberwebAppointments', JSON.stringify(appointments));
    
    console.log(`Datos de demostración cargados: ${services.length} servicios, ${barbers.length} barberos, ${products.length} productos, ${users.length} usuarios, ${appointments.length} citas`);
}
