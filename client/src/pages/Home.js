import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Container,
  Paper,
  Divider
} from '@mui/material';
import { 
  ContentCut as CutIcon, 
  Today as TodayIcon, 
  Timer as TimerIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    title: 'Corte de Pelo',
    description: 'Corte profesional adaptado a tu estilo y preferencias.',
    icon: <CutIcon fontSize="large" sx={{ color: '#9c27b0' }} />,
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    title: 'Afeitado de Barba',
    description: 'Afeitado clásico con toalla caliente y productos premium.',
    icon: <CutIcon fontSize="large" sx={{ color: '#9c27b0' }} />,
    image: 'https://images.unsplash.com/photo-1587467512961-120760940315?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    title: 'Perfilado de Cejas',
    description: 'Define y perfila tus cejas con precisión y estilo.',
    icon: <CutIcon fontSize="large" sx={{ color: '#9c27b0' }} />,
    image: 'https://images.unsplash.com/photo-1626954079979-ec4f7261ebc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Paper 
        sx={{ 
          position: 'relative', 
          backgroundColor: 'grey.800', 
          color: '#fff',
          mb: 6,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '12px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
            borderRadius: '12px',
          }}
        />
        <Container>
          <Box sx={{ position: 'relative', p: { xs: 3, md: 6 } }}>
            <Typography component="h1" variant="h2" color="inherit" gutterBottom>
              Estilo y Precisión
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Tu barbería de confianza. Reserva tu cita online y luce tu mejor versión.
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => navigate('/reservar')}
              sx={{ 
                mt: 2, 
                bgcolor: '#9c27b0', 
                '&:hover': { 
                  bgcolor: '#7b1fa2' 
                } 
              }}
            >
              Reservar Cita
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Servicios */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          Nuestros Servicios
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 30px rgba(0,0,0,0.4)'
                } 
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={service.image}
                  alt={service.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {service.icon}
                    <Typography variant="h5" component="h3" sx={{ ml: 1 }}>
                      {service.title}
                    </Typography>
                  </Box>
                  <Typography>
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Beneficios */}
      <Box sx={{ bgcolor: '#1e1e1e', p: 4, borderRadius: '12px', mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          ¿Por qué elegirnos?
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <CutIcon fontSize="large" sx={{ color: '#9c27b0', fontSize: '3rem', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Barberos Profesionales
              </Typography>
              <Typography>
                Nuestro equipo de barberos tiene años de experiencia y formación continua.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <TodayIcon fontSize="large" sx={{ color: '#9c27b0', fontSize: '3rem', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Reservas Online
              </Typography>
              <Typography>
                Sistema de reservas fácil y rápido para gestionar tus citas desde cualquier dispositivo.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <TimerIcon fontSize="large" sx={{ color: '#9c27b0', fontSize: '3rem', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Sin Tiempos de Espera
              </Typography>
              <Typography>
                Respetamos tu tiempo con un sistema de citas que evita largas esperas.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* CTA */}
      <Box 
        sx={{ 
          bgcolor: '#9c27b0', 
          p: 6, 
          borderRadius: '12px',
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'white' }}>
          ¿Listo para lucir tu mejor versión?
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: 'white', mb: 3 }}>
          Reserva tu cita ahora y experimenta el mejor servicio
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={() => navigate('/reservar')}
          sx={{ 
            bgcolor: 'white', 
            color: '#9c27b0',
            '&:hover': { 
              bgcolor: '#f3e5f5',
            } 
          }}
        >
          Reservar Cita
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
