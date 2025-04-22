const AprendizModel = require('../models/aprendices.model');
const UsuarioService = require('../services/usuarios.services');
const moment = require('moment');  // Usa moment.js para manejar la fecha

exports.crearAprendiz = async (req, res) => {
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
      fecha_nacimiento,  // Recibimos la fecha como string
      programa_formacion,
      numero_ficha,
      nivelSisben,
      grupoSisben
    } = req.body;

    // Convertimos la fecha de "DD/MMMM/YYYY" a "YYYY-MM-DD"
    const fechaFormateada = moment(fecha_nacimiento, "DD/MMMM/YYYY").format("YYYY-MM-DD");

    // PRIMERO creamos el usuario
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
      fecha_nacimiento: fechaFormateada,  // Usamos la fecha formateada aquí
      rol: 'aprendiz'
    });

    // LUEGO creamos el aprendiz
    const nuevoAprendiz = await AprendizModel.crearAprendiz(numero_documento, {
      programa_formacion,
      numero_ficha,
      nivelSisben,
      grupoSisben
    });

    res.status(201).json({
      message: 'Aprendiz creado correctamente',
      usuario: nuevoUsuario,
      aprendiz: nuevoAprendiz
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerAprendices = async (req, res) => {
  try {
    const aprendices = await AprendizModel.obtenerAprendices();
    res.json(aprendices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerAprendiz = async (req, res) => {
  try {
    const aprendiz = await AprendizModel.obtenerAprendizPorDoc(req.params.id);
    if (!aprendiz) return res.status(404).json({ error: 'Aprendiz no encontrado' });
    res.json(aprendiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarAprendiz = async (req, res) => {
  try {
    const aprendiz = await AprendizModel.actualizarAprendiz(req.params.id, req.body);
    res.json(aprendiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarAprendiz = async (req, res) => {
  try {
    const aprendiz = await AprendizModel.eliminarAprendiz(req.params.id);
    res.json({ message: 'Aprendiz eliminado correctamente', aprendiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
