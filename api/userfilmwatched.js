const express = require('express');
const router = express.Router();
const dbClient = require('../config/database');
const authenticate = require('../utils/authenticate');

// Esempio di rotta GET
router.get('/', authenticate, async (req, res) => {
    try {
        // Esegui una query di esempio
        const result = await dbClient.query('SELECT * FROM userfilmwatched');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Errore durante l\'esecuzione della query:', err.message);
        res.status(500).json({ message: 'Errore durante l\'esecuzione della query', error: err.message });
    }
});

// Rotta POST per inserire dati
router.post('/', authenticate, async (req, res) => {
    const records = req.body;

    if (!Array.isArray(records) || records.length === 0) {
        return res.status(400).json({ message: 'Devi fornire un array di record' });
    }

    // Verifica che tutti i record contengano i campi richiesti
    for (const record of records) {
        const { idUser, idMovie, time, totalTime, watchDate } = record;
        if (!idUser || !idMovie || !time || !totalTime || !watchDate) {
            return res.status(400).json({ message: 'Tutti i campi sono richiesti per ogni record' });
        }
    }

    try {
        const results = [];
        for (const record of records) {
            const { idUser, idMovie, time, totalTime, watchDate } = record;

            const query = `
            INSERT INTO userfilmwatched (idUser, idFilm, time, totalTime, watchDate)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (idUser, idFilm) 
            DO UPDATE SET
              time = EXCLUDED.time,
              totalTime = EXCLUDED.totalTime,
              watchDate = EXCLUDED.watchDate
            RETURNING *;
          `;
            const values = [idUser, idMovie, time, totalTime, watchDate];

            const result = await dbClient.query(query, values);
            results.push(result.rows[0]);
        }

        res.status(201).json(results);
    } catch (err) {
        console.error('Errore durante l\'inserimento dei dati:', err.message);
        res.status(500).json({ message: 'Errore durante l\'inserimento dei dati', error: err.message });
    }
});


module.exports = router;
