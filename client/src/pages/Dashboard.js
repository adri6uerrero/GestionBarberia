import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  PeopleAlt as PeopleAltIcon,
  EventAvailable as EventAvailableIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registramos los componentes necesarios para Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Datos de ejemplo para las gráficas
const monthlyData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    {
      label: 'Ingresos Mensuales (€)',
      data: [1200, 1500, 1300, 1700, 1600, 1800, 2000, 1900, 2200, 2400, 2300, 2600],
      backgroundColor: 'rgba(156, 39, 176, 0.6)',
      borderColor: '#9c27b0',
      borderWidth: 2,
    },
  ],
};

const weeklyData = {
  labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  datasets: [
    {
      label: 'Citas por Día',
      data: [8, 12, 10, 15, 20, 25],
      backgroundColor: 'rgba(245, 0, 87, 0.6)',
      borderColor: '#f50057',
      borderWidth: 2,
    },
  ],
};

const serviceData = {
  labels: ['Corte de Pelo', 'Barba', 'Cejas', 'Corte + Barba', 'Corte + Cejas', 'Pack Completo'],
  datasets: [
    {
      label: 'Servicios Más Solicitados',
      data: [30, 25, 15, 40, 20, 35],
      backgroundColor: [
        'rgba(156, 39, 176, 0.7)',
        'rgba(233, 30, 99, 0.7)',
        'rgba(33, 150, 243, 0.7)',
        'rgba(255, 87, 34, 0.7)',
        'rgba(76, 175, 80, 0.7)',
        'rgba(255, 193, 7, 0.7)',
      ],
      borderColor: [
        '#9c27b0',
        '#e91e63',
        '#2196f3',
        '#ff5722',
        '#4caf50',
        '#ffc107',
      ],
      borderWidth: 1,
    },
  ],
};

// Opciones para las gráficas
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#fff',
        font: {
          size: 12
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#fff'
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#fff'
      }
    }
  }
};

