const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config({path: '.env.local'});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())
// Create a new PostgreSQL client pool
const pool = new Pool({
  user: process.env.DB_USER,       
  host: process.env.DB_HOST,           
  database: process.env.DB_DATABASE,   
  password: process.env.db_PASSWORD,    
  port: process.env.DB_PORT,                  
});

// Example route to check if the server is working
app.get('/', (req, res) => {
  res.send('Express and PostgreSQL server is running!');
});

// Example route to get data from a PostgreSQL table
app.get('/api/reviews', async (req, res) => {
  try {
    // Query to fetch data from a 'users' table
    const result = await pool.query('SELECT * FROM reviews');
    res.json(result.rows); // Send the fetched rows as JSON
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
