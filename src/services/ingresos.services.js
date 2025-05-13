// src/services/ingresos.services.js
const IngresosModel = require('../models/ingresos.model');

const registrarIngresoSalida = async (numero_documento, tipo_ingreso) => {
    const ultimo = await IngresosModel.obtenerUltimoIngresoDelDia(numero_documento);
  
    if (tipo_ingreso === 'entrada') {
      if (ultimo?.tipo_ingreso === 'entrada') {
        throw new Error('Ya registraste una entrada hoy. Debes registrar una salida antes de una nueva entrada.');
      }
    }
  
    if (tipo_ingreso === 'salida') {
      if (!ultimo || ultimo.tipo_ingreso !== 'entrada') {
        throw new Error('No hay una entrada registrada pendiente para cerrar con una salida.');
      }
    }
  
    const nuevo = await IngresosModel.crearIngreso(numero_documento, tipo_ingreso);
    return nuevo;
  };

const listarIngresosUsuarioDia = async (numero_documento) => {
  const ingresos = await IngresosModel.obtenerIngresosDelDia(numero_documento);
  return ingresos;
};

const listarIngresosUsuario = async (numero_documento) => {
    const ingresos = await IngresosModel.obtenerIngresosPorUsuario(numero_documento);
    return ingresos;
};

const getResumenDiario = async (numero_documento) => {
  return await IngresosModel.obtenerResumenDiario(numero_documento);
};

const registrarIngresoSalidaPorGuarda = async (numero_documento, tipo_ingreso) => {
  const ultimo = await IngresosModel.obtenerUltimoIngresoDelDia(numero_documento);

  if (tipo_ingreso === 'entrada') {
    if (ultimo?.tipo_ingreso === 'entrada') {
      throw new Error('El usuario ya registró una entrada hoy. Debe registrar una salida antes de una nueva entrada.');
    }
  }

  if (tipo_ingreso === 'salida') {
    if (!ultimo || ultimo.tipo_ingreso !== 'entrada') {
      throw new Error('El usuario no tiene una entrada registrada pendiente para cerrar con una salida.');
    }
  }

  const nuevo = await IngresosModel.crearIngreso(numero_documento, tipo_ingreso);
  return nuevo;
};

const obtenerFuncionariosDelDia = async () => {
  try {
    const funcionarios = await IngresosModel.obtenerFuncionariosDelDia();
    return funcionarios;
  } catch (error) {
    throw new Error('Error al obtener los funcionarios del día.');
  }
};

module.exports = {
  registrarIngresoSalida,
  listarIngresosUsuarioDia,
  listarIngresosUsuario,
  getResumenDiario,
  registrarIngresoSalidaPorGuarda,
  obtenerFuncionariosDelDia,
};
