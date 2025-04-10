const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db'); // Importa conexión a DB

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ message: 'API del SENA funcionando 🟢', time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: 'Error en la conexión con la base de datos' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
