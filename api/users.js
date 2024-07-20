import express from 'express';
import pool from '../config/database.js';  // Importa pool come ES Module
import authenticate from '../utils/authenticate.js';  // Importa authenticate come ES Module

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

export default router;
