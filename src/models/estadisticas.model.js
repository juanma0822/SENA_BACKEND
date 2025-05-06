const db = require('../db');

const obtenerEstadisticasDelDia = async () => {
  const result = await db.query(`
    SELECT
      COUNT(*) FILTER (WHERE tipo_ingreso = 'entrada') AS usuarios_ingresados_hoy,
      COUNT(*) FILTER (WHERE tipo_ingreso = 'salida') AS usuarios_salidos_hoy,
      AVG(entradas.cantidad) AS promedio_entradas,
      AVG(salidas.cantidad) AS promedio_salidas
    FROM ingresos
    LEFT JOIN (
      SELECT numero_documento, COUNT(*) AS cantidad
      FROM ingresos
      WHERE tipo_ingreso = 'entrada'
      AND fecha_hora::date = CURRENT_DATE
      GROUP BY numero_documento
    ) AS entradas ON ingresos.numero_documento = entradas.numero_documento
    LEFT JOIN (
      SELECT numero_documento, COUNT(*) AS cantidad
      FROM ingresos
      WHERE tipo_ingreso = 'salida'
      AND fecha_hora::date = CURRENT_DATE
      GROUP BY numero_documento
    ) AS salidas ON ingresos.numero_documento = salidas.numero_documento
    WHERE fecha_hora::date = CURRENT_DATE;
  `);

  return result.rows[0];
};

module.exports = {
  obtenerEstadisticasDelDia,
};