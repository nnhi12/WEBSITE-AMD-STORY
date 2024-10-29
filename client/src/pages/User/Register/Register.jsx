import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';

import './Register.css';

function Register() {
  const[createForm, setCreateForm] = useState({
    username:"",
    body: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/register", createForm);
      console.log('Account created:', response.data);
      // Add any post-registration logic here, like redirecting to the login page
    } catch (error) {
      console.error('Error registering account:', error);
    }
  };

  return (
    <div className= "body-regis">
    <div className="signup-container">
      <h1 className="regis-title">SIGN UP</h1>
      <div className="regis-content-wrapper">
        <div className="regis-image-section">
          <img
            src="https://i.pinimg.com/564x/60/ef/37/60ef37f755820ed91b2f57e26e148c05.jpg" // Replace this URL with the image you want
            alt="Sign Up Illustration"
          />
        </div>
        <div className="regis-form-section">
          <form onSubmit={handleSubmit}>
            <div className="regis-form-group">
              <label>USER NAME</label>
              <input type="text" name = "username" value = {createForm.body.username} onChange={handleChange} required/>
            </div>
            <div className="regis-form-group">
              <label>EMAIL</label>
              <input type="email" placeholder="" />
            </div>
            <div className="regis-form-group">
              <label>PASSWORD</label>
              <input type="password" name="password" value = {createForm.body.password} onChange={handleChange} required/>
            </div>
            <div className="regis-form-group">
              <label>CONFIRM PASSWORD</label>
              <input type="password" placeholder="" />
            </div>
            <button type="submit" className="register-button">REGISTER</button>
          </form>
          <p className="login-text">
            Already had an account? <a href="/login">Login now!</a>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register;
