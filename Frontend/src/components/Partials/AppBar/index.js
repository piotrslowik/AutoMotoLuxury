import React from 'react';

import { Container, Box, AppBar as Bar, Toolbar, Button, Icon } from '@mui/material';
import Logo from '../../Shared/Logo';

const ContactIcon = () => {
  return (
    <Icon>phone</Icon>
  );
}

const AppBar = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <Bar position='static' sx={{ backgroundColor: 'primary.dark' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo />
            <Box sx={{ flexGrow: 1 }} />
            <Button variant='outlined' color='white' sx={{ mr: 2 }} startIcon={<ContactIcon />}>Kontakt</Button>
            <Button variant='contained' sx={{ mr: 2 }}>Logowanie</Button>
            <Button variant='contained'>Rejestracja</Button>
          </Toolbar>
        </Container>
      </Bar>
    </Box>
  );
}

export default AppBar;
