import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Container,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Home as HomeIcon, 
  Event as EventIcon, 
  Person as PersonIcon, 
  Dashboard as DashboardIcon, 
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';

// En una aplicación real, esto vendría de un contexto de autenticación
const isAuth = false;
const user = { role: 'cliente' };

const Layout = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    // En una app real, aquí iría la lógica de cierre de sesión
    handleProfileMenuClose();
    navigate('/');
  };

  const menuItems = [
    {
      text: 'Inicio',
      icon: <HomeIcon />,
      path: '/',
    },
    {
      text: 'Reservar Cita',
      icon: <EventIcon />,
      path: '/reservar',
      requiresAuth: true,
    },
    {
      text: 'Mi Perfil',
      icon: <PersonIcon />,
      path: '/perfil',
      requiresAuth: true,
    },
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/admin/dashboard',
      requiresAuth: true,
      adminOnly: true,
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#1a1a1a' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
            Barbería Web
          </Typography>
          
          {isAuth ? (
            <Box>
              <IconButton
                onClick={handleProfileMenuOpen}
                size="small"
                sx={{ ml: 2 }}
              >
                <Avatar sx={{ bgcolor: '#9c27b0' }}>
                  {user?.role === 'admin' ? 'A' : 'U'}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={() => { navigate('/perfil'); handleProfileMenuClose(); }}>Mi Perfil</MenuItem>
                <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button color="inherit" onClick={handleLogin}>Iniciar Sesión</Button>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ p: 2, bgcolor: '#9c27b0', color: 'white' }}>
            <Typography variant="h6">Menú</Typography>
          </Box>
          <List>
            {menuItems.map((item) => {
              // Mostrar todos los elementos públicos o los que requieren autenticación si el usuario está autenticado
              // Para elementos admin, verificar que el usuario sea admin
              if (
                !item.requiresAuth || 
                (isAuth && (!item.adminOnly || user?.role === 'admin'))
              ) {
                return (
                  <ListItem 
                    button 
                    key={item.text} 
                    component={Link} 
                    to={item.path}
                  >
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                );
              }
              return null;
            })}
            {isAuth && (
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Cerrar Sesión" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
      
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
      
      <Box component="footer" sx={{ p: 3, mt: 'auto', bgcolor: '#1a1a1a', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Barbería Web - Todos los derechos reservados
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
