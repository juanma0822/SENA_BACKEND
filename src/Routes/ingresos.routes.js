const express = require('express');
const router = express.Router();
const IngresosController = require('../controllers/ingresos.controller');
const { verifyToken } = require('../middleware/auth.middleware');


/**
 * @swagger
 * /api/ingresos/funcionariosdia:
 *   get:
 *     summary: Obtener los funcionarios que hicieron ingreso en el día actual
 *     tags: [Ingresos]
 *     responses:
 *       200:
 *         description: Lista de funcionarios que hicieron ingreso en el día actual
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numero_documento:
 *                     type: string
 *                     description: Número de documento del funcionario
 *                     example: 123456789
 *                   nombres:
 *                     type: string
 *                     description: Nombres del funcionario
 *                     example: Juan
 *                   apellidos:
 *                     type: string
 *                     description: Apellidos del funcionario
 *                     example: Pérez
 *                   cargo:
 *                     type: string
 *                     description: Cargo del funcionario
 *                     example: Coordinador
 *       500:
 *         description: Error interno del servidor
 */
router.get('/funcionariosdia', verifyToken, IngresosController.obtenerFuncionariosDelDia);

/**
 * @swagger
 * /api/ingresos/porguarda:
 *   post:
 *     summary: Registrar ingreso o salida para un usuario por parte de un guarda
 *     tags: [Ingresos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_documento:
 *                 type: string
 *                 description: Número de documento del usuario
 *               tipo_ingreso:
 *                 type: string
 *                 enum: [entrada, salida]
 *                 description: Tipo de ingreso (entrada o salida)
 *     responses:
 *       201:
 *         description: Registro exitoso
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */
router.post('/porguarda', verifyToken, IngresosController.registrarIngresoSalidaPorGuarda);

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
 * /api/ingresos/historial-usuario/{numero_documento}:
 *   get:
 *     summary: Obtener historial de ingresos de un usuario por su número de documento
 *     tags: [Ingresos]
 *     parameters:
 *       - in: path
 *         name: numero_documento
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de documento del usuario
 *     responses:
 *       200:
 *         description: Historial de ingresos obtenido
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/historial-usuario/:numero_documento', verifyToken, IngresosController.obtenerHistorialPorDocumento);

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

/**
 * @swagger
 * /api/ingresos/resumen-dia:
 *   get:
 *     summary: Obtener resuemn diaria de ingresos del usuario autenticado
 *     tags: [Ingresos]
 *     responses:
 *       200:
 *         description: Historial de ingresos obtenido
 */
router.get('/resumen-dia', verifyToken, IngresosController.resumenDiario);


module.exports = router;