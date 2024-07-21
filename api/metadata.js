const express = require('express');
const router = express.Router();
const dbClient = require('../config/database');
const authenticate = require('../utils/authenticate');

// Esempio di rotta GET
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

// Rotta POST per inserire dati
router.post('/', authenticate, async (req, res) => {
  const { last_updated } = req.body;

  // Verifica se last_updated è presente nel corpo della richiesta
  if (last_updated === undefined) {
    return res.status(400).json({ message: 'Il campo last_updated è obbligatorio.' });
  }

  try {
    // Query di inserimento
    const query = `
      INSERT INTO metadata (last_updated)
      VALUES (NOW())
      RETURNING *;
    `;

    // Esegui la query
    const result = await dbClient.query(query);

    // Restituisci il risultato
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Errore durante l\'inserimento dei dati:', err.message);
    res.status(500).json({ message: 'Errore durante l\'inserimento dei dati', error: err.message });
  }
});

module.exports = router;
