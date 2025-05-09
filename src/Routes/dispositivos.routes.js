const express = require('express');
const router = express.Router();
const DispositivosController = require('../controllers/dispositivos.controller');
const { verifyToken } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /api/dispositivos/salida:
 *   post:
 *     summary: Registrar la salida de un dispositivo
 *     tags: [Dispositivos]
 *     security:
 *       - bearerAuth: [] # Indica que esta ruta requiere autenticación con token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo_elemento:
 *                 type: string
 *                 description: Tipo de dispositivo
 *                 example: Laptop
 *               descripcion:
 *                 type: string
 *                 description: Descripción del dispositivo
 *                 example: Laptop Dell Inspiron 15
 *               numero_documento:
 *                 type: string
 *                 description: Número de documento del usuario que lleva el dispositivo
 *                 example: 123456789
 *               numero_serie:
 *                 type: string
 *                 description: Número de serie del dispositivo
 *                 example: ABC123456
 *     responses:
 *       201:
 *         description: Salida de dispositivo registrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_salida:
 *                   type: integer
 *                   description: ID de la salida registrada
 *                   example: 1
 *                 tipo_elemento:
 *                   type: string
 *                   description: Tipo de dispositivo
 *                   example: Laptop
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del dispositivo
 *                   example: Laptop Dell Inspiron 15
 *                 numero_documento:
 *                   type: string
 *                   description: Número de documento del usuario
 *                   example: 123456789
 *                 numero_serie:
 *                   type: string
 *                   description: Número de serie del dispositivo
 *                   example: ABC123456
 *                 registrado_por:
 *                   type: string
 *                   description: Número de documento del guarda que registró la salida
 *                   example: 987654321
 *                 fecha_hora_salida:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de la salida
 *                   example: 2025-05-06T14:30:00.000Z
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 *       500:
 *         description: Error interno del servidor
 */
router.post('/salida', verifyToken, DispositivosController.registrarSalidaDispositivo);

module.exports = router;