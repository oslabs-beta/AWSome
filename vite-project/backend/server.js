const express = require('express');
const bodyParser = require('body-parser');
const db = require('./model'); // Import the database model
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Test route to verify the connection
app.get('/test', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW() AS current_time');
    res.status(200).json({ currentTime: result[0].current_time });
  } catch (err) {
    console.error('Error fetching data:', err.message);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
