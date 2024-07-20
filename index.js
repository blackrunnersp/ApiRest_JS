const express = require('express');
const app = express();
const port = 3000;
const serverless = require('serverless-http');
const pool = require('./config/database'); // Configurazione del database
const authenticate = require('./utils/authenticate');

// Middleware per parsing del corpo delle richieste in JSON
app.use(express.json());

// Rotte di esempio
app.get('/api', (req, res) => {
  res.json({ message: 'Benvenuto nella mia API!' });
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ received: data });
});

// Rotte API

app.use('/api/users', require('./api/users'));
app.use('/api/test', require('./api/test'));
app.use('/api/metadata', require('./api/metadata'));
app.use('/api/userWatched', require('./api/userWatched'));

// Middleware per gestione degli errori 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint non trovato.' });
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});

// Esporta come funzione serverless per Vercel
module.exports.handler = serverless(app);
