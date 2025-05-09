const express = require("express");
const router = express.Router();
const LlavesController = require("../controllers/llaves.controller");
const {verifyToken} = require("../middleware/auth.middleware");



/**
 * @swagger
 * /api/prestamos-llaves:
 *   post:
 *     summary: Registrar un préstamo de llave
 *     tags: [Llaves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_llave:
 *                 type: integer
 *                 description: ID de la llave
 *                 example: 1
 *               numero_documento:
 *                 type: string
 *                 description: Número de documento del usuario que recibe la llave
 *                 example: 123456789
 *     responses:
 *       201:
 *         description: Préstamo registrado correctamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */
router.post('/prestamos-llaves', verifyToken, LlavesController.registrarPrestamoLlave);

/**
 * @swagger
 * /api/prestamos-llaves/devolver/{id_prestamo}:
 *   put:
 *     summary: Registrar la devolución de una llave
 *     tags: [Llaves]
 *     parameters:
 *       - in: path
 *         name: id_prestamo
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del préstamo
 *     responses:
 *       200:
 *         description: Devolución registrada correctamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */
router.put('/prestamos-llaves/devolver/:id_prestamo', verifyToken, LlavesController.devolverLlave);

/**
 * @swagger
 * /api/llaves:
 *   post:
 *     summary: Crear una nueva llave
 *     tags: [Llaves]
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

/**
 * @swagger
 * /api/llaves/disponibles:
 *   get:
 *     summary: Obtener las llaves disponibles
 *     tags: [Llaves]
 *     responses:
 *       200:
 *         description: Lista de llaves disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_llave:
 *                     type: integer
 *                     description: ID de la llave
 *                     example: 1
 *                   nombre_llave:
 *                     type: string
 *                     description: Nombre de la llave
 *                     example: Llave Principal
 *                   descripcion:
 *                     type: string
 *                     description: Descripción de la llave
 *                     example: Llave de acceso principal al edificio
 *       500:
 *         description: Error interno del servidor
 */
router.get('/disponibles', verifyToken, LlavesController.obtenerLlavesDisponibles);

module.exports = router;
