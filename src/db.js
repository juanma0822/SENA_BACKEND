const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // 🔥 PERMITE certificados autofirmados como el de Supabase
  },
});

pool.connect()
  .then((client) => {
    console.log('✅ Conexión exitosa a PostgreSQL (con SSL - Supabase)');
    // Configuramos la zona horaria a 'America/Bogota'
    client.query(`SET TIMEZONE = 'America/Bogota'`)
      .then(() => console.log('✅ Zona horaria configurada a Colombia (America/Bogota)'))
      .catch((err) => console.error('❌ Error al configurar la zona horaria:', err));
  })
  .catch((err) => {
    console.error('❌ Error al conectar con PostgreSQL:', err);
  });

module.exports = pool;
