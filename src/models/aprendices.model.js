const db = require('../db');

const crearAprendiz = async (numero_documento, datos) => {
  const { programa_formacion, numero_ficha } = datos;
  const result = await db.query(`
    INSERT INTO aprendices (numero_documento, programa_formacion, numero_ficha)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [numero_documento, programa_formacion, numero_ficha]);
  return result.rows[0];
};

const obtenerAprendices = async () => {
  const result = await db.query(`
    SELECT a.*, u.nombres, u.apellidos, u.departamento, u.municipio
    FROM aprendices a
    JOIN usuarios u ON u.numero_documento = a.numero_documento
    WHERE u.activo = true;
  `);
  return result.rows;
};

const obtenerAprendizPorDoc = async (numero_documento) => {
  const result = await db.query(`
    SELECT a.*, u.*
    FROM aprendices a
    JOIN usuarios u ON u.numero_documento = a.numero_documento
    WHERE a.numero_documento = $1 AND u.activo = true;
  `, [numero_documento]);
  return result.rows[0];
};

const actualizarAprendiz = async (numero_documento, datos) => {
  const { programa_formacion, numero_ficha } = datos;
  const result = await db.query(`
    UPDATE aprendices SET programa_formacion = $2, numero_ficha = $3
    WHERE numero_documento = $1 RETURNING *;
  `, [numero_documento, programa_formacion, numero_ficha]);
  return result.rows[0];
};

const eliminarAprendiz = async (numero_documento) => {
  const result = await db.query(`
    DELETE FROM aprendices WHERE numero_documento = $1 RETURNING *;
  `, [numero_documento]);
  return result.rows[0];
};

module.exports = {
  crearAprendiz,
  obtenerAprendices,
  obtenerAprendizPorDoc,
  actualizarAprendiz,
  eliminarAprendiz
};
