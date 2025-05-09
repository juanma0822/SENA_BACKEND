const db = require('../db');

const createLlave = async (nombre_llave, descripcion) => {
  const result = await db.query(
    `INSERT INTO llaves (nombre_llave, descripcion) 
     VALUES ($1, $2) RETURNING *`,
    [nombre_llave, descripcion]
  );
  return result.rows[0];
};

const obtenerLlavesEnUso = async () => {
  const query = `
    SELECT 
      pl.id_prestamo,
      l.id_llave,
      l.nombre_llave,
      l.descripcion,
      pl.numero_documento,
      pl.registrado_por,
      pl.fecha_entrega
    FROM prestamo_llaves pl
    INNER JOIN llaves l ON pl.id_llave = l.id_llave
    WHERE pl.fecha_devolucion IS NULL;
  `;
  const result = await db.query(query);
  return result.rows;
};

const obtenerLlavesDisponibles = async () => {
  const query = `
    SELECT DISTINCT ON (l.id_llave) 
      l.id_llave,
      l.nombre_llave,
      l.descripcion
    FROM llaves l
    LEFT JOIN prestamo_llaves pl ON l.id_llave = pl.id_llave
    WHERE pl.fecha_devolucion IS NOT NULL OR pl.id_llave IS NULL;
  `;
  const result = await db.query(query);
  return result.rows;
};

const registrarPrestamoLlave = async ({ id_llave, numero_documento, registrado_por }) => {
  const query = `
    INSERT INTO prestamo_llaves (id_llave, numero_documento, registrado_por, fecha_entrega)
    VALUES ($1, $2, $3, NOW() AT TIME ZONE 'America/Bogota')
    RETURNING *;
  `;
  const values = [id_llave, numero_documento, registrado_por];
  const result = await db.query(query, values);
  return result.rows[0];
};

const devolverLlave = async (id_prestamo) => {
  const query = `
    UPDATE prestamo_llaves
    SET fecha_devolucion = NOW() AT TIME ZONE 'America/Bogota'
    WHERE id_prestamo = $1
    RETURNING *;
  `;
  const values = [id_prestamo];
  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = {
  createLlave,
  obtenerLlavesEnUso,
  obtenerLlavesDisponibles,
  registrarPrestamoLlave,
  devolverLlave,
};