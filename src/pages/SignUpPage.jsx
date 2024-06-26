import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthService from "../api/AuthApi";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";


const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    try{
      if(!data.get('firstName') || !data.get('lastName') || !data.get('username') || !data.get('password')){
        console.log("SAL 1")
        throw new Error('Te rog completeaza toate field-urile.');
      }
      console.log(data.get('firstName'))
      await AuthService.signup(data.get('firstName'), data.get('lastName'), data.get('username'), data.get('password'));
      if(localStorage.getItem('token')){
        authContext.setToken(localStorage.getItem('token'));
        navigate('/');
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
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
            Inregistreaza-te
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Prenume"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nume"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Parola"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Inregistreaza-te
            </Button>
            <Link href="/login" variant="body2">
              Deja ai cont ? Logheaza-te.
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}