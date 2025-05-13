const UsuarioModel = require('../models/usuarios.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendEmail, generateEmailTemplate } = require('../services/emailService');

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

const recuperarContrasena = async ({ correo_institucional, numero_documento }) => {
  // Validar que existan los datos
  if (!correo_institucional || !numero_documento) {
    throw { status: 400, message: 'Correo institucional y número de documento son requeridos' };
  }

  // Buscar al usuario
  const usuario = await UsuarioModel.existingUser(correo_institucional);

  if (!usuario || usuario.numero_documento !== numero_documento) {
    throw { status: 404, message: 'Usuario no encontrado o datos inválidos' };
  }

  // Generar una contraseña aleatoria
  const nuevaContrasena = Math.random().toString(36).slice(-8); // Genera una contraseña de 8 caracteres
  const hashedContrasena = await bcrypt.hash(nuevaContrasena, 10);

  // Actualizar la contraseña en la base de datos
  await UsuarioModel.actualizarContrasena(numero_documento, hashedContrasena);

  // Enviar correos al correo personal e institucional
  const emailContent = generateEmailTemplate(
    {
      nombre: usuario.nombres,
      apellido: usuario.apellidos,
      nuevaContrasena: nuevaContrasena,
    },
    `<p>Si no solicitaste este cambio, por favor contacta a la institución.</p>`
  );

  await sendEmail(usuario.correo_personal, 'Recuperación de contraseña', emailContent);
  await sendEmail(usuario.correo_institucional, 'Recuperación de contraseña', emailContent);

  return { message: 'Se ha enviado una nueva contraseña a tus correos registrados' };
};

module.exports = {
  verifyCredentials,
  recuperarContrasena,
};
