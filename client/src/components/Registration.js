// A React component for registering institution admins

import React, { useState } from 'react';
import axios from 'axios';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    instituteName: '',
    instituteRegistrationNumber: ''
  });

  const { name, email, password, instituteName, instituteRegistrationNumber } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify({ name, email, password, instituteName, instituteRegistrationNumber });
      const res = await axios.post('/api/user/register', body, config);
      console.log('Registered Successfully', res.data);
    } catch (error) {
      console.error('Error during registration', error.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Register Institution Admin</h1>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={name} onChange={onChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={onChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={onChange} required />
      </div>
      <div>
        <label>Institute Name</label>
        <input type="text" name="instituteName" value={instituteName} onChange={onChange} required />
      </div>
      <div>
        <label>Institute Registration Number</label>
        <input type="text" name="instituteRegistrationNumber" value={instituteRegistrationNumber} onChange={onChange} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Registration;
