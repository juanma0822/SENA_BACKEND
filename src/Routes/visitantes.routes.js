const express = require('express');
const router = express.Router();
const VisitantesController = require('../controllers/visitantes.controller');
const { verifyToken } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /api/visitantes:
 *   post:
 *     summary: Registrar ingreso de un visitante
 *     tags: [Visitantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               tipo_documento:
 *                 type: string
 *               numero_documento:
 *                 type: string
 *               motivo:
 *                 type: string
 *               area_destino:
 *                 type: string
 *     responses:
 *       201:
 *         description: Visitante registrado correctamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', verifyToken, VisitantesController.registrarVisitante);

module.exports = router;