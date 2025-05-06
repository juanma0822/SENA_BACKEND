const db = require('../db');

const registrarVisitante = async ({ nombres, apellidos, tipo_documento, numero_documento, motivo, area_destino, registrado_por }) => {
  const query = `
    INSERT INTO visitantes (nombres, apellidos, tipo_documento, numero_documento, motivo, area_destino, fecha_hora_ingreso, registrado_por)
    VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)
    RETURNING *;
  `;
  const values = [nombres, apellidos, tipo_documento, numero_documento, motivo, area_destino, registrado_por];
  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = {
  registrarVisitante,
};