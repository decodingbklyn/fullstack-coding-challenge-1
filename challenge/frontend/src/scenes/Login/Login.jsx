import React, { useState } from 'react';
import { rootUrl } from '../../config';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    maxWidth: 400,
    boxShadow: theme.shadows[3],
  },
  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(2),
  },
}));

const Login = ({ onLogin }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${rootUrl}/login/`, {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      onLogin(token);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.title} align="center">
            NYC Council Dashboard Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Login
              </Button>
            </Box>
            {error && (
              <Typography className={classes.error} align="center">
                {error}
              </Typography>
            )}
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;