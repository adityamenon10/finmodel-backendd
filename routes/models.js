import express from 'express';
import jwt from 'jsonwebtoken';
import pkg from 'pg';
const { Pool } = pkg;

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Save model
router.post('/save', auth, async (req, res) => {
    const { name, model } = req.body;
    await pool.query('INSERT INTO models(user_id, name, model_json) VALUES($1, $2, $3)', 
        [req.user.userId, name, model]);
    res.json({ status: 'saved' });
});

// List models
router.get('/list', auth, async (req, res) => {
    const result = await pool.query('SELECT id, name, created_at FROM models WHERE user_id=$1', 
        [req.user.userId]);
    res.json(result.rows);
});

export default router;
