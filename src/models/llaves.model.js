const db = require('../db');

const createLlave = async (nombre_llave, descripcion) => {
  const result = await db.query(
    `INSERT INTO llaves (nombre_llave, descripcion) 
     VALUES ($1, $2) RETURNING *`,
    [nombre_llave, descripcion]
  );
  return result.rows[0];
};

module.exports = {
  createLlave,
};