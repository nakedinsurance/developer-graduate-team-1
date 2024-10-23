// index.js
const express = require('express');
const cors = require('cors');
const reviewsRouter = require('./reviews/reviews'); // Import the reviews routes
require('dotenv').config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route to check if the server is working
app.get('/', (req, res) => {
  res.send('Express and PostgreSQL server is running!');
});

// Use the reviews routes
app.use('/api/reviews', reviewsRouter); // Mount the reviews router

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
