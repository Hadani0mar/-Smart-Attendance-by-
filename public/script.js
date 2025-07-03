document.getElementById('message-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = (document.getElementById('message').value || '').trim();
  if (!message) return;
  const resBox = document.getElementById('response');
  resBox.textContent = '...';
  try {
    const res = await fetch('/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    resBox.textContent = data.response || 'No response';
  } catch {
    resBox.textContent = 'خطأ في الإرسال';
  }
});
