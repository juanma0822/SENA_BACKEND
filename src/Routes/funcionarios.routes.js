const express = require('express');
const router = express.Router();
const FuncionarioController = require('../controllers/funcionarios.controller');

/**
 * @swagger
 * tags:
 *   name: Funcionarios
 *   description: Gestión de funcionarios
 */

/**
 * @swagger
 * /api/funcionarios:
 *   get:
 *     summary: Obtener todos los funcionarios
 *     tags: [Funcionarios]
 *     responses:
 *       200:
 *         description: Lista de funcionarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', FuncionarioController.getFuncionarios);

/**
 * @swagger
 * /api/funcionarios/{id}:
 *   get:
 *     summary: Obtener un funcionario por ID
 *     tags: [Funcionarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del funcionario
 *     responses:
 *       200:
 *         description: Datos del funcionario
 *       404:
 *         description: Funcionario no encontrado
 */
router.get('/:id', FuncionarioController.getFuncionario);

/**
 * @swagger
 * /api/funcionarios:
 *   post:
 *     summary: Crear un nuevo funcionario
 *     tags: [Funcionarios]
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
 *               cargo:
 *                 type: string
 *               area_trabajo:
 *                 type: string
 *               tipo_funcionario:
 *                 type: string
 *                 enum: [planta, contratista]
 *     responses:
 *       201:
 *         description: Funcionario creado correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/', FuncionarioController.crearFuncionario);

/**
 * @swagger
 * /api/funcionarios/{id}:
 *   put:
 *     summary: Actualizar un funcionario por ID
 *     tags: [Funcionarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del funcionario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cargo:
 *                 type: string
 *               area_trabajo:
 *                 type: string
 *               tipo_funcionario:
 *                 type: string
 *                 enum: [planta, contratista]
 *     responses:
 *       200:
 *         description: Funcionario actualizado correctamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Funcionario no encontrado
 */
router.put('/:id', FuncionarioController.actualizarFuncionario);

/**
 * @swagger
 * /api/funcionarios/{id}:
 *   delete:
 *     summary: Eliminar un funcionario por ID
 *     tags: [Funcionarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del funcionario
 *     responses:
 *       200:
 *         description: Funcionario eliminado correctamente
 *       404:
 *         description: Funcionario no encontrado
 */
router.delete('/:id', FuncionarioController.eliminarFuncionario);

module.exports = router;