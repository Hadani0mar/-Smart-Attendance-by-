import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setResponse('...');
    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      setResponse(data.response || 'No response');
    } catch {
      setResponse('خطأ في الإرسال');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2563eb' }}>
        <span role="img" aria-label="bot">🤖</span> نظام تتبع الموظفين الذكي
      </h1>
      <form onSubmit={sendMessage} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اكتب الرسالة هنا"
          style={{ height: 100 }}
        />
        <button type="submit" style={{ background: '#2563eb', color: 'white', padding: 8, border: 0, borderRadius: 4 }}>
          ارسال <span role="img" aria-label="send">📤</span>
        </button>
      </form>
      <pre style={{ background: '#ecfccb', border: '1px solid #bef264', padding: 8, borderRadius: 4 }}>
        {response}
      </pre>
    </div>
  );
}
