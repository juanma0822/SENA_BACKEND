const UsuarioService = require('../services/usuarios.services');
const UsuarioModel = require('../models/usuarios.model');
const AprendizModel = require('../models/aprendices.model');
const FuncionarioModel = require('../models/funcionarios.model');

exports.crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await UsuarioService.crearUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.crearAdmin = async (req, res) => {
  try {
    const nuevoUsuario = await UsuarioService.crearUsuario({ ...req.body, rol: 'admin' });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.crearGuarda = async (req, res) => {
  try {
    const nuevoUsuario = await UsuarioService.crearUsuario({ ...req.body, rol: 'guarda' });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.obtenerTodos();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const { numero_documento, rol } = req.user; // Datos del token decodificado

    let usuario;

    if (rol === 'aprendiz') {
      // Si es aprendiz, obtenemos datos de la tabla aprendices
      usuario = await AprendizModel.obtenerAprendizPorDoc(numero_documento);
    } else if (rol === 'funcionario') {
      // Si es funcionario, obtenemos datos de la tabla funcionarios
      usuario = await FuncionarioModel.obtenerFuncionarioPorDoc(numero_documento);
    } else {
      // Si es otro rol, obtenemos solo los datos de la tabla usuarios
      usuario = await UsuarioModel.obtenerPorDocumento(numero_documento);
    }

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const usuario = await UsuarioService.actualizarUsuario(req.params.id, req.body);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await UsuarioModel.eliminarLogico(req.params.id);
    res.json({ message: 'Usuario desactivado correctamente', usuario });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
