const express = require("express");
const router = express.Router();
const LlavesController = require("../controllers/llaves.controller");
const {verifyToken} = require("../middleware/auth.middleware");

/**
 * @swagger
 * /api/llaves:
 *   post:
 *     summary: Crear una nueva llave
 *     tags: [Llaves]
 *     security:
 *       - bearerAuth: [] # Indica que esta ruta requiere autenticación con token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_llave:
 *                 type: string
 *                 description: Nombre de la llave
 *                 example: Llave Principal
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la llave
 *                 example: Llave de acceso principal al edificio
 *     responses:
 *       201:
 *         description: Llave creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_llave:
 *                   type: integer
 *                   description: ID de la llave creada
 *                   example: 1
 *                 nombre_llave:
 *                   type: string
 *                   description: Nombre de la llave
 *                   example: Llave Principal
 *                 descripcion:
 *                   type: string
 *                   description: Descripción de la llave
 *                   example: Llave de acceso principal al edificio
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", verifyToken, LlavesController.createLlave);

module.exports = router;
