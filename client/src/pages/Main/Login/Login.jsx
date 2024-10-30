import {React} from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom' 
import './Login.css';

function Login() {
    const history=useNavigate();

    const[createForm, setCreateForm] = useState({
        username:"",
        password:""
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
          const response = await axios.post("http://localhost:3001/login", createForm);
          const data = response.data;
          console.log(data);
          if (data !== null)
          {
            
            console.log('Login success');
            history("/");
          }
          else
          {
            console.log('Login Failed');
          }
        } catch (error) {
          console.error('Error login account:', error);
        }
      };
    
    return (
        <div className = "login-body">
            <div className="body-overlay"></div>
            <div className="login-container">
                <h2>Đăng Nhập</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Tên đăng nhập" name = "username" value = {createForm.username} onChange={handleChange} required />
                    <input type="password" placeholder="Mật khẩu" name="password" value = {createForm.password} onChange={handleChange} required />
                    <button type="submit">Đăng Nhập</button>
                </form>
                <p className="sign-up-text">
                    Haven't had an account yet? <a href="/register">Sign up now!</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
