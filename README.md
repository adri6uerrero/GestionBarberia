# GestionBarberia - Barbería Web

Una aplicación web moderna y elegante para la gestión integral de una barbería, con tema oscuro y diseño intuitivo.

## Características

### Para Clientes
- Interfaz oscura y elegante
- Registro e inicio de sesión de usuarios
- Reserva de citas para diferentes servicios:
  - Corte de pelo
  - Arreglo de barba
  - Perfilado de cejas
  - Combinaciones de servicios
- Calendario interactivo para seleccionar fecha y hora
- Historial de citas previas

### Para Administradores (Dueño)
- Panel administrativo completo
- Visualización de citas programadas
- Gestión de disponibilidad (huecos libres)
- Métricas financieras:
  - Ingresos diarios
  - Ingresos mensuales
  - Ingresos anuales
- Gestión de servicios y precios

## Estructura del Proyecto

```
BarberiaWeb/
├── client/                # Frontend en React.js
│   ├── public/            # Archivos estáticos
│   └── src/               # Código fuente de React
│       ├── components/    # Componentes reutilizables
│       ├── pages/         # Páginas de la aplicación
│       ├── assets/        # Imágenes, iconos, etc.
│       └── styles/        # Estilos CSS/SCSS
└── server/                # Backend en Node.js/Express
    ├── controllers/       # Controladores de la API
    ├── models/            # Modelos de datos
    ├── routes/            # Rutas de la API
    └── config/            # Configuraciones
```

## Tecnologías Utilizadas

- **Frontend**: React.js, Material-UI (con tema oscuro)
- **Backend**: Node.js, Express
- **Base de Datos**: MongoDB
- **Autenticación**: JWT (JSON Web Tokens)
