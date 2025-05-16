require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const serviceRoutes = require('./routes/service.routes');
const statsRoutes = require('./routes/stats.routes');

// Inicializar app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/barberiaweb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexión a MongoDB establecida'))
.catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/stats', statsRoutes);

// Ruta básica para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('API del sistema de gestión de barbería funcionando correctamente');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
