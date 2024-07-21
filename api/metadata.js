const express = require('express');
const router = express.Router();
const { client, connectClient, disconnectClient } = require('../config/database');
const authenticate = require('../utils/authenticate');

router.get('/', authenticate, async (req, res) => {

  try {
    const [rows] = await client.query('SELECT last_updated FROM metadata');
    if (rows.length > 0) {
      res.status(200).json({ last_update: rows[0].last_update });
    } else {
      res.status(404).json({ message: 'Nessun metadato trovato per la tabella.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Errore nel recupero dei metadati' });
  }
});

module.exports = router;
