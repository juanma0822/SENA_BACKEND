// src/models/ingresos.model.js
const db = require('../db');

// Utilidad para convertir a hora Colombia
const convertirAHoraColombia = (fila) => {
  return {
    ...fila,
    fecha_hora_colombia: new Date(fila.fecha_hora).toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };
};

const crearIngreso = async (numero_documento, tipo_ingreso) => {
  const result = await db.query(
    `INSERT INTO ingresos (numero_documento, tipo_ingreso, fecha_hora)
     VALUES ($1, $2, NOW() AT TIME ZONE 'America/Bogota')
     RETURNING *`,
    [numero_documento, tipo_ingreso]
  );

  return convertirAHoraColombia(result.rows[0]);
};

// Ingresos por usuario - HISTORIAL
const obtenerIngresosPorUsuario = async (numero_documento) => {
  const result = await db.query(
    `SELECT * FROM ingresos
     WHERE numero_documento = $1
     ORDER BY fecha_hora DESC`,
    [numero_documento]
  );
  return result.rows.map(convertirAHoraColombia);
};

// Ingresos por usuario - del DÍA
const obtenerIngresosDelDia = async (numero_documento) => {
  const result = await db.query(
    `SELECT * FROM ingresos 
     WHERE numero_documento = $1 
     AND (fecha_hora AT TIME ZONE 'America/Bogota')::date = CURRENT_DATE
     ORDER BY fecha_hora ASC`,
    [numero_documento]
  );
  return result.rows.map(convertirAHoraColombia);
};

// Verificar el último ingreso del día
const obtenerUltimoIngresoDelDia = async (numero_documento) => {
  const result = await db.query(
    `SELECT tipo_ingreso, fecha_hora
     FROM ingresos
     WHERE numero_documento = $1
       AND (fecha_hora AT TIME ZONE 'America/Bogota')::date = CURRENT_DATE
     ORDER BY fecha_hora DESC
     LIMIT 1`,
    [numero_documento]
  );

  const fila = result.rows[0];
  return fila ? convertirAHoraColombia(fila) : undefined;
};

module.exports = {
  crearIngreso,
  obtenerIngresosPorUsuario,
  obtenerIngresosDelDia,
  obtenerUltimoIngresoDelDia,
};
