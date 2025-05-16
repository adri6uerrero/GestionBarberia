const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET api/stats/daily
// @desc    Obtener estadísticas diarias
// @access  Private (Admin)
router.get('/daily', [auth, admin], statsController.getDailyStats);

// @route   GET api/stats/monthly
// @desc    Obtener estadísticas mensuales
// @access  Private (Admin)
router.get('/monthly', [auth, admin], statsController.getMonthlyStats);

// @route   GET api/stats/yearly
// @desc    Obtener estadísticas anuales
// @access  Private (Admin)
router.get('/yearly', [auth, admin], statsController.getYearlyStats);

// @route   GET api/stats/dashboard
// @desc    Obtener resumen para el dashboard
// @access  Private (Admin)
router.get('/dashboard', [auth, admin], statsController.getDashboardStats);

module.exports = router;
