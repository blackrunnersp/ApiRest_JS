const express = require('express');
const router = express.Router();
const dbClient = require('../config/database');
const authenticate = require('../utils/authenticate');

// Esempio di rotta GET
router.get('/', authenticate, async (req, res) => {
    try {
        // Esegui una query di esempio
        const result = await dbClient.query('SELECT * FROM userepisodewatched');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Errore durante l\'esecuzione della query:', err.message);
        res.status(500).json({ message: 'Errore durante l\'esecuzione della query', error: err.message });
    }
});

// Rotta POST per inserire dati
router.post('/', authenticate, async (req, res) => {
    const { idUser, idShow, idSeason, idEpisode, time, totalTime, watchDate } = req.body;

    // Verifica che tutti i campi siano presenti
    if (!idUser || !idShow || !idSeason || !idEpisode || !time || !totalTime || !watchDate) {
        return res.status(400).json({ message: 'Tutti i campi sono richiesti' });
    }

    try {
        // Query di inserimento
        const query = `
        INSERT INTO userepisodewatched (idUser, idShow, idSeason, idEpisode, time, totalTime, watchDate)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (idUser, idShow, idSeason, idEpisode) 
        DO UPDATE SET
          time = EXCLUDED.time,
          totalTime = EXCLUDED.totalTime,
          watchDate = EXCLUDED.watchDate
        RETURNING *;
      `;
        const values = [idUser, idShow, idSeason, idEpisode, time, totalTime, watchDate];

        // Esegui la query
        const result = await dbClient.query(query, values);

        // Restituisci il risultato
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Errore durante l\'inserimento dei dati:', err.message);
        res.status(500).json({ message: 'Errore durante l\'inserimento dei dati', error: err.message });
    }
});

module.exports = router;
