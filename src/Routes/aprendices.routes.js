const express = require('express');
const router = express.Router();
const AprendizController = require('../controllers/aprendices.controller');

/**
 * @swagger
 * tags:
 *   name: Aprendices
 *   description: Gestión de aprendices
 */

/**
 * @swagger
 * /api/aprendices:
 *   get:
 *     summary: Obtener todos los aprendices
 *     tags: [Aprendices]
 *     responses:
 *       200:
 *         description: Lista de aprendices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', AprendizController.obtenerAprendices);

/**
 * @swagger
 * /api/aprendices/{id}:
 *   get:
 *     summary: Obtener un aprendiz por ID
 *     tags: [Aprendices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del aprendiz
 *     responses:
 *       200:
 *         description: Datos del aprendiz
 *       404:
 *         description: Aprendiz no encontrado
 */
router.get('/:id', AprendizController.obtenerAprendiz);

/**
 * @swagger
 * /api/aprendices:
 *   post:
 *     summary: Crear un nuevo aprendiz
 *     tags: [Aprendices]
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
 *               programa_formacion:
 *                 type: string
 *               numero_ficha:
 *                 type: string
 *               nivelSisben:
 *                 type: string
 *               grupoSisben:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Aprendiz creado correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/', AprendizController.crearAprendiz);

/**
 * @swagger
 * /api/aprendices/{id}:
 *   put:
 *     summary: Actualizar un aprendiz por ID
 *     tags: [Aprendices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del aprendiz
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               programa_formacion:
 *                 type: string
 *               numero_ficha:
 *                 type: string
 *               nivelSisben:
 *                 type: string
 *               grupoSisben:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Aprendiz actualizado correctamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Aprendiz no encontrado
 */
router.put('/:id', AprendizController.actualizarAprendiz);

/**
 * @swagger
 * /api/aprendices/{id}:
 *   delete:
 *     summary: Eliminar un aprendiz por ID
 *     tags: [Aprendices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del aprendiz
 *     responses:
 *       200:
 *         description: Aprendiz eliminado correctamente
 *       404:
 *         description: Aprendiz no encontrado
 */
router.delete('/:id', AprendizController.eliminarAprendiz);

module.exports = router;