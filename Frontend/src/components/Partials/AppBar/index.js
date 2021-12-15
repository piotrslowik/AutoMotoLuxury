import React from 'react';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux';
import userActions from '../../../store/actions/user';

import { Container, Box, AppBar as Bar, Toolbar, Button, Icon, Fab, Link } from '@mui/material';
import Logo from '../../Shared/Logo';

const ContactIcon = () => {
  return (
    <Icon>phone</Icon>
  );
}
const LoginIcon = () => {
  return (
    <Icon>account_circle</Icon>
  );
}
const RegisterIcon = () => {
  return (
    <Icon>person_add_alt_1</Icon>
  );
}

const AppBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const { loggedIn } = useSelector(state => state.user);

  const logout = () => {
    dispatch(userActions.clear());
    localStorage.clear();
    window.location.href="/";
  }

  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <Bar position='static' sx={{ backgroundColor: 'primary.dark' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo />
            <Box sx={{ flexGrow: 1 }} />
            { matches 
            ? <React.Fragment>
                <Link href="/contact" underline="none">
                  <Button
                    variant='outlined'
                    color='white'
                    sx={{ mr: 2 }}
                    startIcon={<ContactIcon />}
                  >
                    Kontakt
                  </Button>
                </Link>
                { loggedIn
                ? <Button variant='contained' onClick={logout}>
                    Wyloguj
                  </Button>
                : <React.Fragment>
                    <Link href="/user/login" underline="none">
                      <Button variant='contained' sx={{ mr: 2 }}>
                        Logowanie
                      </Button>
                    </Link>
                    <Link href="/user/register" underline="none">
                      <Button variant='contained'>
                        Rejestracja
                      </Button>
                    </Link>
                  </React.Fragment>}
              </React.Fragment>
            : <React.Fragment>
                <Link href="/contact" underline="none">
                  <Fab color="white" aria-label="Kontakt" size="small" sx={{ mr: 2 }}>
                    <ContactIcon />
                  </Fab>
                </Link>
                <Link href="/user/login" underline="none">
                  <Fab color="white" aria-label="Logowanie" size="small" sx={{ mr: 2 }}>
                    <LoginIcon />
                  </Fab>
                </Link>
                <Link href="/user/register" underline="none">
                  <Fab color="white" aria-label="Rejestracja" size="small">
                    <RegisterIcon />
                  </Fab>
                </Link>
              </React.Fragment> }
          </Toolbar>
        </Container>
      </Bar>
    </Box>
  );
}

export default AppBar;
