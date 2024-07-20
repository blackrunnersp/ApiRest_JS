const express = require('express');
const { createServer } = require('http');
const { parse } = require('url');
const app = express();
const port = 3000;

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

// Funzione handler per Vercel
module.exports = (req, res) => {
  const server = createServer(app);
  const parsedUrl = parse(req.url, true);

  // Simula il comportamento di Express con il server HTTP
  server.emit('request', req, res);
};
