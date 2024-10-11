"use client";
import { useState, useEffect } from 'react';
import { signupNotification } from '../route';

const NotificationSignup = () => {
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [message, setMessage] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Vérifier les préférences de thème de l'utilisateur
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkTheme(prefersDark);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('numero', numero);

    const result = await signupNotification(formData);

    if (result.status) {
      setMessage('Inscription réussie !');
    } else {
      setMessage(result.errorMessage || 'Erreur lors de l\'inscription.');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: isDarkTheme ? '#121212' : '#f1f1f1',
      color: isDarkTheme ? '#ffffff' : '#333333'
    }}>
      <h2 style={{ textAlign: 'center' }}>Inscription aux notifications</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '14px' }}>
            Email (optionnel):
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginTop: '5px',
                backgroundColor: isDarkTheme ? '#424242' : '#ffffff',
                color: isDarkTheme ? '#ffffff' : '#000000',
              }}
              placeholder="Entrer votre email"
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '14px' }}>
            Numéro (obligatoire):
            <input
              type="tel" // Utiliser le type 'tel' pour le numéro de téléphone
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginTop: '5px',
                backgroundColor: isDarkTheme ? '#424242' : '#ffffff',
                color: isDarkTheme ? '#ffffff' : '#000000',
              }}
              placeholder="Entrer votre numéro"
              required
            />
          </label>
        </div>
        <button type="submit" style={{
          padding: '10px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}>S'inscrire</button>
      </form>
      {message && <p style={{ marginTop: '15px', fontSize: '14px' }}>{message}</p>}
    </div>
  );
};

export default NotificationSignup;


// "use client";

// import React, { useState } from 'react';

// const NotificationSignup = () => {
//   const [email, setEmail] = useState('');
//   const [numero, setNumero] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setLoading(true); // Indicate loading state
//     setMessage('');

//     try {
//       console.log('Sending request to signup...'); // Debug log

//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notification_signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, numero }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage('Inscription réussie !');
//         setEmail('');
//         setNumero('');
//       } else {
//         setMessage(data.error || 'Erreur lors de l\'inscription.');
//       }
//     } catch (error) {
//       setMessage('Erreur de connexion. Veuillez réessayer.');
//       console.error('Erreur:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Inscription aux notifications</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <div style={styles.inputGroup}>
//           <label>Email (optionnel):</label>
//           <input
//             type="email"
//             placeholder="Entrer votre email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label>Numéro (obligatoire):</label>
//           <input
//             type="text"
//             placeholder="Entrer votre numéro"
//             value={numero}
//             onChange={(e) => setNumero(e.target.value)}
//             style={styles.input}
//             required
//           />
//         </div>

//         <button type="submit" style={styles.button} disabled={loading}>
//           {loading ? 'Inscription en cours...' : 'S\'inscrire'}
//         </button>
//       </form>

//       {message && <p style={styles.message}>{message}</p>}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '400px',
//     margin: '0 auto',
//     padding: '20px',
//     border: '1px solid #ddd',
//     borderRadius: '5px',
//     backgroundColor: '#f9f9f9',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column' as 'column',
//   },
//   inputGroup: {
//     marginBottom: '15px',
//   },
//   input: {
//     width: '100%',
//     padding: '10px',
//     fontSize: '16px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     padding: '10px',
//     fontSize: '16px',
//     backgroundColor: '#007BFF',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
//   message: {
//     marginTop: '15px',
//     fontSize: '14px',
//     color: '#FF0000',
//   },
// };

// export default NotificationSignup;
