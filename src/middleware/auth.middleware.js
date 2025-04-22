const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware para verificar si el usuario está autenticado
 * Verifica el token JWT enviado en el header de la solicitud
 */
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó un token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos los datos del usuario en la solicitud
    next(); // Continuamos con la siguiente función
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = { verifyToken };