// Datos de ejemplo para las citas
const appointments = [
  { id: 1, cliente: 'Juan Pérez', servicio: 'Corte de Pelo', fecha: '16/05/2025', hora: '10:00', estado: 'confirmada' },
  { id: 2, cliente: 'María López', servicio: 'Corte + Barba', fecha: '16/05/2025', hora: '11:30', estado: 'pendiente' },
  { id: 3, cliente: 'Carlos García', servicio: 'Pack Completo', fecha: '16/05/2025', hora: '13:00', estado: 'confirmada' },
  { id: 4, cliente: 'Ana Martínez', servicio: 'Cejas', fecha: '16/05/2025', hora: '15:30', estado: 'confirmada' },
  { id: 5, cliente: 'Roberto Sánchez', servicio: 'Barba', fecha: '16/05/2025', hora: '16:15', estado: 'cancelada' },
  { id: 6, cliente: 'Lucía Rodríguez', servicio: 'Corte de Pelo', fecha: '17/05/2025', hora: '09:30', estado: 'pendiente' },
];

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderTabContent = () => {
    switch (tabValue) {
      case 0: // Dashboard
        return (
          <Grid container spacing={3}>
            {/* Tarjetas de métricas */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#1e1e1e', height: '100%', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AttachMoneyIcon sx={{ color: '#9c27b0', fontSize: 40, mr: 1 }} />
                    <Typography variant="h6">Ingresos</Typography>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                    2.600 €
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <TrendingUpIcon fontSize="small" sx={{ color: '#4caf50', verticalAlign: 'middle', mr: 0.5 }} />
                    +12% vs mes anterior
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#1e1e1e', height: '100%', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EventAvailableIcon sx={{ color: '#f50057', fontSize: 40, mr: 1 }} />
                    <Typography variant="h6">Citas</Typography>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                    145
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <TrendingUpIcon fontSize="small" sx={{ color: '#4caf50', verticalAlign: 'middle', mr: 0.5 }} />
                    +8% vs mes anterior
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#1e1e1e', height: '100%', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PeopleAltIcon sx={{ color: '#2196f3', fontSize: 40, mr: 1 }} />
                    <Typography variant="h6">Clientes</Typography>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                    78
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <TrendingUpIcon fontSize="small" sx={{ color: '#4caf50', verticalAlign: 'middle', mr: 0.5 }} />
                    +5% vs mes anterior
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#1e1e1e', height: '100%', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EventAvailableIcon sx={{ color: '#ffc107', fontSize: 40, mr: 1 }} />
                    <Typography variant="h6">Disponibilidad</Typography>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                    85%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    21 huecos libres hoy
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Gráficas */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2, bgcolor: '#1e1e1e', height: '400px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="h6" gutterBottom>
                  Ingresos Mensuales
                </Typography>
                <Box sx={{ height: '330px' }}>
                  <Bar data={monthlyData} options={options} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, bgcolor: '#1e1e1e', height: '400px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="h6" gutterBottom>
                  Servicios Más Populares
                </Typography>
                <Box sx={{ height: '330px' }}>
                  <Line data={serviceData} options={options} />
                </Box>
              </Paper>
            </Grid>

            {/* Citas recientes */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, bgcolor: '#1e1e1e', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="h6" gutterBottom>
                  Citas para Hoy
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Servicio</TableCell>
                        <TableCell>Hora</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appointments
                        .filter(appointment => appointment.fecha === '16/05/2025')
                        .map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>{appointment.cliente}</TableCell>
                          <TableCell>{appointment.servicio}</TableCell>
                          <TableCell>{appointment.hora}</TableCell>
                          <TableCell>
                            <Chip 
                              label={appointment.estado.charAt(0).toUpperCase() + appointment.estado.slice(1)} 
                              size="small"
                              sx={{
                                bgcolor: appointment.estado === 'confirmada' 
                                  ? 'rgba(76, 175, 80, 0.2)' 
                                  : appointment.estado === 'pendiente' 
                                    ? 'rgba(255, 193, 7, 0.2)' 
                                    : 'rgba(244, 67, 54, 0.2)',
                                color: appointment.estado === 'confirmada' 
                                  ? '#4caf50' 
                                  : appointment.estado === 'pendiente' 
                                    ? '#ffc107' 
                                    : '#f44336',
                                borderRadius: '4px'
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" sx={{ color: '#2196f3' }}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#f44336' }}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        );
      case 1: // Citas
        return (
          <Paper sx={{ p: 2, bgcolor: '#1e1e1e', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Todas las Citas
              </Typography>
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: '#9c27b0', 
                  '&:hover': { 
                    bgcolor: '#7b1fa2' 
                  } 
                }}
              >
                Nueva Cita
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Servicio</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Hora</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.cliente}</TableCell>
                      <TableCell>{appointment.servicio}</TableCell>
                      <TableCell>{appointment.fecha}</TableCell>
                      <TableCell>{appointment.hora}</TableCell>
                      <TableCell>
                        <Chip 
                          label={appointment.estado.charAt(0).toUpperCase() + appointment.estado.slice(1)} 
                          size="small"
                          sx={{
                            bgcolor: appointment.estado === 'confirmada' 
                              ? 'rgba(76, 175, 80, 0.2)' 
                              : appointment.estado === 'pendiente' 
                                ? 'rgba(255, 193, 7, 0.2)' 
                                : 'rgba(244, 67, 54, 0.2)',
                            color: appointment.estado === 'confirmada' 
                              ? '#4caf50' 
                              : appointment.estado === 'pendiente' 
                                ? '#ffc107' 
                                : '#f44336',
                            borderRadius: '4px'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" sx={{ color: '#2196f3' }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#f44336' }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        );
      case 2: // Estadísticas
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, bgcolor: '#1e1e1e', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="h6" gutterBottom>
                  Ingresos Mensuales
                </Typography>
                <Box sx={{ height: '400px' }}>
                  <Bar data={monthlyData} options={options} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, bgcolor: '#1e1e1e', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="h6" gutterBottom>
                  Citas por Día
                </Typography>
                <Box sx={{ height: '300px' }}>
                  <Line data={weeklyData} options={options} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, bgcolor: '#1e1e1e', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="h6" gutterBottom>
                  Servicios Más Populares
                </Typography>
                <Box sx={{ height: '300px' }}>
                  <Line data={serviceData} options={options} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Panel de Administración
      </Typography>
      <Paper sx={{ bgcolor: '#1e1e1e', mb: 3, borderRadius: '8px' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          indicatorColor="secondary"
          textColor="inherit"
          centered
          sx={{ 
            '& .MuiTab-root': { 
              fontWeight: tabValue === 0 ? 'bold' : 'normal',
              fontSize: '1rem',
              minWidth: 120
            },
            '& .Mui-selected': {
              color: '#9c27b0',
            },
          }}
        >
          <Tab label="Dashboard" />
          <Tab label="Citas" />
          <Tab label="Estadísticas" />
        </Tabs>
      </Paper>
      
      {renderTabContent()}
    </Box>
  );
};

export default Dashboard;
