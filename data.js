import express from 'express';
import axios from 'axios';

const router = express.Router();

// Fetch stock data
router.get('/quote', async (req, res) => {
    const { symbol } = req.query;
    const apikey = process.env.ALPHA_VANTAGE_KEY;
    try {
        const result = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`);
        res.json(result.data);
    } catch {
        res.status(500).json({ error: 'API error' });
    }
});

export default router;
