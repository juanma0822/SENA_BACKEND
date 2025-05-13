const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuario y generación de token
 *     tags: [Auth - POST]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo_institucional:
 *                 type: string
 *               contrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Faltan datos o error en login
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', AuthController.verifyLogin);

/**
 * @swagger
 * /api/auth/recuperar-contrasena:
 *   post:
 *     summary: Recuperación de contraseña
 *     tags: [Auth - POST]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo_institucional:
 *                 type: string
 *                 description: Correo institucional del usuario
 *                 example: usuario@institucion.edu
 *               numero_documento:
 *                 type: string
 *                 description: Número de documento del usuario
 *                 example: 123456789
 *     responses:
 *       200:
 *         description: Contraseña generada y enviada a los correos registrados
 *       400:
 *         description: Faltan datos o error en la solicitud
 *       404:
 *         description: Usuario no encontrado
 */
router.post('/recuperar-contrasena', AuthController.recuperarContrasena);

module.exports = router;
