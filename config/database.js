import mysql from 'mysql2/promise';
import 'dotenv/config';  // Importa dotenv per caricare le variabili ambientali

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

export default pool;
