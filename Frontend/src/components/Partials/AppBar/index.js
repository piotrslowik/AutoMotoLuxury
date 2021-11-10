import React from 'react';

import { Box, AppBar as Bar, Toolbar, Button, Icon } from '@mui/material';
import Logo from '../../Shared/Logo';

const ContactIcon = () => {
  return (
    <Icon>phone</Icon>
  );
}

const AppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Bar position='static' sx={{ backgroundColor: 'primary.dark' }}>
        <Toolbar>
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          <Button variant='outlined' color='white' sx={{ mr: 2 }} startIcon={<ContactIcon />}>Kontakt</Button>
          <Button variant='contained' sx={{ mr: 2 }}>Logowanie</Button>
          <Button variant='contained'>Rejestracja</Button>
        </Toolbar>
      </Bar>
    </Box>
  );
}

export default AppBar;
