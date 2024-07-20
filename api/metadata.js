import express from 'express';
import pool from '../config/database.js';  // Assicurati che database.js esporti pool con 'export default pool;'
import authenticate from '../utils/authenticate.js';  // Assicurati che authenticate.js esporti authenticate con 'export default authenticate;'

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  const tableName = req.headers['table_name'];
  if (!tableName) {
    return res.status(400).json({ message: 'Missing table_name header.' });
  }

  try {
    const [rows] = await pool.query('SELECT last_update FROM metadata WHERE table_name = ?', [tableName]);
    if (rows.length > 0) {
      res.status(200).json({ last_update: rows[0].last_update });
    } else {
      res.status(404).json({ message: 'No metadata found for table.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving metadata' });
  }
});

export default router;
