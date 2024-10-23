import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const router = express.Router();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'customer_support',
    password: 'password',
    port: 5432,
});

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM product');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching product:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM product WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching product:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO product (name, price, description) VALUES ($1, $2, $3) RETURNING *',
            [name, price, description]
        );
        res.status(201).json(result.rows[0]); // Return the created product
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const result = await pool.query(
            'UPDATE product SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *',
            [name, price, description, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(result.rows[0]); // Return the updated product
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM product WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
