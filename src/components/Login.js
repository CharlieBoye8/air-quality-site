import React from 'react';
import '../styles/Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Login</h1>
            </div>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
