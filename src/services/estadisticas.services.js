const EstadisticasModel = require('../models/estadisticas.model');

const obtenerEstadisticasDelDia = async () => {
  const estadisticas = await EstadisticasModel.obtenerEstadisticasDelDia();

  return {
    usuariosIngresadosHoy: parseInt(estadisticas.usuarios_ingresados_hoy, 10) || 0,
    usuariosSalidosHoy: parseInt(estadisticas.usuarios_salidos_hoy, 10) || 0,
    promedioEntradas: parseFloat(estadisticas.promedio_entradas) || 0,
    promedioSalidas: parseFloat(estadisticas.promedio_salidas) || 0,
  };
};

module.exports = {
  obtenerEstadisticasDelDia,
};