import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { login } from '../../../logic/graphql/user';
import helpers from '../../../store/actions/helpers';
import userActions from '../../../store/actions/user';
import { LocalStorageGet } from '../../../logic/helpers';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login(email, password);
      dispatch(userActions.setUser({
        token: LocalStorageGet('token'),
        id: LocalStorageGet('userId'),
        isAdmin: LocalStorageGet('isAdmin'),
        loggedIn: true,
      }));
      history.push(`/`);
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e.message, type: 'error' }));
      setIsLoading(false);
    }
  }

  return (
    <Container maxWidth="lg">
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography fontSize={{ xs: '2rem', md: "3rem" }} fontWeight={700}>
            Logowanie
          </Typography>
        </CardContent>
        <CardContent>
          <Stack maxWidth="sm" spacing={4} sx={{ margin: 'auto' }}>
            <TextField
              label="E-mail"
              type="email"
              value={email}
              onChange={handleEmailInput}
            />
            <TextField
              label="Hasło"
              type="password"
              value={password}
              onChange={handlePasswordInput}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              disabled={isLoading}
            >
              Zaloguj
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
              <Button
                size="small"
              >
                Przypomnij hasło
              </Button>
              <Box sx={{ mt: '-12px', fontSize: '2rem', display: { xs: 'none', sm: 'initial' }, color: 'primary.dark' }}> &bull; </Box>
              <Link href="register">
                <Button
                  size="small"
                >
                  Stwórz konto
                </Button>
              </Link>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Login;
