const UsuarioModel = require('../models/usuarios.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const verifyCredentials = async ({ correo_institucional, contrasena }) => {
  if (!correo_institucional || !contrasena) {
    throw { status: 400, message: 'Correo y contraseña requeridos' };
  }

  const usuario = await UsuarioModel.existingUser(correo_institucional);

  if (!usuario) {
    throw { status: 401, message: 'Usuario no encontrado' };
  }

  // Verificar si el usuario está activo
  if (!usuario.activo) {
    throw { status: 403, message: 'Usuario inactivo, comunícate con la institución para volverte a activar' };
  }

  const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);

  if (!validPassword) {
    throw { status: 401, message: 'Contraseña incorrecta' };
  }

  const payload = {
    numero_documento: usuario.numero_documento,
    rol: usuario.rol,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

  return token;
};

module.exports = {
  verifyCredentials
};
