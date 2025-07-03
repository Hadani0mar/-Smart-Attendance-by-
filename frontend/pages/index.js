import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { text, sender: 'user' }]);
    setInput('');
    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      setMessages((m) => [...m, { text: data.response || 'No response', sender: 'bot' }]);
    } catch {
      setMessages((m) => [...m, { text: 'خطأ في الإرسال', sender: 'bot' }]);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2563eb', textAlign: 'center' }}>
        <span role="img" aria-label="bot">🤖</span> نظام تتبع الموظفين الذكي
      </h1>
      <div style={{ border: '1px solid #ccc', height: 400, overflowY: 'auto', padding: 8, display: 'flex', flexDirection: 'column', gap: 8, background: '#f8fafc' }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              background: m.sender === 'user' ? '#dbeafe' : '#ecfccb',
              padding: '6px 8px',
              borderRadius: 4
            }}
          >
            <span>{m.sender === 'user' ? '🧑' : '🤖'} {m.text}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب الرسالة"
          style={{ flexGrow: 1, padding: 8 }}
        />
        <button type="submit" style={{ background: '#2563eb', color: 'white', padding: '8px 16px', border: 0, borderRadius: 4 }}>
          ارسال <span role="img" aria-label="send">📤</span>
        </button>
      </form>
    </div>
  );
}
