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
  .then(() => {
    console.log('✅ Conexión exitosa a PostgreSQL (con SSL - Supabase)');
  })
  .catch((err) => {
    console.error('❌ Error al conectar con PostgreSQL:', err);
  });

module.exports = pool;
