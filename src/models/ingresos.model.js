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
    `SELECT 
       tipo_ingreso,
       TO_CHAR(fecha_hora, 'YYYY-MM-DD HH24:MI:SS') AS fecha_hora
     FROM ingresos
     WHERE numero_documento = $1
     ORDER BY fecha_hora DESC`,
    [numero_documento]
  );

  return result.rows; // No es necesario aplicar `convertirAHoraColombia` aquí
};

// Ingresos por usuario - del DÍA
const obtenerIngresosDelDia = async (numero_documento) => {
  const result = await db.query(
    `SELECT 
       tipo_ingreso,
       TO_CHAR(fecha_hora, 'YYYY-MM-DD HH24:MI:SS') AS fecha_hora
     FROM ingresos 
     WHERE numero_documento = $1 
       AND fecha_hora::date = CURRENT_DATE
     ORDER BY fecha_hora ASC`,
    [numero_documento]
  );

  return result.rows;
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

const obtenerResumenDiario = async (numero_documento) => {
  const result = await db.query(`
    SELECT
      TO_CHAR(fecha_hora::date, 'YYYY-MM-DD') AS fecha,
      TO_CHAR(MIN(fecha_hora), 'YYYY-MM-DD HH24:MI:SS') AS primer_ingreso,
      TO_CHAR(MAX(fecha_hora) , 'YYYY-MM-DD HH24:MI:SS') AS ultima_salida,
      COUNT(*) FILTER (WHERE tipo_ingreso = 'entrada') AS total_entradas,
      COUNT(*) FILTER (WHERE tipo_ingreso = 'salida') AS total_salidas
    FROM ingresos
    WHERE numero_documento = $1
    GROUP BY fecha
    ORDER BY fecha DESC
  `, [numero_documento]);

  return result.rows;
};

const obtenerFuncionariosDelDia = async () => {
  const query = `
    SELECT DISTINCT
      u.numero_documento,
      u.nombres,
      u.apellidos,
      f.cargo
    FROM ingresos i
    INNER JOIN usuarios u ON i.numero_documento = u.numero_documento
    LEFT JOIN funcionarios f ON u.numero_documento = f.numero_documento
    WHERE i.tipo_ingreso = 'entrada'
      AND i.fecha_hora::date = (CURRENT_DATE AT TIME ZONE 'America/Bogota')::date
      AND (u.rol = 'funcionario' OR u.rol = 'admin')
    ORDER BY u.nombres, u.apellidos;
  `;
  const result = await db.query(query);
  return result.rows;
};


module.exports = {
  crearIngreso,
  obtenerIngresosPorUsuario,
  obtenerIngresosDelDia,
  obtenerUltimoIngresoDelDia,
  obtenerResumenDiario,
  obtenerFuncionariosDelDia
};
