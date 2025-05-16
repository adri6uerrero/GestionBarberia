// Archivo principal que inicializa la aplicación

// Función para cargar servicios dinámicamente
function loadServices() {
  const serviceGrid = document.getElementById('service-grid');
  serviceGrid.innerHTML = '';
  
  servicesData.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';
    serviceCard.dataset.id = service.id;
    
    serviceCard.innerHTML = `
      <div class="service-img" style="background-image: url('${service.image}')"></div>
      <div class="service-details">
        <div class="service-title">${service.name}</div>
        <div class="service-description">${service.description}</div>
        <div class="service-meta">
          <div class="service-price">${service.price}€</div>
          <div class="service-duration">${service.duration} min</div>
        </div>
      </div>
    `;
    
    serviceGrid.appendChild(serviceCard);
  });
}

// Función para cargar barberos dinámicamente
function loadBarbers() {
  const barberGrid = document.getElementById('barber-grid');
  barberGrid.innerHTML = '';
  
  barbersData.forEach(barber => {
    const barberCard = document.createElement('div');
    barberCard.className = 'barber-card';
    barberCard.dataset.id = barber.id;
    
    barberCard.innerHTML = `
      <div class="barber-img">
        <img src="${barber.image}" alt="${barber.name}" />
      </div>
      <div class="barber-details">
        <div class="barber-name">${barber.name}</div>
        <div class="barber-specialty">${barber.specialty}</div>
        <div class="barber-experience">Experiencia: ${barber.experience}</div>
      </div>
    `;
    
    barberGrid.appendChild(barberCard);
  });
}

// Función para habilitar el botón de paso 1 cuando se selecciona un servicio
function enableServiceContinueButton() {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
      document.getElementById('to-step-2').disabled = false;
    });
  });
}

// Inicializar toda la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  // Cargar datos
  loadServices();
  loadBarbers();
  
  // Inicializar componentes
  initNavigation();
  initServiceSelection();
  initBarberSelection();
  initCalendar();
  initFloatingButton();
  enableServiceContinueButton();
  
  // Eventos personalizados para comunicación entre módulos
  const dateSelectedEvent = new Event('dateSelected');
  const timeSelectedEvent = new Event('timeSelected');
  
  // Sobrescribir funciones para disparar eventos
  const originalSelectDate = selectDate;
  selectDate = function(dayElement) {
    originalSelectDate(dayElement);
    document.dispatchEvent(dateSelectedEvent);
  };
  
  const originalSelectTime = selectTime;
  selectTime = function(timeSlot) {
    originalSelectTime(timeSlot);
    document.dispatchEvent(timeSelectedEvent);
  };
});
