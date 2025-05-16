import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Avatar,
  Grid,
  Link,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  PersonAddOutlined as PersonAddIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // En una aplicación real, aquí iría la lógica de registro
    console.log('Formulario enviado:', formData);
    navigate('/login');
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Paper 
          elevation={6} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            bgcolor: '#1e1e1e',
            borderRadius: '12px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#9c27b0' }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Crear Cuenta
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  name="nombre"
                  autoComplete="given-name"
                  value={formData.nombre}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9c27b0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#9c27b0',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  name="apellido"
                  autoComplete="family-name"
                  value={formData.apellido}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9c27b0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#9c27b0',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9c27b0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#9c27b0',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="telefono"
                  label="Teléfono"
                  name="telefono"
                  autoComplete="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9c27b0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#9c27b0',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9c27b0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#9c27b0',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9c27b0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#9c27b0',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                py: 1.2,
                bgcolor: '#9c27b0', 
                '&:hover': { 
                  bgcolor: '#7b1fa2' 
                },
                borderRadius: '8px'
              }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2" sx={{ color: '#ce93d8' }}>
                  ¿Ya tienes una cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
