import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { createUser } from '../../../logic/graphql/user';
import helpers from '../../../store/actions/helpers';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPassword2Valid, setIsPassword2Valid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  }
  const handlePassword2Input = (e) => {
    setPassword2(e.target.value);
  }

  const handleCreateUser = () => {
    const validEmail = validateEmail()
    setIsEmailValid(validEmail);
    if (validEmail) {
      const validPwd = validatePassword();
      setIsPasswordValid(validPwd);
      if (validPwd) {
        const validPwd2 = validatePassword2();
        setIsPassword2Valid(validPwd2);
        if (validPwd2) {
          addUser();
        }
      }
    }
  }
  const validateEmail = () => {
    return email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) !== null;
  }
  const validatePassword = () => {
    return password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g) !== null;
  }
  const validatePassword2 = () => {
    return password  === password2;
  }

  const addUser = async () => {
    setIsLoading(true);
    try {
      const result = await createUser(email, password);
      history.push(`/user/${result}`);
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e.message, type: 'error' }));
    } finally {
      setIsLoading(false);
    }
  }
  const handleRegisterOnEnterKey = (e) => {
    if (e.keyCode === 13) handleCreateUser();
  }

  return (
    <Container maxWidth="lg">
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography fontSize={{ xs: '2rem', md: "3rem" }} fontWeight={700}>
            Rejestracja
          </Typography>
        </CardContent>
        <CardContent 
          onKeyUp={handleRegisterOnEnterKey}
        >
          <Stack
            maxWidth="sm"
            spacing={4}
            sx={{ margin: 'auto' }}
          >
            <TextField
              label="E-mail"
              type="email"
              value={email}
              onChange={handleEmailInput}
              helperText={ isEmailValid ? null : "Podaj prawidłowy adres email" }
              error={!isEmailValid}
            />
            <TextField
              label="Hasło"
              type="password"
              value={password}
              onChange={handlePasswordInput}
              helperText="Minimum 8 znaków oraz jedna cyfra, wielka i mała litera"
              error={!isPasswordValid}
            />
            <TextField
              label="Powtórz hasło"
              type="password"
              value={password2}
              onChange={handlePassword2Input}
              helperText={ isPassword2Valid ? null : "Dokładnie przepisz powyższe hasło" }
              error={!isPassword2Valid}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleCreateUser}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              Stwórz konto
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Register;
