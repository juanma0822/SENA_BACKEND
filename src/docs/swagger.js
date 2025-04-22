const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API SENA - Documentación",
      version: "1.0.0",
      description: "Documentación de la API SENA hecha por JuanmaSoft 🔥"
    },
    servers: [
      {
        url: "https://sena-backend-v5t4.onrender.com",
        description: "Servidor en producción (Render)"
      },
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ],
    components: {
      securitySchemes: {
        JWT: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "Token JWT. Formato: Bearer {token}"
        }
      }
    }
  },
  apis: ["./src/Routes/*.js"], // Mayúscula en 'Routes'
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
