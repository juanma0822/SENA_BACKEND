const db = require('../db');

const crearFuncionario = async (numero_documento, datos) => {
  const { cargo, area_trabajo, tipo_funcionario } = datos;
  const result = await db.query(`
    INSERT INTO funcionarios (numero_documento, cargo, area_trabajo, tipo_funcionario)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `, [numero_documento, cargo, area_trabajo, tipo_funcionario]);
  return result.rows[0];
};

const obtenerFuncionarios = async () => {
  const result = await db.query(`
    SELECT f.*, u.nombres, u.apellidos, u.departamento, u.municipio
    FROM funcionarios f
    JOIN usuarios u ON u.numero_documento = f.numero_documento
    WHERE u.activo = true;
  `);
  return result.rows;
};

const obtenerFuncionarioPorDoc = async (numero_documento) => {
  const result = await db.query(`
    SELECT f.*, u.*
    FROM funcionarios f
    JOIN usuarios u ON u.numero_documento = f.numero_documento
    WHERE f.numero_documento = $1 AND u.activo = true;
  `, [numero_documento]);
  return result.rows[0];
};

const actualizarFuncionario = async (numero_documento, datos) => {
  const { cargo, area_trabajo, tipo_funcionario } = datos;
  const result = await db.query(`
    UPDATE funcionarios SET cargo = $2, area_trabajo = $3, tipo_funcionario = $4
    WHERE numero_documento = $1 RETURNING *;
  `, [numero_documento, cargo, area_trabajo, tipo_funcionario]);
  return result.rows[0];
};

const eliminarFuncionario = async (numero_documento) => {
  const result = await db.query(`
    DELETE FROM funcionarios WHERE numero_documento = $1 RETURNING *;
  `, [numero_documento]);
  return result.rows[0];
};

module.exports = {
  crearFuncionario,
  obtenerFuncionarios,
  obtenerFuncionarioPorDoc,
  actualizarFuncionario,
  eliminarFuncionario
};
