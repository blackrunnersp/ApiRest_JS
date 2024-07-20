const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/user', require('./api/user'));
app.use('/api/userwatched', require('./api/userWatched'));
app.use('/api/metadata', require('./api/metadata'));

app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found.' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
