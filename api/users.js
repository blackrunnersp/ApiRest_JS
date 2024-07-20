const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authenticate = require('../utils/authenticate');

router.get('/', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

module.exports = router;
