import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthService from "../api/AuthApi";
import {useAuth} from "../auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const defaultTheme = createTheme();

export default function SignIn() {
  const authContext = useAuth()
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await AuthService.login(data.get('username'), data.get('password'))
      if (localStorage.getItem('token') !== null) {
        authContext.setToken(response.token);
        const role = jwtDecode(localStorage.getItem('token')).role;
        console.log("ROLE:" + role)
        if (role === 'ADMIN') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      }
    } catch (error) {
      if (error.message === 'Incorrect username or password') {
        console.log('Incorrect username or password. Please try again.');
        alert("Incorect username or password... Please try again")
      } else {
        console.error('Error during login:', error);
      }
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id='username'
              label="User Name"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>        
            <Link href="/signup" variant="body2">
                  {"Nu ai cont? Inregistreaza-te"}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}