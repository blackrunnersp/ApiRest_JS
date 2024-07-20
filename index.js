const express = require('express');
const serverless = require('serverless-http');
const app = express();
const pool = require('./config/database');
require('dotenv').config();

app.use(express.json());

app.use('/api/users', require('./api/users'));
app.use('/api/metadata', require('./api/metadata'));
app.use('/api/userWatched', require('./api/userWatched'));

app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found.' });
});

// Exporta come una funzione serverless per Vercel
module.exports.handler = serverless(app);
