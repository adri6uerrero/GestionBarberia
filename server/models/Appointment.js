const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  servicios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  }],
  fecha: {
    type: Date,
    required: [true, 'Por favor seleccione una fecha para la cita']
  },
  horaInicio: {
    type: String,
    required: [true, 'Por favor seleccione una hora para la cita']
  },
  duracionTotal: {
    type: Number,
    required: true
  },
  precioTotal: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'completada', 'cancelada'],
    default: 'pendiente'
  },
  notas: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para calcular duración y precio total antes de guardar
AppointmentSchema.pre('save', async function(next) {
  if (!this.isModified('servicios')) {
    return next();
  }
  
  try {
    // Necesitamos popular los servicios para calcular precio y duración
    await this.populate('servicios');
    
    this.duracionTotal = this.servicios.reduce((total, servicio) => total + servicio.duracion, 0);
    this.precioTotal = this.servicios.reduce((total, servicio) => total + servicio.precio, 0);
    
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
