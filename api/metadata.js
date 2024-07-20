const express = require('express');
const router = express.Router();
const pool = require('../config/database.js');
const authenticate = require('../utils/authenticate.js');

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

module.exports = router;
