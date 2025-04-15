const bcrypt = require('bcryptjs');
const UsuarioModel = require('../models/usuarios.model');

const crearUsuario = async (datos) => {
  const { contrasena, numero_documento, correo_personal, correo_institucional } = datos;

  // Validar duplicados
  const encontrados = await UsuarioModel.buscarUsuarioPorCampoUnico({ numero_documento, correo_personal, correo_institucional });
  if (encontrados.length > 0) {
    throw new Error('Ya existe un usuario con ese documento o correo');
  }

  // Encriptar contraseña
  const hash = await bcrypt.hash(contrasena, 10);
  datos.contrasena = hash;

  return await UsuarioModel.crearUsuario(datos);
};

// Solo si vas a permitir actualizar contraseña
const actualizarUsuario = async (numero_documento, datos) => {
  if (datos.contrasena) {
    datos.contrasena = await bcrypt.hash(datos.contrasena, 10);
  }
  return await UsuarioModel.actualizar(numero_documento, datos);
};

module.exports = {
  crearUsuario,
  actualizarUsuario
};
