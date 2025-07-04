// src/Register.jsx
import React, { useState } from 'react';
import { auth, googleProvider } from './firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // optional styling

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Register with email & password
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
      navigate('/');
    } catch (error) {
      alert(`Registration error: ${error.message}`);
    }
  };

  // Register/Login with Google
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Google account connected!');
      navigate('/');
    } catch (error) {
      alert(`Google signup error: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Register</h2>

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

      <button className="btn btn-success w-100 mb-2" onClick={handleRegister}>
        Register
      </button>

      <button className="btn btn-danger w-100 mb-3" onClick={handleGoogleSignup}>
        Sign up with Google
      </button>

      <p className="text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
