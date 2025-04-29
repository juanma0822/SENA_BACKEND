// src/models/ingresos.model.js
const db = require('../db');

const crearIngreso = async (numero_documento, tipo_ingreso) => {
  const result = await db.query(
    `INSERT INTO ingresos (numero_documento, tipo_ingreso, fecha_hora)
     VALUES ($1, $2, NOW())
     RETURNING *`,
    [numero_documento, tipo_ingreso]
  );
  return result.rows[0];
};

//Ingresos por usuario - HISTORIAL
const obtenerIngresosPorUsuario = async (numero_documento) => {
  const result = await db.query(
    `SELECT * FROM ingresos
     WHERE numero_documento = $1
     ORDER BY fecha_hora DESC`,
    [numero_documento]
  );
  return result.rows;
};

//Ingresos por usuario - del DIA
const obtenerIngresosDelDia = async (numero_documento) => {
    const result = await db.query(
      `SELECT * FROM ingresos 
       WHERE numero_documento = $1 
       AND fecha_hora::date = CURRENT_DATE
       ORDER BY fecha_hora ASC`,
      [numero_documento]
    );
    return result.rows;
};

// Verificar el último registro del día para validar si falta salida
const obtenerUltimoIngresoDelDia = async (numero_documento) => {
  const result = await db.query(
    `SELECT tipo_ingreso
     FROM ingresos
     WHERE numero_documento = $1
       AND DATE(fecha_hora) = CURRENT_DATE
     ORDER BY fecha_hora DESC
     LIMIT 1`,
    [numero_documento]
  );
  return result.rows[0]; // Puede ser undefined si no hay ingreso hoy
};

module.exports = {
  crearIngreso,
  obtenerIngresosPorUsuario,
  obtenerIngresosDelDia,
  obtenerUltimoIngresoDelDia,
};
