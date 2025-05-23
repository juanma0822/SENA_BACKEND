const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

// Rutas
const usuarioRoutes = require('./Routes/usuarios.routes');
const aprendizRoutes = require('./Routes/aprendices.routes');
const funcionarioRoutes = require('./Routes/funcionarios.routes');
const guardaRoutes = require('./Routes/guardas.routes');
const adminRoutes = require('./Routes/admin.routes');
const authRoutes = require('./Routes/auth.routes'); 
const ingresoRoutes = require('./Routes/ingresos.routes'); // NUEVA RUTA DE INGRESOS
const estadisticasRoutes = require('./Routes/estadisticas.routes'); // NUEVA RUTA DE ESTADÍSTICAS
const visitantesRoutes = require('./Routes/visitantes.routes'); // NUEVA RUTA DE VISITANTES
const llavesRoutes = require('./Routes/llaves.routes'); // NUEVA RUTA DE LLAVES
const dispositivosRoutes = require('./Routes/dispositivos.routes'); // NUEVA RUTA DE DISPOSITIVOS

const app = express();
app.use(cors());
app.use(express.json());


// Servir archivos estáticos (como imágenes) desde la carpeta 'Public'
app.use(express.static(path.join(__dirname, '../Public')));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta test
app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ message: 'API del SENA funcionando 🟢', time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: 'Error en la conexión con la base de datos' });
  }
});

// Todas tus rutas aquí
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/aprendices', aprendizRoutes);
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/guardas', guardaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/ingresos', ingresoRoutes); // NUEVA RUTA DE INGRESOS
app.use('/api/estadisticas', estadisticasRoutes); // RUTA DE ESTADISTICAS
app.use('/api/visitantes', visitantesRoutes); // NUEVA RUTA DE VISITANTES
app.use('/api/llaves', llavesRoutes); // NUEVA RUTA DE LLAVES
app.use('/api/dispositivos', dispositivosRoutes); // NUEVA RUTA DE DISPOSITIVOS

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {  // Cambié 'localhost' por '0.0.0.0'
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});