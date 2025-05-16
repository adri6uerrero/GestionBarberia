import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookAppointment from './pages/BookAppointment';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Componentes
import Layout from './components/Layout';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';

// Tema oscuro personalizado
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9c27b0', // Púrpura
    },
    secondary: {
      main: '#f50057', // Rosa
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Rutas privadas (requieren autenticación) */}
          <Route path="reservar" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
          <Route path="perfil" element={<PrivateRoute><Profile /></PrivateRoute>} />
          
          {/* Rutas de administrador */}
          <Route path="admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
          
          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
