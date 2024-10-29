import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Box, Alert, FormControlLabel, Checkbox, Typography, InputAdornment } from '@mui/material';
import axios from '../utils/api';
import useAuthStore from '../store/authStore';
import './styles/LoginForm.css';
import { Email, Lock } from '@mui/icons-material';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/login', { email, password });
      const { token } = response.data;

      
      login({ token, email }); 
      setSuccess('Login successful!');
      navigate('/home');

      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Login error', err);
      setError('Invalid email or password.');
    }
  };

  return (
    <Box className="login-background">
      <Box className="login-card">
        <Box className="login-form-container">
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
          <Typography variant="h4" className="login-title" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit} className="login-form">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
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
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show Password"
              />
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot password?
              </Link>
            </Box>
            <Button type="submit" variant="contained" color="primary" className="submit-button">
              Login
            </Button>
          </form>
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link to="/register" className="register-link">
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
