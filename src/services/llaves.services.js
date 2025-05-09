const LlavesModel = require("../models/llaves.model");

const createLlave = async (nombre_llave, descripcion) => {
  try {
    const result = await LlavesModel.createLlave(nombre_llave, descripcion);
    return result;
  } catch (error) {
    throw new Error("Error al crear la llave en el servicio.");
  }
};

const obtenerLlavesEnUso = async () => {
  try {
    const llavesEnUso = await LlavesModel.obtenerLlavesEnUso();
    return llavesEnUso;
  } catch (error) {
    throw new Error('Error al obtener las llaves en uso.');
  }
};

const obtenerLlavesDisponibles = async () => {
  try {
    const llaves = await LlavesModel.obtenerLlavesDisponibles();
    return llaves;
  } catch (error) {
    throw new Error('Error al obtener las llaves disponibles.');
  }
};

const registrarPrestamoLlave = async (datos) => {
  try {
    const prestamo = await LlavesModel.registrarPrestamoLlave(datos);
    return prestamo;
  } catch (error) {
    throw new Error('Error al registrar el préstamo de la llave.');
  }
};

const devolverLlave = async (id_prestamo) => {
  try {
    const devolucion = await LlavesModel.devolverLlave(id_prestamo);
    return devolucion;
  } catch (error) {
    throw new Error('Error al devolver la llave.');
  }
};

module.exports = {
  createLlave,
  obtenerLlavesEnUso,
  obtenerLlavesDisponibles,
  registrarPrestamoLlave,
  devolverLlave,
};
