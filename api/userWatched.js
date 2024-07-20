import express from 'express';
import pool from '../config/database.js';  // Usa import per il modulo database.js
import authenticate from '../utils/authenticate.js';  // Usa import per il modulo authenticate.js

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM user_watched');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user watched data' });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { idUser, idFilm, time, totalTime, watchDate } = req.body;
  try {
    await pool.query(
      'INSERT INTO user_watched (idUser, idFilm, time, totalTime, watchDate) VALUES (?, ?, ?, ?, ?)',
      [idUser, idFilm, time, totalTime, watchDate]
    );
    res.status(201).json({ message: 'User watched data inserted' });
  } catch (err) {
    res.status(500).json({ message: 'Error inserting user watched data' });
  }
});

export default router;
