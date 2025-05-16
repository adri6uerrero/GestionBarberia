// Datos de servicios para la aplicación
const servicesData = [
  {
    id: 1,
    name: 'Corte de Pelo',
    description: 'Corte de cabello a tijera o máquina según preferencia',
    price: 15,
    duration: 30,
    image: 'https://images.unsplash.com/photo-1634302086887-13b5281d0e48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
  },
  {
    id: 2,
    name: 'Arreglo de Barba',
    description: 'Recorte y definición de barba con navaja o máquina',
    price: 12,
    duration: 20,
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 3,
    name: 'Diseño de Cejas',
    description: 'Perfilado y diseño de cejas para hombre',
    price: 8,
    duration: 15,
    image: 'https://images.unsplash.com/photo-1514163061636-02db31852e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 4,
    name: 'Corte + Barba',
    description: 'Servicio completo de corte de pelo y arreglo de barba',
    price: 25,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1593702288056-f5834cfbef26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 5,
    name: 'Corte + Cejas',
    description: 'Servicio de corte de pelo y diseño de cejas',
    price: 20,
    duration: 40,
    image: 'https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 6,
    name: 'Servicio Completo',
    description: 'Corte de pelo, arreglo de barba y diseño de cejas',
    price: 30,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  }
];

// Función para inicializar selección de servicios
function initServiceSelection() {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
      const serviceId = parseInt(this.dataset.id);
      
      // Deseleccionar todos los servicios
      document.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
      
      // Limpiar array de servicios seleccionados
      selectedServices = [];
      
      // Añadir el servicio seleccionado
      this.classList.add('selected');
      
      // Buscar el servicio seleccionado en los datos
      const selectedService = servicesData.find(service => service.id === serviceId);
      
      if (selectedService) {
        selectedServices.push(selectedService);
        
        // Avanzar automáticamente al paso 2
        goToStep(2);
      }
    });
  });
}
