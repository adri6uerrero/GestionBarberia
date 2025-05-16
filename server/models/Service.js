const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Por favor ingrese el nombre del servicio'],
    trim: true,
    unique: true
  },
  descripcion: {
    type: String,
    required: [true, 'Por favor ingrese una descripción del servicio']
  },
  precio: {
    type: Number,
    required: [true, 'Por favor ingrese el precio del servicio']
  },
  duracion: {
    type: Number,
    required: [true, 'Por favor ingrese la duración en minutos del servicio'],
    default: 30 // Duración predeterminada: 30 minutos
  },
  imagen: {
    type: String,
    default: 'default-service.jpg'
  },
  activo: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Service', ServiceSchema);
