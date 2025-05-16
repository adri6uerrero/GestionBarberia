import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h1" component="h1" sx={{ fontSize: '8rem', color: '#9c27b0' }}>
        404
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        La página que estás buscando no existe o ha sido movida.
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate('/')}
        sx={{ 
          bgcolor: '#9c27b0', 
          '&:hover': { 
            bgcolor: '#7b1fa2' 
          } 
        }}
      >
        Volver al inicio
      </Button>
    </Container>
  );
};

export default NotFound;
