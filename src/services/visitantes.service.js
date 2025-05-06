const VisitantesModel = require('../models/visitantes.model');

const registrarVisitante = async (datos) => {
  return await VisitantesModel.registrarVisitante(datos);
};

module.exports = {
  registrarVisitante,
};