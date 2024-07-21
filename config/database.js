const { Client } = require('pg');
require('dotenv').config();

class DatabaseClient {
  constructor() {
    this.client = new Client({
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
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connessione al database riuscita.');
    } catch (err) {
      console.error('Errore durante la connessione al database:', err.message);
    }
  }

  async disconnect() {
    try {
      await this.client.end();
      console.log('Connessione al database chiusa.');
    } catch (err) {
      console.error('Errore durante la chiusura della connessione al database:', err.message);
    }
  }

  async query(text, params = []) {
    try {
      // Esegui la query, passando i parametri se presenti
      const result = params.length > 0
        ? await this.client.query(text, params)
        : await this.client.query(text);

      return result;
    } catch (err) {
      throw new Error(`Errore durante l'esecuzione della query: ${err.message}`);
    }
  }
}

// Crea un'istanza del client e connettiti
const dbClient = new DatabaseClient();
dbClient.connect(); // Connessione all'avvio

module.exports = dbClient;
