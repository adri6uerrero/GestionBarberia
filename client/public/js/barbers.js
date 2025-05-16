// Datos de barberos para la aplicación
const barbersData = [
  {
    id: 1,
    name: 'Carlos',
    specialty: 'Cortes modernos y diseño de barba',
    experience: '8 años',
    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
  },
  {
    id: 2,
    name: 'Manuel',
    specialty: 'Degradados y estilos clásicos',
    experience: '5 años',
    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
  },
  {
    id: 3,
    name: 'Roberto',
    specialty: 'Barbas y estilos vintage',
    experience: '10 años',
    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
  }
];

// Función para inicializar selección de barbero
function initBarberSelection() {
  document.querySelectorAll('.barber-card').forEach(card => {
    card.addEventListener('click', function() {
      // Deseleccionar todos los barberos
      document.querySelectorAll('.barber-card').forEach(c => c.classList.remove('selected'));
      
      // Seleccionar este barbero
      this.classList.add('selected');
      
      // Guardar barbero seleccionado
      const barberId = parseInt(this.dataset.id);
      const selectedBarberData = barbersData.find(barber => barber.id === barberId);
      
      if (selectedBarberData) {
        selectedBarber = selectedBarberData;
        
        // Habilitar botón para continuar
        document.getElementById('to-step-3').disabled = false;
      }
    });
  });
}
