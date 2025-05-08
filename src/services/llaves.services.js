const LlavesModel = require("../models/llaves.model");

const createLlave = async (nombre_llave, descripcion) => {
  try {
    const result = await LlavesModel.createLlave(nombre_llave, descripcion);
    return result;
  } catch (error) {
    throw new Error("Error al crear la llave en el servicio.");
  }
};

module.exports = {
  createLlave,
};
