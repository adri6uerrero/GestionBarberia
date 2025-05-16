// Variables para almacenar la selección del usuario
let selectedServices = [];
let selectedBarber = null;
let selectedDate = null;
let selectedTime = null;

// Función para navegar entre pasos
function goToStep(stepNumber) {
  // Actualizar indicadores de pasos
  document.querySelectorAll('.step').forEach((step, index) => {
    const stepNum = index + 1;
    step.classList.remove('active', 'completed');
    
    if (stepNum < stepNumber) {
      step.classList.add('completed');
    } else if (stepNum === stepNumber) {
      step.classList.add('active');
    }
  });
  
  // Mostrar/ocultar contenido de pasos
  document.querySelectorAll('.step-content').forEach((content, index) => {
    const contentNum = index + 1;
    content.classList.remove('active');
    
    if (contentNum === stepNumber) {
      content.classList.add('active');
    }
  });
  
  // Actualizar estado de botones según el paso
  updateButtonsForStep(stepNumber);
}

// Actualizar botones según el paso actual
function updateButtonsForStep(stepNumber) {
  switch(stepNumber) {
    case 1:
      // Resaltar servicios ya seleccionados
      if (selectedServices.length > 0) {
        const serviceId = selectedServices[0].id;
        document.querySelectorAll('.service-card').forEach(card => {
          if (parseInt(card.dataset.id) === serviceId) {
            card.classList.add('selected');
          } else {
            card.classList.remove('selected');
          }
        });
      }
      break;
      
    case 2:
      // Resaltar barbero ya seleccionado
      if (selectedBarber) {
        document.querySelectorAll('.barber-card').forEach(card => {
          if (parseInt(card.dataset.id) === selectedBarber.id) {
            card.classList.add('selected');
            document.getElementById('to-step-3').disabled = false;
          } else {
            card.classList.remove('selected');
          }
        });
      } else {
        document.getElementById('to-step-3').disabled = true;
      }
      break;
      
    case 3:
      // Actualizar selección de fecha y hora
      if (selectedDate) {
        document.querySelectorAll('.calendar-day').forEach(day => {
          if (day.dataset.date === selectedDate) {
            day.classList.add('selected');
          } else {
            day.classList.remove('selected');
          }
        });
        
        updateTimeSlots();
        
        if (selectedTime) {
          document.querySelectorAll('.time-slot').forEach(slot => {
            if (slot.textContent === selectedTime) {
              slot.classList.add('selected');
            } else {
              slot.classList.remove('selected');
            }
          });
          
          // Mostrar botón flotante
          document.getElementById('floating-confirm-button').classList.add('visible');
        }
      }
      break;
  }
}

// Función para inicializar eventos de navegación
function initNavigation() {
  // Botón para ir al paso 2
  document.getElementById('to-step-2').addEventListener('click', () => {
    goToStep(2);
  });
  
  // Botón para volver al paso 1
  document.getElementById('back-to-step-1').addEventListener('click', () => {
    goToStep(1);
  });
  
  // Botón para ir al paso 3
  document.getElementById('to-step-3').addEventListener('click', () => {
    goToStep(3);
  });
  
  // Botón para volver al paso 2
  document.getElementById('back-to-step-2').addEventListener('click', () => {
    goToStep(2);
  });
  
  // Iniciar en el paso 1
  goToStep(1);
}
