import express from 'express';
import serverless from 'serverless-http';
import usersRouter from './api/users.js';
import metadataRouter from './api/metadata.js';
import userWatchedRouter from './api/userWatched.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/metadata', metadataRouter);
app.use('/api/userWatched', userWatchedRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found.' });
});

// Esporta come handler per Vercel
export const handler = serverless(app);
