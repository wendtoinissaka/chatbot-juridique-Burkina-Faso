// app/notification/NotificationSignup.tsx

import React, { useState } from 'react';

const NotificationSignup = () => {
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/notification_signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, numero }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Inscription réussie !');
    } else {
      setMessage(data.message || 'Erreur lors de l\'inscription.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email (optionnel)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Numéro (obligatoire)"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        required
      />
      <button type="submit">S'inscrire</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default NotificationSignup;
