// src/Login.jsx
import React, { useState } from 'react';
import { auth, googleProvider } from './firebase-config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // optional styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // toggle between login and register
  const navigate = useNavigate();

  // Email/Password Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert(`Login error: ${error.message}`);
    }
  };

  // Email/Password Register
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
      navigate('/');
    } catch (error) {
      alert(`Registration error: ${error.message}`);
    }
  };

  // Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Google login successful!');
      navigate('/');
    } catch (error) {
      alert(`Google login error: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>

      <input
        type="email"
        className="form-control mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {isRegistering ? (
        <button className="btn btn-success w-100 mb-2" onClick={handleRegister}>
          Register
        </button>
      ) : (
        <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>
          Login
        </button>
      )}

      <button className="btn btn-danger w-100 mb-3" onClick={handleGoogleLogin}>
        Continue with Google
      </button>

      <p className="text-center">
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          className="btn btn-link"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
}

export default Login;
