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
    const { numero_documento, rol } = req.user; // Extraemos el rol y número de documento del token
    const datos = req.body;

    let usuarioActualizado;

    // Actualizamos los datos básicos en la tabla `usuarios`
    usuarioActualizado = await UsuarioService.actualizarUsuario(numero_documento, datos);

    // Dependiendo del rol, actualizamos en las tablas correspondientes
    if (rol === 'aprendiz') {
      const aprendizDatos = {
        programa_formacion: datos.programa_formacion,
        numero_ficha: datos.numero_ficha,
        nivelSisben: datos.nivelSisben,
        grupoSisben: datos.grupoSisben,
      };
      await AprendizModel.actualizarAprendiz(numero_documento, aprendizDatos);
    } else if (rol === 'funcionario') {
      const funcionarioDatos = {
        cargo: datos.cargo,
        area_trabajo: datos.area_trabajo,
        tipo_funcionario: datos.tipo_funcionario,
      };
      await FuncionarioModel.actualizarFuncionario(numero_documento, funcionarioDatos);
    }

    res.json({
      message: 'Usuario actualizado correctamente',
      usuario: usuarioActualizado,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const { numero_documento } = req.user; // Extraemos el numero_documento del token

    const usuario = await UsuarioModel.eliminarLogico(numero_documento);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario desactivado correctamente', usuario });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
