const PORT = 8000;
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json()) ;// cant pass over the backend to the front end unless this is being used. 
app.use(cors());

const API_KEY = process.env.API_KEY;

app.post('/completions', async (req, res) => {
    const options = {
        method : "POST",
        headers: {
            "Authorization" : `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message}],
            max_tokens: 100,
        })
    };
    try {
        const response = 
        await fetch('https://api.openai.com/v1/chat/completions', options)

        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.error(error)
    }
});

// server the React App 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


app.listen(PORT, () => console.log('Your server is running on PORT' + PORT))