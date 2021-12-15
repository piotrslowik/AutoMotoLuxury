import React from 'react';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';

import { Container, Box, AppBar as Bar, Toolbar, Button, Icon, Fab, Link, Tooltip } from '@mui/material';
import Logo from '../../Shared/Logo';
import Profile from './profile';

const ContactIcon = () => {
  return (
    <Icon>phone</Icon>
  );
}

const ContactButton = ({ matches }) => {
  if (matches) {
    return  (
      <Button
        variant='outlined'
        color='white'
        sx={{ mr: 2 }}
        startIcon={<ContactIcon />}
      >
        Kontakt
      </Button>
    )
  } else {
    return (
      <Tooltip title="Kontakt">
        <Fab color="white" aria-label="Kontakt" size="small" sx={{ mr: 2 }}>
          <ContactIcon />
        </Fab>
      </Tooltip>
    )
  }
}

const LoginButton = ({ matches }) => {
  if (matches) {
    return  (
      <Button variant='contained' sx={{ mr: 2 }}>
        Logowanie
      </Button>
    )
  } else {
    return (
      <Tooltip title="Logowanie">
        <Fab color="white" aria-label="Kontakt" size="small" sx={{ mr: 2 }}>
          <Icon>account_circle</Icon>
        </Fab>
      </Tooltip>
    )
  }
}

const RegisterButton = ({ matches }) => {
  if (matches) {
    return  (
      <Button variant='contained'>
        Rejestracja
      </Button>
    )
  } else {
    return (
      <Tooltip title="Rejestracja">
        <Fab color="white" aria-label="Kontakt" size="small" sx={{ mr: 2 }}>
          <Icon>person_add_alt_1</Icon>
        </Fab>
      </Tooltip>
    )
  }
}

const AdminButton = ({ matches }) => {
  if (matches) {
    return (
      <Button variant='contained' sx={{ mr: 2 }}>
        Zarządzaj
      </Button>
    )
  } else {
    return (
      <Tooltip title="Zarządzaj">
        <Fab color="white" aria-label="Kontakt" size="small" sx={{ mr: 2 }}>
          <Icon>settings</Icon>
        </Fab>
      </Tooltip>
    )
  }
}

const AppBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const { loggedIn, isAdmin } = useSelector(state => state.user);

  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <Bar position='static' sx={{ backgroundColor: 'primary.dark' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo />
            <Box sx={{ flexGrow: 1 }} />
              <Link href="/contact" underline="none">
                <ContactButton matches={matches} />
              </Link>
              { loggedIn
              ? <React.Fragment>
                { isAdmin
                ? <AdminButton matches={matches} />
                : null
                }
                  <Profile />
                </React.Fragment>
              : <React.Fragment>
                  <Link href="/user/login" underline="none">
                    <LoginButton matches={matches} />
                  </Link>
                  <Link href="/user/register" underline="none">
                    <RegisterButton matches={matches} />
                  </Link>
                </React.Fragment>}
          </Toolbar>
        </Container>
      </Bar>
    </Box>
  );
}

export default AppBar;
