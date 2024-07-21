const express = require('express');
const router = express.Router();
const dbClient = require('../config/database');
const authenticate = require('../utils/authenticate');



router.get('/', authenticate, async (req, res) => {

  try {
    // Esegui una query di esempio
    const result = await dbClient.query('SELECT * FROM metadata');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Errore durante l\'esecuzione della query:', err.message);
    res.status(500).json({ message: 'Errore durante l\'esecuzione della query', error: err.message });
  }
});



module.exports = router;
