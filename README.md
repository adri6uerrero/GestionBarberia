# BarberWeb - Sistema de Gestión para Barberías

![Banner BarberWeb](https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)

## Descripción del Proyecto

BarberWeb es un sistema completo de gestión para barberías desarrollado con tecnologías web estándar (HTML, CSS, JavaScript). El proyecto implementa un enfoque frontend-first con almacenamiento local, proporcionando todas las funcionalidades necesarias tanto para clientes como para administradores de una barbería moderna.

## Proceso de Desarrollo

### Fase 1: Planificación y Diseño

**Semana 1: Conceptualización**
- Definición de los requerimientos del sistema
- Creación de wireframes para las principales páginas
- Planificación de la estructura de datos utilizando localStorage
- Selección de la paleta de colores y elementos visuales

**Semana 2: Estructura Básica**
- Creación del esqueleto HTML para las páginas principales
- Implementación de los estilos CSS base
- Configuración del servidor Node.js básico
- Diseño de la navegación y flujo de usuario

### Fase 2: Implementación Frontend

**Semana 3: Páginas Principales**
- Desarrollo de la página de inicio con sección hero
- Implementación de la página de servicios
- Creación de la página de productos
- Diseño responsive para todas las páginas

**Semana 4: Sistema de Citas**
- Desarrollo del flujo de reserva de citas en 3 pasos
- Implementación del selector de servicios
- Implementación del selector de barberos
- Creación del calendario y selector de horarios
- Validaciones del formulario de citas

**Semana 5: Sistema de Autenticación**
- Implementación de las páginas de login y registro
- Desarrollo de la lógica de autenticación con localStorage
- Implementación de roles (usuario normal y administrador)
- Creación de la página de perfil de usuario

### Fase 3: Panel de Administración

**Semana 6: Estructura del Dashboard**
- Diseño de la interfaz del panel de administración
- Implementación del sidebar de navegación
- Creación del sistema de pestañas y secciones dinámicas
- Implementación inicial de las estadísticas básicas

**Semana 7-8: Funcionalidades CRUD**
- Desarrollo del módulo de gestión de citas
  - Calendario de administración
  - Visualización y edición de citas
  - Filtrado por barbero y fecha
- Implementación del módulo de gestión de servicios
  - Listado de servicios
  - Formulario para añadir/editar servicios
  - Eliminación de servicios
- Desarrollo del módulo de gestión de productos
  - Listado de productos
  - Formulario para añadir/editar productos
  - Eliminación de productos
- Implementación del módulo de gestión de barberos
  - Listado de barberos
  - Formulario para añadir/editar barberos
  - Eliminación de barberos

### Fase 4: Mejoras y Optimización

**Semana 9: Mejoras en la UI/UX**
- Actualización de imágenes con fotografías de alta calidad de Unsplash
- Mejora de la experiencia de usuario en formularios
- Implementación de animaciones y transiciones
- Mejoras en el diseño responsive

**Semana 10: Optimización y Correcciones**
- Corrección de bugs en el flujo de autenticación
- Mejora de la navegación en el panel de administración
- Implementación del cierre de sesión y persistencia de la sesión
- Mejora del dashboard con gráficos y estadísticas avanzadas

## Funcionamiento Técnico

### Almacenamiento de Datos

El proyecto utiliza localStorage para simular una base de datos, con las siguientes estructuras:

```javascript
// Usuarios
const users = [
  { id: 1, name: "Admin", email: "admin@barberweb.com", password: "admin123", role: "admin" },
  { id: 2, name: "Usuario", email: "usuario@barberweb.com", password: "usuario123", role: "user" }
];

// Servicios
const services = [
  { id: 1, name: "Corte de Pelo", description: "Corte profesional...", price: 15, duration: 30, imageUrl: "..." },
  // Otros servicios...
];

// Productos, Barberos, Citas
// Estructuras similares con propiedades relevantes
```

### Servidor Web

Se implementa un servidor básico con Node.js utilizando el módulo `http` para servir los archivos estáticos:

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Lógica para servir archivos estáticos
});

