// This component handles the login functionality for institution admins

import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/user/login', { email, password });
      console.log('Login successful', response.data);
      // You would typically handle routing and storing the auth token here
    } catch (error) {
      console.error('Failed to login', error.response.data);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
