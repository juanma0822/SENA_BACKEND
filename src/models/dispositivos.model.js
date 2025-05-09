const db = require('../db');

const registrarSalidaDispositivo = async ({ tipo_elemento, descripcion, numero_documento, registrado_por, numero_serie }) => {
  const query = `
    INSERT INTO dispositivos_salida (tipo_elemento, descripcion, numero_documento, registrado_por, numero_serie, fecha_hora_salida)
    VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING *;
  `;
  const values = [tipo_elemento, descripcion, numero_documento, registrado_por, numero_serie];
  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = {
  registrarSalidaDispositivo,
};