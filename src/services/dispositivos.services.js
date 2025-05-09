const DispositivosModel = require('../models/dispositivos.model');

const registrarSalidaDispositivo = async (datos) => {
  return await DispositivosModel.registrarSalidaDispositivo(datos);
};

module.exports = {
  registrarSalidaDispositivo,
};