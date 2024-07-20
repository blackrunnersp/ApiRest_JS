const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authenticate = require('../utils/authenticate');

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

module.exports = router;
