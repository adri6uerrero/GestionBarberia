const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const serviceController = require('../controllers/service.controller');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET api/services
// @desc    Obtener todos los servicios
// @access  Public
router.get('/', serviceController.getServices);

// @route   GET api/services/:id
// @desc    Obtener un servicio por ID
// @access  Public
router.get('/:id', serviceController.getServiceById);

// @route   POST api/services
// @desc    Crear un nuevo servicio
// @access  Private (Admin)
router.post('/', [
  auth, 
  admin,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
  check('precio', 'El precio es obligatorio').isNumeric(),
  check('duracion', 'La duración en minutos es obligatoria').isNumeric()
], serviceController.createService);

// @route   PUT api/services/:id
// @desc    Actualizar un servicio
// @access  Private (Admin)
router.put('/:id', [
  auth, 
  admin,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('precio', 'El precio es obligatorio').isNumeric()
], serviceController.updateService);

// @route   DELETE api/services/:id
// @desc    Eliminar un servicio
// @access  Private (Admin)
router.delete('/:id', [auth, admin], serviceController.deleteService);

module.exports = router;
