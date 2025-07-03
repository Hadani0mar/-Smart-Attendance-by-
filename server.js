import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const WEBHOOK = process.env.Webhok_url;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/message', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'No message provided' });
    if (!WEBHOOK) return res.status(500).json({ error: 'Webhok_url not configured' });
    const resp = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const text = await resp.text();
    res.json({ response: text });
  } catch {
    res.status(500).json({ error: 'Request failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
