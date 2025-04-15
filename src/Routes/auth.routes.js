const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

/**
 * @swagger
 * /auth/login:
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

module.exports = router;
