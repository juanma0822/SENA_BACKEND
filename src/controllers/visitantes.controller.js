const VisitantesService = require('../services/visitantes.service');

const registrarVisitante = async (req, res) => {
  try {
    const { nombres, apellidos, tipo_documento, numero_documento, motivo, area_destino } = req.body;
    const { numero_documento: registrado_por } = req.user; // Extraemos el número de documento del token

    // Validar que todos los campos estén presentes
    if (!nombres || !apellidos || !tipo_documento || !numero_documento || !motivo || !area_destino) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Registrar al visitante
    const visitante = await VisitantesService.registrarVisitante({
      nombres,
      apellidos,
      tipo_documento,
      numero_documento,
      motivo,
      area_destino,
      registrado_por,
    });

    res.status(201).json({
      message: 'Visitante registrado correctamente.',
      visitante,
    });
  } catch (error) {
    console.error('Error al registrar visitante:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  registrarVisitante,
};