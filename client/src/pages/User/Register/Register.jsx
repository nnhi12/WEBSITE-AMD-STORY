import React from 'react';
import './Register.css';

function Register() {
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
          <form>
            <div className="regis-form-group">
              <label>USER NAME</label>
              <input type="text" placeholder="" />
            </div>
            <div className="regis-form-group">
              <label>EMAIL</label>
              <input type="email" placeholder="" />
            </div>
            <div className="regis-form-group">
              <label>PASSWORD</label>
              <input type="password" placeholder="" />
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
