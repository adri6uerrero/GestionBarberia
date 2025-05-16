const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Registrar un usuario
// @access  Public
router.post('/register', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('apellido', 'El apellido es obligatorio').not().isEmpty(),
  check('email', 'Incluye un email válido').isEmail(),
  check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
  check('password', 'La contraseña debe tener 6 o más caracteres').isLength({ min: 6 })
], authController.register);

// @route   POST api/auth/login
// @desc    Autenticar usuario y obtener token
// @access  Public
router.post('/login', [
  check('email', 'Incluye un email válido').isEmail(),
  check('password', 'La contraseña es obligatoria').exists()
], authController.login);

// @route   GET api/auth/user
// @desc    Obtener datos del usuario
// @access  Private
router.get('/user', auth, authController.getUser);

module.exports = router;
