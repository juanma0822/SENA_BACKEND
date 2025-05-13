const IngresosService = require('../services/ingresos.services');

const registrarIngresoSalida = async (req, res) => {
  try {
    const { tipo_ingreso } = req.body;
    const { numero_documento } = req.user; // Extraemos el numero_documento del token

    if (!tipo_ingreso) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevoRegistro = await IngresosService.registrarIngresoSalida(numero_documento, tipo_ingreso);
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIngresosDelDia = async (req, res) => {
  try {
    const { numero_documento } = req.user; // Extraemos el numero_documento del token

    const ingresos = await IngresosService.listarIngresosUsuarioDia(numero_documento);
    res.json(ingresos);
  } catch (error) {
    console.error('Error al obtener ingresos del día:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const obtenerHistorialPorDocumento = async (req, res) => {
  try {
    const { numero_documento } = req.params; // Extraemos el número de documento de los parámetros

    const ingresos = await IngresosService.listarIngresosUsuario(numero_documento);
    res.status(200).json(ingresos);
  } catch (error) {
    console.error('Error al obtener historial de ingresos por documento:', error);
    res.status(500).json({ error: 'Error interno del servidor', detalles: error.message });
  }
};

const obtenerIngresosPorUsuario = async (req, res) => {
  try {
    const { numero_documento } = req.user; // Extraemos el numero_documento del token

    const ingresos = await IngresosService.listarIngresosUsuario(numero_documento);
    res.status(200).json(ingresos);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', detalles: error.message });
  }
};

const resumenDiario = async (req, res) => {
  try {
    const { numero_documento } = req.user; // o donde guardes el usuario logueado

    const resumen = await IngresosService.getResumenDiario(numero_documento);
    res.json(resumen);
  } catch (error) {
    console.error("Error al obtener resumen diario:", error);
    res.status(500).json({ error: "Error al obtener el resumen diario" });
  }
};

const registrarIngresoSalidaPorGuarda = async (req, res) => {
  try {
    const { numero_documento, tipo_ingreso } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!numero_documento || !tipo_ingreso) {
      return res.status(400).json({ error: 'El número de documento y el tipo de ingreso son obligatorios.' });
    }

    const nuevoRegistro = await IngresosService.registrarIngresoSalidaPorGuarda(numero_documento, tipo_ingreso);
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    console.error('Error al registrar ingreso/salida por guarda:', error);
    res.status(500).json({ error: error.message });
  }
};

const obtenerFuncionariosDelDia = async (req, res) => {
  try {
    const funcionarios = await IngresosService.obtenerFuncionariosDelDia();
    res.status(200).json(funcionarios);
  } catch (error) {
    console.error('Error al obtener los funcionarios del día:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  registrarIngresoSalida,
  getIngresosDelDia,
  obtenerHistorialPorDocumento,
  obtenerIngresosPorUsuario,
  resumenDiario,
  registrarIngresoSalidaPorGuarda,
  obtenerFuncionariosDelDia,
};