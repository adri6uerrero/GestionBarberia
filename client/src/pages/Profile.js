import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip
} from '@mui/material';
import { 
  Event as EventIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Datos de ejemplo para el perfil
const userProfile = {
  nombre: 'Juan',
  apellido: 'Pérez',
  email: 'juan.perez@ejemplo.com',
  telefono: '612345678',
};

// Citas de ejemplo
const userAppointments = [
  { id: 1, servicio: 'Corte de Pelo', fecha: '05/05/2025', hora: '10:00', estado: 'completada' },
  { id: 2, servicio: 'Corte + Barba', fecha: '20/05/2025', hora: '11:30', estado: 'confirmada' },
  { id: 3, servicio: 'Pack Completo', fecha: '10/06/2025', hora: '13:00', estado: 'pendiente' },
];

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    setEditing(!editing);
    if (editing) {
      // Si estamos cancelando la edición, restauramos los datos originales
      setFormData(userProfile);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // En una aplicación real, aquí se guardarían los cambios
    console.log('Datos actualizados:', formData);
    setEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completada':
        return { color: '#4caf50', bg: 'rgba(76, 175, 80, 0.2)' };
      case 'confirmada':
        return { color: '#2196f3', bg: 'rgba(33, 150, 243, 0.2)' };
      case 'pendiente':
        return { color: '#ffc107', bg: 'rgba(255, 193, 7, 0.2)' };
      case 'cancelada':
        return { color: '#f44336', bg: 'rgba(244, 67, 54, 0.2)' };
      default:
        return { color: '#757575', bg: 'rgba(117, 117, 117, 0.2)' };
    }
  };

  const renderProfileTab = () => (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: '#9c27b0', 
              fontSize: '2rem',
              mr: 2
            }}
          >
            {userProfile.nombre.charAt(0)}{userProfile.apellido.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5">
              {userProfile.nombre} {userProfile.apellido}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Cliente
            </Typography>
          </Box>
        </Box>
        {editing ? (
          <Box>
            <Button 
              type="submit" 
              variant="contained" 
              startIcon={<SaveIcon />}
              sx={{ 
                mr: 1,
                bgcolor: '#4caf50', 
                '&:hover': { 
                  bgcolor: '#388e3c' 
                } 
              }}
            >
              Guardar
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<CloseIcon />}
              onClick={handleEditToggle}
              sx={{ 
                borderColor: '#f44336',
                color: '#f44336',
                '&:hover': { 
                  borderColor: '#d32f2f',
                  backgroundColor: 'rgba(244, 67, 54, 0.04)'
                } 
              }}
            >
              Cancelar
            </Button>
          </Box>
        ) : (
          <Button 
            variant="outlined" 
            startIcon={<EditIcon />}
            onClick={handleEditToggle}
            sx={{ 
              borderColor: '#9c27b0',
              color: '#9c27b0',
              '&:hover': { 
                borderColor: '#7b1fa2',
                backgroundColor: 'rgba(156, 39, 176, 0.04)'
              } 
            }}
          >
            Editar Perfil
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            disabled={!editing}
            variant="outlined"
            margin="normal"
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
            fullWidth
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            disabled={!editing}
            variant="outlined"
            margin="normal"
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
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editing}
            variant="outlined"
            margin="normal"
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
            fullWidth
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            disabled={!editing}
            variant="outlined"
            margin="normal"
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
        {editing && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contraseña Actual"
                name="currentPassword"
                type="password"
                variant="outlined"
                margin="normal"
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
                fullWidth
                label="Nueva Contraseña"
                name="newPassword"
                type="password"
                variant="outlined"
                margin="normal"
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
          </>
        )}
      </Grid>
    </Box>
  );

  const renderAppointmentsTab = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Mis Citas</Typography>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#9c27b0', 
            '&:hover': { 
              bgcolor: '#7b1fa2' 
            } 
          }}
          onClick={() => window.location.href = '/reservar'}
        >
          Reservar Nueva Cita
        </Button>
      </Box>

      <List sx={{ bgcolor: '#1e1e1e', borderRadius: '12px' }}>
        {userAppointments.map((appointment, index) => (
          <React.Fragment key={appointment.id}>
            <ListItem
              secondaryAction={
                <Box>
                  <Chip 
                    label={appointment.estado.charAt(0).toUpperCase() + appointment.estado.slice(1)} 
                    size="small"
                    sx={{
                      bgcolor: getStatusColor(appointment.estado).bg,
                      color: getStatusColor(appointment.estado).color,
                      borderRadius: '4px',
                      mr: 1
                    }}
                  />
                  {appointment.estado !== 'completada' && appointment.estado !== 'cancelada' && (
                    <Button 
                      size="small" 
                      variant="outlined" 
                      color="error"
                      sx={{ 
                        borderColor: '#f44336',
                        color: '#f44336',
                        '&:hover': { 
                          borderColor: '#d32f2f',
                          backgroundColor: 'rgba(244, 67, 54, 0.04)'
                        } 
                      }}
                    >
                      Cancelar
                    </Button>
                  )}
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#9c27b0' }}>
                  <EventIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={appointment.servicio}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.secondary">
                      {appointment.fecha} a las {appointment.hora}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < userAppointments.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Paper sx={{ p: 3, bgcolor: '#1e1e1e', borderRadius: '12px' }}>
      <Typography variant="h4" gutterBottom>
        Mi Perfil
      </Typography>

      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="inherit"
        sx={{ 
          mb: 3,
          '& .MuiTab-root': {
            fontWeight: 'medium',
          },
          '& .Mui-selected': {
            color: '#9c27b0',
          },
        }}
      >
        <Tab label="Información Personal" />
        <Tab label="Historial de Citas" />
      </Tabs>

      {tabValue === 0 ? renderProfileTab() : renderAppointmentsTab()}
    </Paper>
  );
};

export default Profile;
