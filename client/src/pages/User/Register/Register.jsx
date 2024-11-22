import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [createForm, setCreateForm] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState(""); // Thông báo đăng ký
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu có trường nào bỏ trống
    if (!createForm.username || !createForm.email || !createForm.password || !createForm.confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Kiểm tra confirm password
    if (createForm.password !== createForm.confirmPassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/register", {
        username: createForm.username,
        password: createForm.password,
        email: createForm.email,
      });
      console.log('Account created:', response.data);
      setMessage("Registration successful! Redirecting to login page...");
      
      // Chuyển hướng về trang đăng nhập sau khi đăng ký thành công
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error('Error registering account:', error);
      setMessage("Registration failed. Please try again.");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevState => !prevState);
  };

  return (
    <div className="body-regis">
      <div className="signup-container">
        <h1 className="regis-title">SIGN UP</h1>
        <div className="regis-content-wrapper">
          <div className="regis-image-section">
            <img
              src="https://i.pinimg.com/564x/60/ef/37/60ef37f755820ed91b2f57e26e148c05.jpg"
              alt="Sign Up Illustration"
            />
          </div>
          <div className="regis-form-section">
            <form onSubmit={handleSubmit}>
              <div className="regis-form-group">
                <label>USER NAME</label>
                <input
                  type="text"
                  name="username"
                  value={createForm.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="regis-form-group">
                <label>EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={createForm.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="regis-form-group">
                <label>PASSWORD</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={createForm.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle-btn"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="regis-form-group">
                <label>CONFIRM PASSWORD</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={createForm.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="password-toggle-btn"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {createForm.password === createForm.confirmPassword && createForm.confirmPassword !== "" && (
                  <div className="password-match-check">
                    <span className="checkmark">✔</span> Passwords match!
                  </div>
                )}
              </div>
              <button type="submit" className="register-button">REGISTER</button>
            </form>
            {message && <p className="register-message">{message}</p>}
            <p className="login-text">
              Already have an account? <a href="/login">Login now!</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
