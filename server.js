import fetch from 'node-fetch'; // Import node-fetch
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

dotenv.config();
const PORT = 8000;

const app = express();
app.use(express.json()); // Enable JSON parsing
app.use(cors());

const API_KEY = process.env.API_KEY;

app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message }],
            max_tokens: 100,
        })
    };
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message || 'Error fetching data');
        }
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error in /completions:', error);
        res.status(500).json({ error: error.message || 'An error occurred' });
    }
});

// Serve the React App in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT));
