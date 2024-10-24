import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      setNotification(response.data.notification || ''); // Handle notification if exists
      alert(response.data.message); // Display success message
    } catch (error) {
      console.error(error);
      const errorMessage = error.response ? error.response.data.message : 'Login failed'; // Handle error message
      alert(errorMessage); // Display error message
    }
  };

  return (
    <div style={styles.container}>
      <div className='header'>
        <h1>CareConnect</h1>
      </div>
      <h2 className='login'>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          className='Username'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          className='password'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button} className='button'>Login</button>
      </form>
      {notification && <p>{notification}</p>}
      <div style={styles.createAccount}>
        <a href="/register">Create an account </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  createAccount: {
    marginTop: '20px',
    fontSize: '14px',
  }
};

export default Login;
