const LlavesService = require("../services/llaves.services");

const createLlave = async (req, res) => {
  try {
    const { nombre_llave, descripcion } = req.body;

    if (!nombre_llave || !descripcion) {
      return res.status(400).json({ error: "Faltan datos para crear la llave." });
    }

    const nuevaLlave = await LlavesService.createLlave(nombre_llave, descripcion);
    res.status(201).json(nuevaLlave);
  } catch (error) {
    console.error("Error al crear la llave:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const obtenerLlavesEnUso = async (req, res) => {
  try {
    const llavesEnUso = await LlavesService.obtenerLlavesEnUso();
    res.status(200).json(llavesEnUso);
  } catch (error) {
    console.error('Error al obtener las llaves en uso:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const obtenerLlavesDisponibles = async (req, res) => {
  try {
    const llaves = await LlavesService.obtenerLlavesDisponibles();
    res.status(200).json(llaves);
  } catch (error) {
    console.error('Error al obtener las llaves disponibles:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const registrarPrestamoLlave = async (req, res) => {
  try {
    const { id_llave, numero_documento } = req.body;
    const { numero_documento: registrado_por } = req.user; // Extraemos el número de documento del token

    if (!id_llave || !numero_documento) {
      return res.status(400).json({ error: 'Faltan datos para registrar el préstamo.' });
    }

    const prestamo = await LlavesService.registrarPrestamoLlave({
      id_llave,
      numero_documento,
      registrado_por,
    });

    res.status(201).json(prestamo);
  } catch (error) {
    console.error('Error al registrar el préstamo de la llave:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const devolverLlave = async (req, res) => {
  try {
    const { id_prestamo } = req.params;

    if (!id_prestamo) {
      return res.status(400).json({ error: 'El ID del préstamo es obligatorio.' });
    }

    const devolucion = await LlavesService.devolverLlave(id_prestamo);

    res.status(200).json(devolucion);
  } catch (error) {
    console.error('Error al devolver la llave:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createLlave,
  obtenerLlavesEnUso,
  obtenerLlavesDisponibles,
  registrarPrestamoLlave,
  devolverLlave,
};
