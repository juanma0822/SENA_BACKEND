const express = require('express');
const router = express.Router();
const AprendizController = require('../controllers/aprendices.controller');

router.get('/', AprendizController.obtenerAprendices);
router.get('/:id', AprendizController.obtenerAprendiz);
router.post('/', AprendizController.crearAprendiz);
router.put('/:id', AprendizController.actualizarAprendiz);
router.delete('/:id', AprendizController.eliminarAprendiz);

module.exports = router;
