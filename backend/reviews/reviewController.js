export const getReviews = async (req, res) => {
    const pool = req.pool; // Access the pool from the request context
    try {
      const result = await pool.query('SELECT * FROM reviews');
      res.json(result.rows); // Send the fetched rows as JSON
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  