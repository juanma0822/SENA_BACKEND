const EstadisticasService = require('../services/estadisticas.services');

const obtenerEstadisticasDelDia = async (req, res) => {
  try {
    const estadisticas = await EstadisticasService.obtenerEstadisticasDelDia();
    res.status(200).json(estadisticas);
  } catch (error) {
    console.error('Error al obtener estadísticas del día:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  obtenerEstadisticasDelDia,
};