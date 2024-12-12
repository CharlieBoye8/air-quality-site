/**
 * @file Login.js is the component for the login page.
 * By: Charlie Boye
 */
import React, { useState } from 'react';
import '../styles/Login.css';

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Replace these with your test account credentials (Eventually stored in secure database)
        const testUsername = 'testUser';
        const testPassword = 'testPass';

        if (username === testUsername && password === testPassword) {
            setIsLoggedIn(true);
            alert('Login successful!');
        } else {
            alert('Invalid username or password.'); 
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Login</h1>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
