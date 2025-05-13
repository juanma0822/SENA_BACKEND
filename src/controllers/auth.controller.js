const AuthService = require('../services/auth.services');

exports.verifyLogin = async (req, res) => {
  try {
    const { correo_institucional, contrasena } = req.body;

    const token = await AuthService.verifyCredentials({ correo_institucional, contrasena });

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
};

exports.recuperarContrasena = async (req, res) => {
  try {
    const { correo_institucional, numero_documento } = req.body;

    const response = await AuthService.recuperarContrasena({ correo_institucional, numero_documento });

    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
};
