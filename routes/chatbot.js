const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const FASTAPI_URL = 'http://127.0.0.1:8000';

router.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Sending message to FastAPI:', message);

    // Forward request to FastAPI server
    const response = await fetch(`${FASTAPI_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    console.log('FastAPI Response Status:', response.status);
    
    if (!response.ok) {
      throw new Error(`FastAPI server responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('FastAPI Response Data:', data);
    
    res.json(data);
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 