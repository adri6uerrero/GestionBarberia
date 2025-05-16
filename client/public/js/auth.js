// Funciones para gestionar la autenticación de usuarios en toda la aplicación

// Comprueba si hay un usuario autenticado
function verificarUsuarioAutenticado() {
  const usuarioActual = localStorage.getItem('currentUser');
  return usuarioActual ? JSON.parse(usuarioActual) : null;
}

// Actualiza la interfaz según el estado de autenticación
function actualizarUIAutenticacion() {
  const usuario = verificarUsuarioAutenticado();
  
  // Elementos de navegación comunes en todas las páginas
  const btnLogin = document.querySelector('.btn-login');
  const btnRegistro = document.querySelector('.btn-registro');
  const navUsuario = document.querySelector('.nav-usuario');
  const navLinks = document.querySelector('.nav-links');
  
  if (usuario) {
    // Usuario autenticado
    if (btnLogin) btnLogin.style.display = 'none';
    if (btnRegistro) btnRegistro.style.display = 'none';
    
    // Si no existe el contenedor de usuario autenticado, lo creamos
    if (!navUsuario) {
      const navbar = document.querySelector('.navbar');
      
      if (navbar) {
        // Crear el dropdown de usuario
        const userDropdown = document.createElement('div');
        userDropdown.className = 'nav-usuario';
        
        // Determinar el texto a mostrar (Nombre o "Administrador")
        const displayName = usuario.role === 'admin' ? 'Administrador' : usuario.name;
        
        // Contenido del dropdown
        userDropdown.innerHTML = `
          <div class="usuario-dropdown">
            <div class="usuario-info">
              <div class="usuario-avatar">${displayName.charAt(0)}</div>
              <span class="usuario-nombre">${displayName}</span>
            </div>
            <div class="dropdown-content">
              ${usuario.role === 'admin' ? '<a href="admin-dashboard.html">Dashboard</a>' : '<a href="mis-citas.html">Mis Citas</a>'}
              <a href="#" id="btn-logout">Cerrar sesión</a>
            </div>
          </div>
        `;
        
        // Insertar después de los links de navegación
        if (navLinks) {
          navLinks.insertAdjacentElement('afterend', userDropdown);
        } else {
          navbar.appendChild(userDropdown);
        }
        
        // Agregar listener para el botón de logout
        document.getElementById('btn-logout').addEventListener('click', function(e) {
          e.preventDefault();
          cerrarSesion();
        });
      }
    }
  } else {
    // No hay usuario autenticado
    if (btnLogin) btnLogin.style.display = 'block';
    if (btnRegistro) btnRegistro.style.display = 'block';
    if (navUsuario) navUsuario.style.display = 'none';
  }
}

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  actualizarUIAutenticacion();
});