server.listen(3005);
```

### Sistema de Autenticación

El sistema de autenticación utiliza localStorage para almacenar la información del usuario tras el inicio de sesión:

```javascript
function login(email, password) {
    const users = JSON.parse(localStorage.getItem('barberwebUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('barberwebUser', JSON.stringify(user));
        return true;
    }
    return false;
}
```

### Flujo de Citas

El proceso de reserva de citas sigue un enfoque de tres pasos:

1. **Selección de Servicio**: El usuario selecciona el servicio deseado.
2. **Selección de Barbero**: El usuario elige el barbero preferido.
3. **Selección de Fecha y Hora**: El usuario selecciona fecha y hora disponibles.

Toda esta información se guarda temporalmente y, al confirmar, se crea un nuevo objeto de cita que se guarda en localStorage.

## Características Principales

### Sección de Cliente
- Visualización de servicios y productos con imágenes de alta calidad
- Sistema de citas online con selección de servicio, barbero y horario
- Perfil de usuario para gestionar información personal
- Historial de citas con estado y opciones de cancelación

### Panel de Administración
- Dashboard con estadísticas avanzadas y gráficos de rendimiento
- Gestión completa de citas con calendario visual
- Gestión CRUD de barberos, servicios y productos
- Gestión de usuarios y perfiles
- Sistema de login/logout seguro

## Desafíos y Soluciones

### Desafío 1: Visualización de Imágenes
Problema: Las imágenes de barberos no se mostraban correctamente en la página de citas.
Solución: Se corrigieron las rutas de las imágenes para usar URLs absolutas de Unsplash y se actualizó el código JavaScript para usar la propiedad imageUrl correctamente.

### Desafío 2: Autenticación y Navegación
Problema: El flujo de redirecciones tras el login y logout presentaba errores 404.
Solución: Se implementaron rutas absolutas y relativas según el contexto, y se mejoró el servidor para manejar correctamente las rutas.

### Desafío 3: Persistencia de Sesión
Problema: La sesión se perdía al navegar entre páginas en el panel admin.
Solución: Se mejoró la verificación de autenticación y se implementó un mecanismo de cierre de sesión explícito.

## Instalación y Ejecución

1. **Clona el repositorio**:
   ```
   git clone https://github.com/adri6uerrero/GestionBarberia.git
   ```

2. **Navega al directorio del proyecto**:
   ```
   cd GestionBarberia
   ```

3. **Instala las dependencias** (requiere Node.js):
   ```
   npm install
   ```

4. **Inicia el servidor**:
   ```
   node server.js
   ```

5. **Accede en tu navegador** a: `http://localhost:3005`

## Credenciales de Acceso

### Administrador
- **Email**: admin@barberweb.com
- **Contraseña**: admin123

### Usuario
- **Email**: usuario@barberweb.com
- **Contraseña**: usuario123

## Estructura del Proyecto

```
BarberWeb/
├── css/               # Hojas de estilo globales
├── js/                # Scripts principales
│   ├── main.js        # Lógica principal y datos de ejemplo
│   └── demo-users.js   # Usuarios demo para autenticación
├── pages/             # Páginas del sitio
│   ├── admin/          # Panel de administración
│   │   ├── css/         # Estilos específicos admin
│   │   ├── js/          # Scripts del panel admin
│   │   └── dashboard.html # Página principal admin
│   ├── appointment.html # Página de citas
│   ├── login.html      # Página de login
│   ├── products.html   # Catálogo de productos
│   └── services.html   # Catálogo de servicios
├── index.html        # Página principal
└── server.js         # Servidor HTTP simple
```

## Futuras Mejoras

- Integración con base de datos real (MongoDB o MySQL)
- Implementación de pagos online con PayPal o Stripe
- Sistema de notificaciones por email
- App móvil con React Native o Flutter
- Módulo de fidelización de clientes con puntos y descuentos

## Autor

adri6uerrero

## Licencia

MIT
