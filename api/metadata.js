const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authenticate = require('../utils/authenticate');

router.get('/', authenticate, async (req, res) => {
  const tableName = req.headers['table_name'];
  if (!tableName) {
    return res.status(400).json({ message: 'Header table_name mancante.' });
  }

  try {
    const [rows] = await pool.query('SELECT last_update FROM metadata WHERE table_name = ?', [tableName]);
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
