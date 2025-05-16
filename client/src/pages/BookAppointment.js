import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Grid,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { es } from 'date-fns/locale';

// Servicios de ejemplo
const services = [
  {
    id: 1,
    name: 'Corte de Pelo',
    description: 'Corte profesional adaptado a tu estilo y preferencias.',
    price: 15,
    duration: 30,
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    name: 'Afeitado de Barba',
    description: 'Afeitado clásico con toalla caliente y productos premium.',
    price: 10,
    duration: 20,
    image: 'https://images.unsplash.com/photo-1587467512961-120760940315?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    name: 'Perfilado de Cejas',
    description: 'Define y perfila tus cejas con precisión y estilo.',
    price: 5,
    duration: 15,
    image: 'https://images.unsplash.com/photo-1626954079979-ec4f7261ebc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }
];

// Horarios disponibles de ejemplo
const availableTimeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '12:00', '12:30', '13:00', '15:00', '15:30', '16:00', 
  '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
];

const steps = ['Seleccionar Servicios', 'Elegir Fecha y Hora', 'Confirmar Reserva'];

const BookAppointment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  
  const handleServiceToggle = (serviceId) => {
    const currentIndex = selectedServices.indexOf(serviceId);
    const newSelectedServices = [...selectedServices];
    
    if (currentIndex === -1) {
      newSelectedServices.push(serviceId);
    } else {
      newSelectedServices.splice(currentIndex, 1);
    }
    
    setSelectedServices(newSelectedServices);
  };
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    // En una aplicación real, aquí se enviaría la reserva al servidor
    console.log({
      services: selectedServices,
      date: selectedDate,
      time: selectedTime
    });
    
    // Avanzar al paso de confirmación
    handleNext();
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + service.price;
    }, 0);
  };

  const getTotalDuration = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + service.duration;
    }, 0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Selecciona los servicios que deseas reservar
            </Typography>
            <Grid container spacing={3}>
              {services.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '12px',
                      border: selectedServices.includes(service.id) ? '2px solid #9c27b0' : 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={service.image}
                      alt={service.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {service.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {service.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold' }}>
                          {service.price}€
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {service.duration} min
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={selectedServices.includes(service.id)}
                            onChange={() => handleServiceToggle(service.id)}
                            sx={{
                              color: '#9c27b0',
                              '&.Mui-checked': {
                                color: '#9c27b0',
                              },
                            }}
                          />
                        }
                        label="Seleccionar"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {selectedServices.length > 0 && (
              <Box sx={{ mt: 3, p: 2, bgcolor: '#1e1e1e', borderRadius: '8px' }}>
                <Typography variant="subtitle1">
                  Servicios seleccionados: {selectedServices.length}
                </Typography>
                <Typography variant="subtitle1">
                  Precio total: {getTotalPrice()}€
                </Typography>
                <Typography variant="subtitle1">
                  Duración estimada: {getTotalDuration()} minutos
                </Typography>
              </Box>
            )}
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Selecciona fecha y hora para tu cita
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                  <DatePicker
                    label="Fecha"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    disablePast
                    minDate={new Date()}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Hora"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  fullWidth
                  disabled={!selectedDate}
                >
                  {availableTimeSlots.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            {selectedDate && selectedTime && (
              <Box sx={{ mt: 3, p: 2, bgcolor: '#1e1e1e', borderRadius: '8px' }}>
                <Typography variant="subtitle1">
                  Fecha seleccionada: {selectedDate?.toLocaleDateString()}
                </Typography>
                <Typography variant="subtitle1">
                  Hora seleccionada: {selectedTime}
                </Typography>
                <Typography variant="subtitle1">
                  Duración de la cita: {getTotalDuration()} minutos
                </Typography>
              </Box>
            )}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              ¡Reserva Completada con Éxito!
            </Typography>
            <Typography variant="body1" paragraph>
              Tu cita ha sido programada para el {selectedDate?.toLocaleDateString()} a las {selectedTime}.
            </Typography>
            <Typography variant="body1" paragraph>
              Recibirás un correo electrónico de confirmación con los detalles de tu reserva.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ 
                mt: 2, 
                bgcolor: '#9c27b0', 
                '&:hover': { 
                  bgcolor: '#7b1fa2' 
                }
              }}
              onClick={() => window.location.href = '/'}
            >
              Volver al Inicio
            </Button>
          </Box>
        );
      default:
        return 'Paso desconocido';
    }
  };

  const isNextDisabled = () => {
    if (activeStep === 0) {
      return selectedServices.length === 0;
    } else if (activeStep === 1) {
      return !selectedDate || !selectedTime;
    }
    return false;
  };

  return (
    <Paper 
      sx={{ 
        p: { xs: 2, md: 4 }, 
        bgcolor: '#1e1e1e',
        borderRadius: '12px'
      }}
    >
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Reservar Cita
      </Typography>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && activeStep !== steps.length - 1 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Atrás
            </Button>
          )}
          {activeStep === steps.length - 1 ? null : (
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 2 ? handleSubmit : handleNext}
              disabled={isNextDisabled()}
              sx={{ 
                bgcolor: '#9c27b0', 
                '&:hover': { 
                  bgcolor: '#7b1fa2' 
                },
                '&.Mui-disabled': {
                  bgcolor: 'rgba(156, 39, 176, 0.3)',
                }
              }}
            >
              {activeStep === steps.length - 2 ? 'Confirmar Reserva' : 'Siguiente'}
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default BookAppointment;
