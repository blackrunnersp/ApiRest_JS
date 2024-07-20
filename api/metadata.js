import mysql from 'mysql2';
import { config } from 'dotenv';

config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const promisePool = pool.promise();

export default async function handler(req, res) {
  const { TABLE_NAME } = req.headers;
  const { API_KEY } = req.headers;

  if (API_KEY !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Access denied.' });
  }

  if (!TABLE_NAME) {
    return res.status(400).json({ message: 'Missing table_name header.' });
  }

  try {
    const [rows] = await promisePool.query(
      'SELECT last_update FROM metadata WHERE table_name = ?',
      [TABLE_NAME]
    );

    if (rows.length > 0) {
      res.status(200).json({ last_update: rows[0].last_update });
    } else {
      res.status(404).json({ message: 'No metadata found for table.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
}
