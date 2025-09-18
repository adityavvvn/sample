const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get Jooble API key from environment variables
const JOOBLE_API_KEY = process.env.JOOBLE_API_KEY;

router.post('/search', async (req, res) => {
  try {
    // Check if API key is configured
    if (!JOOBLE_API_KEY) {
      return res.status(500).json({ 
        error: 'Jooble API key not configured', 
        message: 'Please set JOOBLE_API_KEY in environment variables' 
      });
    }

    const response = await axios.post(
      `https://jooble.org/api/${JOOBLE_API_KEY}`,
      req.body,
      { headers: { 'Content-Type': 'application/json' } }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Jooble API error:', err.message);
    res.status(500).json({ 
      error: 'Failed to fetch from Jooble', 
      details: err.message 
    });
  }
});

module.exports = router; 