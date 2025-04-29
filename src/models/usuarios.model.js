const db = require('../db');

const buscarUsuarioPorCampoUnico = async ({ numero_documento, correo_personal, correo_institucional }) => {
  const condiciones = [];
  const valores = [];

  if (numero_documento) {
    condiciones.push('numero_documento = $' + (valores.length + 1));
    valores.push(numero_documento);
  }
  if (correo_personal) {
    condiciones.push('correo_personal = $' + (valores.length + 1));
    valores.push(correo_personal);
  }
  if (correo_institucional) {
    condiciones.push('correo_institucional = $' + (valores.length + 1));
    valores.push(correo_institucional);
  }

  const query = `
    SELECT * FROM usuarios
    WHERE (${condiciones.join(' OR ')}) AND activo = true
  `;

  const result = await db.query(query, valores);
  return result.rows;
};

const crearUsuario = async (datos) => {
  const {
    numero_documento, nombres, apellidos, correo_personal,
    correo_institucional, contrasena, tipo_documento, lugar_expedicion,
    genero, edad, departamento, municipio, direccion, celular,
    telefono_fijo, rol, fecha_nacimiento
  } = datos;

  const result = await db.query(`
    INSERT INTO usuarios (
      numero_documento, nombres, apellidos, correo_personal, correo_institucional,
      contrasena, tipo_documento, lugar_expedicion, genero, edad,
      departamento, municipio, direccion, celular, telefono_fijo,
      rol, fecha_nacimiento
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
    RETURNING *;
  `, [
    numero_documento, nombres, apellidos, correo_personal, correo_institucional,
    contrasena, tipo_documento, lugar_expedicion, genero, edad,
    departamento, municipio, direccion, celular, telefono_fijo,
    rol, fecha_nacimiento
  ]);

  return result.rows[0];
};

const obtenerTodos = async () => {
  const result = await db.query('SELECT * FROM usuarios WHERE activo = true');
  return result.rows;
};

const obtenerPorDocumento = async (numero_documento) => {
  const result = await db.query('SELECT * FROM usuarios WHERE numero_documento = $1 AND activo = true', [numero_documento]);
  return result.rows[0];
};


const actualizar = async (numero_documento, datos) => {
  const campos = Object.keys(datos).map((key, index) => `${key} = $${index + 2}`).join(', ');
  const valores = Object.values(datos);
  const result = await db.query(
    `UPDATE usuarios SET ${campos} WHERE numero_documento = $1 RETURNING *`,
    [numero_documento, ...valores]
  );
  return result.rows[0];
};

const eliminarLogico = async (numero_documento) => {
  const result = await db.query(
    'UPDATE usuarios SET activo = false WHERE numero_documento = $1 RETURNING *',
    [numero_documento]
  );
  return result.rows[0];
};

const existingUser = async (correo_institucional) => {
  const result = await db.query(`
    SELECT * FROM usuarios WHERE correo_institucional = $1
  `, [correo_institucional]);

  return result.rows[0];
};

module.exports = {
  buscarUsuarioPorCampoUnico,
  crearUsuario,
  obtenerTodos,
  obtenerPorDocumento,
  actualizar,
  eliminarLogico,
  existingUser,
};
