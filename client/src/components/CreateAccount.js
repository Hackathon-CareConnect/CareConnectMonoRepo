import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        email,
      });
      setNotification(response.data.message);
      setTimeout(() => {
        navigate("/")
      }, 1000)
    } catch (error) {
      console.error(error.response.data.message);
      alert('Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <div className='header'>
        <h1>CareConnect</h1>
      </div>
      <h2 className='register'>Create Account</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>
      {notification && <p>{notification}</p>}
    </div>
  );
};

    const styles = {
        container: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f4f4f4',
        },
        form: {
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
        input: {
          marginBottom: '15px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        },
        button: {
          padding: '10px',
          fontSize: '16px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        },
      };
      
      export default CreateAccount;