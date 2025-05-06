const express = require('express');
const router = express.Router();
const EstadisticasController = require('../controllers/estadisticas.controller');
const { verifyToken } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /api/estadisticas/dia:
 *   get:
 *     summary: Obtener estadísticas del día
 *     tags: [Estadísticas]
 *     responses:
 *       200:
 *         description: Estadísticas del día obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuariosIngresadosHoy:
 *                   type: integer
 *                   description: Número de usuarios que ingresaron hoy
 *                 usuariosSalidosHoy:
 *                   type: integer
 *                   description: Número de usuarios que salieron hoy
 *                 promedioEntradas:
 *                   type: number
 *                   description: Promedio de entradas por usuario
 *                 promedioSalidas:
 *                   type: number
 *                   description: Promedio de salidas por usuario
 *       500:
 *         description: Error interno del servidor
 */
router.get('/dia', verifyToken, EstadisticasController.obtenerEstadisticasDelDia);

module.exports = router;