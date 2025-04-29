const express = require('express');
const router = express.Router();
const IngresosController = require('../controllers/ingresos.controller');
const { verifyToken } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /api/ingresos:
 *   post:
 *     summary: Registrar ingreso o salida
 *     tags: [Ingresos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo_ingreso:
 *                 type: string
 *                 enum: [entrada, salida]
 *     responses:
 *       201:
 *         description: Registro exitoso
 */
router.post('/', verifyToken, IngresosController.registrarIngresoSalida);

/**
 * @swagger
 * /api/ingresos/ingresos-dia:
 *   get:
 *     summary: Obtener historial de ingresos diario del usuario autenticado
 *     tags: [Ingresos]
 *     responses:
 *       200:
 *         description: Historial de ingresos obtenido
 */
router.get('/ingresos-dia', verifyToken, IngresosController.getIngresosDelDia);

/**
 * @swagger
 * /api/ingresos/historial-usuario:
 *   get:
 *     summary: Obtener historial de ingresos del usuario autenticado
 *     tags: [Ingresos]
 *     responses:
 *       200:
 *         description: Historial de ingresos obtenido
 */
router.get('/historial-usuario', verifyToken, IngresosController.obtenerIngresosPorUsuario);

module.exports = router;