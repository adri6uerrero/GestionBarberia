// Función para inicializar el botón flotante
function initFloatingButton() {
  const floatingButton = document.getElementById('floating-confirm-button');
  
  // Mostrar el botón cuando se haya seleccionado fecha y hora
  function checkTimeSelection() {
    if (selectedDate && selectedTime) {
      floatingButton.classList.add('visible');
    } else {
      floatingButton.classList.remove('visible');
    }
  }
  
  // Verificar cuando se selecciona una fecha
  document.addEventListener('dateSelected', function() {
    setTimeout(checkTimeSelection, 100);
  });
  
  // Verificar cuando se selecciona una hora
  document.addEventListener('timeSelected', function() {
    setTimeout(checkTimeSelection, 100);
  });
  
  // Funcionalidad del botón flotante
  floatingButton.addEventListener('click', function() {
    // Simular guardado de la reserva
    if (selectedBarber && selectedDate && selectedTime) {
      // Guardar la cita
      bookedAppointments.push({
        date: selectedDate,
        time: selectedTime,
        barber: selectedBarber.id
      });
      
      // Redireccionar a la página de confirmación
      window.location.href = 'mis-citas.html?nueva=true&fecha=' + 
                           encodeURIComponent(selectedDate) + 
                           '&hora=' + encodeURIComponent(selectedTime) + 
                           '&barbero=' + encodeURIComponent(selectedBarber.name);
    }
  });
}

// Función para actualizar los detalles de confirmación
function updateConfirmation() {
  // Esta función ya no actualiza el panel de confirmación
  // sino que simplemente verifica si debe mostrar el botón flotante
  if (selectedBarber && selectedDate && selectedTime) {
    document.getElementById('floating-confirm-button').classList.add('visible');
  } else {
    document.getElementById('floating-confirm-button').classList.remove('visible');
  }
}
