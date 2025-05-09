const DispositivosService = require('../services/dispositivos.services');

const registrarSalidaDispositivo = async (req, res) => {
  try {
    const { tipo_elemento, descripcion, numero_documento, numero_serie } = req.body;
    const { numero_documento: registrado_por } = req.user; // Extraemos el número de documento del token

    // Validar que todos los campos estén presentes
    if (!tipo_elemento || !descripcion || !numero_documento || !numero_serie) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Registrar la salida del dispositivo
    const salida = await DispositivosService.registrarSalidaDispositivo({
      tipo_elemento,
      descripcion,
      numero_documento,
      registrado_por,
      numero_serie,
    });

    res.status(201).json({
      message: 'Salida de dispositivo registrada correctamente.',
      salida,
    });
  } catch (error) {
    console.error('Error al registrar la salida del dispositivo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  registrarSalidaDispositivo,
};