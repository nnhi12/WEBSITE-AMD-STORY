import {React} from 'react';
import './Login.css';

function Login() {
    return (
        <div className = "login-body">
            <div className="body-overlay"></div>
            <div className="login-container">
                <h2>Đăng Nhập</h2>
                <form>
                    <input type="text" placeholder="Tên đăng nhập" required />
                    <input type="password" placeholder="Mật khẩu" required />
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
