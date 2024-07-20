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
  const { method } = req;
  const { API_KEY } = req.headers;

  if (API_KEY !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Access denied.' });
  }

  switch (method) {
    case 'GET':
      try {
        const [rows] = await promisePool.query('SELECT * FROM userepisodewatched');
        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
      }
      break;

    case 'POST':
      // Handle POST request to add or update records in userepisodewatched
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
