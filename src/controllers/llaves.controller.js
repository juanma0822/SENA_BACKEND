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

module.exports = {
  createLlave,
};
