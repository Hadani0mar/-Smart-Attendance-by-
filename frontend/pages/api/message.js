export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }
  const webhook = process.env.Webhok_url;
  if (!webhook) {
    return res.status(500).json({ error: 'Webhok_url not configured' });
  }
  try {
    const resp = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const text = await resp.text();
    res.status(200).json({ response: text });
  } catch {
    res.status(500).json({ error: 'Request failed' });
  }
}
