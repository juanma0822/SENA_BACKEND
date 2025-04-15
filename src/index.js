const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

// Rutas
const usuarioRoutes = require('./routes/usuarios.routes');
const aprendizRoutes = require('./routes/aprendices.routes');
const funcionarioRoutes = require('./routes/funcionarios.routes');
const guardaRoutes = require('./routes/guardas.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./Routes/auth.routes'); // NUEVA RUTA DE LOGIN

const app = express();
app.use(cors());
app.use(express.json());

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
app.use('/api/auth', authRoutes); // NUEVA RUTA DE LOGIN

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
