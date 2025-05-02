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
  const { correo_personal, correo_institucional } = datos;

  // Validar si los correos ya están en uso por otro usuario
  if (correo_personal || correo_institucional) {
    const usuariosExistentes = await UsuarioModel.buscarUsuarioPorCampoUnico({
      numero_documento: null, // No buscamos por número de documento aquí
      correo_personal,
      correo_institucional,
    });

    // Filtrar usuarios que no sean el actual
    const duplicados = usuariosExistentes.filter(
      (usuario) => usuario.numero_documento !== numero_documento
    );

    if (duplicados.length > 0) {
      throw new Error('El correo personal o institucional ya está en uso por otro usuario.');
    }
  }

  // Si se incluye contraseña, encriptarla antes de actualizar
  if (contrasena && contrasena.trim() !== '') {
    datos.contrasena = await bcrypt.hash(contrasena, 10);
  } else {
    // Si no se envía una contraseña válida, eliminamos el campo para no actualizarlo
    delete datos.contrasena;
  }

  // Actualizar el usuario
  return await UsuarioModel.actualizar(numero_documento, datos);
};

module.exports = {
  crearUsuario,
  actualizarUsuario
};
