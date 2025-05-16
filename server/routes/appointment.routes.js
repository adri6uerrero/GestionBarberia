const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const appointmentController = require('../controllers/appointment.controller');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET api/appointments
// @desc    Obtener todas las citas (admin) o citas del usuario (cliente)
// @access  Private
router.get('/', auth, appointmentController.getAppointments);

// @route   GET api/appointments/disponibilidad
// @desc    Verificar disponibilidad de horarios
// @access  Private
router.get('/disponibilidad', auth, appointmentController.checkAvailability);

// @route   GET api/appointments/:id
// @desc    Obtener una cita por ID
// @access  Private
router.get('/:id', auth, appointmentController.getAppointmentById);

// @route   POST api/appointments
// @desc    Crear una nueva cita
// @access  Private
router.post('/', [
  auth,
  check('servicios', 'Se debe seleccionar al menos un servicio').isArray({ min: 1 }),
  check('fecha', 'La fecha es obligatoria').not().isEmpty(),
  check('horaInicio', 'La hora de inicio es obligatoria').not().isEmpty()
], appointmentController.createAppointment);

// @route   PUT api/appointments/:id
// @desc    Actualizar estado de una cita
// @access  Private (Admin)
router.put('/:id', [
  auth, 
  admin,
  check('estado', 'El estado es obligatorio').isIn(['pendiente', 'confirmada', 'completada', 'cancelada'])
], appointmentController.updateAppointmentStatus);

// @route   DELETE api/appointments/:id
// @desc    Cancelar una cita
// @access  Private
router.delete('/:id', auth, appointmentController.cancelAppointment);

module.exports = router;
