const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API SENA - Documentación',
      version: '1.0.0',
      description: 'Documentación de la API SENA hecha por JuanmaSoft 🔥'
    }
  },
  apis: ['./src/routes/*.js'], // aqui swagger va a buscar las anotaciones
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
