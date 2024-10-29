import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Box, Alert, Typography, InputAdornment } from '@mui/material';
import axios from '../utils/api';
import { Email, Lock, Person } from '@mui/icons-material';
import './styles/RegisterForm.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('/register', { name, email, password });
      setSuccess('Registration successful! You can now log in.');
      navigate('/');
    } catch (err) {
      console.error('Registration error', err);
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <Box className="register-background">
      <Box className="register-card">
        <Box className="register-form-container">
          {success && (
            <Alert variant="filled" severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          {error && (
            <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Typography variant="h4" className="register-title" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit} className="register-form">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              className='input-field'
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="primary" className="submit-button" fullWidth>
              Register
            </Button>
          </form>
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link to="/" className="login-link">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
