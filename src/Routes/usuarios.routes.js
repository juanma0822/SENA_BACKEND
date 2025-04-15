const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarios.controller');

router.get('/', UsuarioController.obtenerUsuarios);
router.get('/:id', UsuarioController.obtenerUsuarioPorId);
router.post('/', UsuarioController.crearUsuario);
router.post('/admin', UsuarioController.crearAdmin);
router.post('/guarda', UsuarioController.crearGuarda);
router.put('/:id', UsuarioController.actualizarUsuario);
router.delete('/:id', UsuarioController.eliminarUsuario);

module.exports = router;
