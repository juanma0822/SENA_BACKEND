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
 * /api/usuarios/info:
 *   get:
 *     summary: Obtener información del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: [] # Indica que esta ruta requiere autenticación con token
 *     responses:
 *       200:
 *         description: Datos del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numero_documento:
 *                   type: string
 *                   description: Número de documento del usuario
 *                 nombres:
 *                   type: string
 *                   description: Nombres del usuario
 *                 apellidos:
 *                   type: string
 *                   description: Apellidos del usuario
 *                 correo_personal:
 *                   type: string
 *                   description: Correo personal del usuario
 *                 correo_institucional:
 *                   type: string
 *                   description: Correo institucional del usuario
 *                 rol:
 *                   type: string
 *                   description: Rol del usuario (aprendiz, funcionario, etc.)
 *                 programa_formacion:
 *                   type: string
 *                   description: Programa de formación (solo para aprendices)
 *                 numero_ficha:
 *                   type: string
 *                   description: Número de ficha (solo para aprendices)
 *                 cargo:
 *                   type: string
 *                   description: Cargo del funcionario (solo para funcionarios)
 *                 area_trabajo:
 *                   type: string
 *                   description: Área de trabajo del funcionario (solo para funcionarios)
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
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
 * /api/usuarios/info:
 *   put:
 *     summary: Actualizar información del usuario autenticado
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               programa_formacion:
 *                 type: string
 *                 description: Programa de formación (solo para aprendices)
 *               numero_ficha:
 *                 type: string
 *                 description: Número de ficha (solo para aprendices)
 *               nivelSisben:
 *                 type: string
 *                 description: Nivel del SISBEN (solo para aprendices)
 *               grupoSisben:
 *                 type: integer
 *                 description: Grupo del SISBEN (solo para aprendices)
 *               cargo:
 *                 type: string
 *                 description: Cargo del funcionario (solo para funcionarios)
 *               area_trabajo:
 *                 type: string
 *                 description: Área de trabajo del funcionario (solo para funcionarios)
 *               tipo_funcionario:
 *                 type: string
 *                 description: Tipo de funcionario (solo para funcionarios)
 *               nombres:
 *                 type: string
 *                 description: Nombres del usuario
 *               apellidos:
 *                 type: string
 *                 description: Apellidos del usuario
 *               correo_personal:
 *                 type: string
 *                 description: Correo personal del usuario
 *               correo_institucional:
 *                 type: string
 *                 description: Correo institucional del usuario
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario
 *               tipo_documento:
 *                 type: string
 *                 description: Tipo de documento del usuario
 *               lugar_expedicion:
 *                 type: string
 *                 description: Lugar de expedición del documento
 *               genero:
 *                 type: string
 *                 description: Género del usuario
 *               edad:
 *                 type: integer
 *                 description: Edad del usuario
 *               departamento:
 *                 type: string
 *                 description: Departamento del usuario
 *               municipio:
 *                 type: string
 *                 description: Municipio del usuario
 *               direccion:
 *                 type: string
 *                 description: Dirección del usuario
 *               celular:
 *                 type: string
 *                 description: Celular del usuario
 *               telefono_fijo:
 *                 type: string
 *                 description: Teléfono fijo del usuario
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 *       500:
 *         description: Error interno del servidor
 */
router.put('/info',verifyToken, UsuarioController.actualizarUsuario);

/**
 * @swagger
 * /api/usuarios:
 *   delete:
 *     summary: Eliminar el usuario autenticado (desactivación lógica)
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Usuario desactivado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 */
router.delete('/', verifyToken, UsuarioController.eliminarUsuario);

module.exports = router;