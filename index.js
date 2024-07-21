const express = require('express');
const { createServer } = require('http');
const { parse } = require('url');
const dbClient = require('./config/database');

const app = express();
const port = 3000;

// Middleware per parsing del corpo delle richieste in JSON
app.use(express.json());

// Rotte di esempio
app.get('/api', (req, res) => {
  res.json({ message: 'Benvenuto nella mia API!' });
});

// Rotte API
app.use('/api/metadata', require('./api/metadata'));
app.use('/api/userfilmwatched', require('./api/userfilmwatched'));
app.use('/api/userepisodewatched', require('./api/userepisodewatched'));

// Middleware per gestione degli errori 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint non trovato.' });
});

// Funzione handler per Vercel
module.exports = (req, res) => {
  const server = createServer(app);
  const parsedUrl = parse(req.url, true);

  // Simula il comportamento di Express con il server HTTP
  server.emit('request', req, res);
};

// Gestione dei segnali di terminazione
const shutdown = async () => {
  try {
    await dbClient.disconnect();
    console.log('Disconnessione dal database riuscita.');
    process.exit(0);
  } catch (error) {
    console.error('Errore durante la disconnessione dal database:', error.message);
    process.exit(1);
  }
};

// Gestione dei segnali di terminazione
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Gestione degli errori non gestiti
process.on('uncaughtException', (error) => {
  console.error('Eccezione non gestita:', error.message);
  shutdown();
});
