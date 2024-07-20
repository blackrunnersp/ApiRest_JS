const fs = require('fs');
const { Client } = require('pg');
require('dotenv').config();

// Configura il client PostgreSQL
const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DB_CA_CERT ? Buffer.from(process.env.DB_CA_CERT, 'utf-8') : undefined
  }
});

// Funzione per connettersi al database
const connectClient = async () => {
  try {
    await client.connect();
    console.log('Connessione al database riuscita.');
  } catch (err) {
    console.error('Errore durante la connessione al database:', err.message);
  }
};

// Funzione per chiudere la connessione al database
const disconnectClient = async () => {
  try {
    await client.end();
    console.log('Connessione al database chiusa.');
  } catch (err) {
    console.error('Errore durante la chiusura della connessione al database:', err.message);
  }
};

const checkDatabaseConnection = async () => {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT DATABASE()');
      console.log('Database corrente:', rows[0]['DATABASE()']);
      connection.release();
    } catch (err) {
      console.error('Errore durante la connessione al database:', err.message);
    }
  };

  
module.exports = { client, connectClient, disconnectClient };
