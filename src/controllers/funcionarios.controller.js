const FuncionarioModel = require('../models/funcionarios.model');
const UsuarioService = require('../services/usuarios.services');

exports.crearFuncionario = async (req, res) => {
  try {
    const {
      numero_documento,
      nombres,
      apellidos,
      correo_personal,
      correo_institucional,
      contrasena,
      tipo_documento,
      lugar_expedicion,
      genero,
      edad,
      departamento,
      municipio,
      direccion,
      celular,
      telefono_fijo,
      fecha_nacimiento,
      cargo,
      area_trabajo,
      tipo_funcionario
    } = req.body;

    const nuevoUsuario = await UsuarioService.crearUsuario({
      numero_documento,
      nombres,
      apellidos,
      correo_personal,
      correo_institucional,
      contrasena,
      tipo_documento,
      lugar_expedicion,
      genero,
      edad,
      departamento,
      municipio,
      direccion,
      celular,
      telefono_fijo,
      fecha_nacimiento,
      rol: 'funcionario'
    });

    const nuevoFuncionario = await FuncionarioModel.crearFuncionario(numero_documento, {
      cargo,
      area_trabajo,
      tipo_funcionario
    });

    res.status(201).json({
      message: 'Funcionario creado correctamente',
      usuario: nuevoUsuario,
      funcionario: nuevoFuncionario
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFuncionarios = async (req, res) => {
  try {
    const funcionarios = await FuncionarioModel.obtenerFuncionarios();
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFuncionario = async (req, res) => {
  try {
    const funcionario = await FuncionarioModel.obtenerFuncionarioPorDoc(req.params.id);
    if (!funcionario) return res.status(404).json({ error: 'Funcionario no encontrado' });
    res.json(funcionario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarFuncionario = async (req, res) => {
  try {
    const funcionario = await FuncionarioModel.actualizarFuncionario(req.params.id, req.body);
    res.json(funcionario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarFuncionario = async (req, res) => {
  try {
    const funcionario = await FuncionarioModel.eliminarFuncionario(req.params.id);
    res.json({ message: 'Funcionario eliminado correctamente', funcionario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
