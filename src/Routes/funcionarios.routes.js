const express = require('express');
const router = express.Router();
const FuncionarioController = require('../controllers/funcionarios.controller');

router.get('/', FuncionarioController.getFuncionarios);
router.get('/:id', FuncionarioController.getFuncionario);
router.post('/', FuncionarioController.crearFuncionario);
router.put('/:id', FuncionarioController.actualizarFuncionario);
router.delete('/:id', FuncionarioController.eliminarFuncionario);

module.exports = router;

