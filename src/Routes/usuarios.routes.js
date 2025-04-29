const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarios.controller');
const {verifyToken} = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios activos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', verifyToken, UsuarioController.obtenerUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/info', verifyToken, UsuarioController.obtenerUsuarioPorId);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_documento:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               correo_personal:
 *                 type: string
 *               correo_institucional:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               tipo_documento:
 *                 type: string
 *               lugar_expedicion:
 *                 type: string
 *               genero:
 *                 type: string
 *               edad:
 *                 type: integer
 *               departamento:
 *                 type: string
 *               municipio:
 *                 type: string
 *               direccion:
 *                 type: string
 *               celular:
 *                 type: string
 *               telefono_fijo:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/', UsuarioController.crearUsuario);

/**
 * @swagger
 * /api/usuarios/admin:
 *   post:
 *     summary: Crear un nuevo administrador
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_documento:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               correo_personal:
 *                 type: string
 *               correo_institucional:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               tipo_documento:
 *                 type: string
 *               lugar_expedicion:
 *                 type: string
 *               genero:
 *                 type: string
 *               edad:
 *                 type: integer
 *               departamento:
 *                 type: string
 *               municipio:
 *                 type: string
 *               direccion:
 *                 type: string
 *               celular:
 *                 type: string
 *               telefono_fijo:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Administrador creado correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/admin', UsuarioController.crearAdmin);

/**
 * @swagger
 * /api/usuarios/guarda:
 *   post:
 *     summary: Crear un nuevo guarda
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_documento:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               correo_personal:
 *                 type: string
 *               correo_institucional:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               tipo_documento:
 *                 type: string
 *               lugar_expedicion:
 *                 type: string
 *               genero:
 *                 type: string
 *               edad:
 *                 type: integer
 *               departamento:
 *                 type: string
 *               municipio:
 *                 type: string
 *               direccion:
 *                 type: string
 *               celular:
 *                 type: string
 *               telefono_fijo:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Guarda creado correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/guarda', UsuarioController.crearGuarda);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
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
 *               correo_personal:
 *                 type: string
 *               correo_institucional:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               tipo_documento:
 *                 type: string
 *               lugar_expedicion:
 *                 type: string
 *               genero:
 *                 type: string
 *               edad:
 *                 type: integer
 *               departamento:
 *                 type: string
 *               municipio:
 *                 type: string
 *               direccion:
 *                 type: string
 *               celular:
 *                 type: string
 *               telefono_fijo:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', UsuarioController.actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID (desactivación lógica)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario desactivado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', UsuarioController.eliminarUsuario);

module.exports = router;