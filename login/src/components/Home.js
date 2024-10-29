import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import useAuthStore from '../store/authStore';

const Home = () => {
  const { user, isAuthenticated, logout } = useAuthStore(); 

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      {isAuthenticated ? (
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Welcome, {user.email}!
          </Typography>
          <Button variant="contained" color="primary" onClick={logout}>
            Logout
          </Button>
        </Box>
      ) : (
        <Typography variant="h6">
          Please log in to access this page.
        </Typography>
      )}
    </Box>
  );
};

export default Home;
