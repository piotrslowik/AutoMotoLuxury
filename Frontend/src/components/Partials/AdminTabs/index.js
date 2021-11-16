import React, { useState } from 'react';

import DrawerItems from './items';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Icon, Card } from '@mui/material';

const drawerWidth = 200;

const AdminTabs = ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pageHeader, setPageHeader] = useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Card>
      <AppBar
        position="relative"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography
            component="div"
            sx={{
              py: { xs: 2, sm: 3 },
              fontSize: { xs: '1.6em', sm: '2em' },
              width: '100%',
              textAlign: 'center',
            }}
          >
            { pageHeader }
          </Typography>
        </Toolbar>
      </AppBar>


        { /*Drawer on mobile */}
        
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          flexShrink: 0,
        }}
      >
        <DrawerItems pageNameSetter={setPageHeader} />
      </Drawer>

      <Box sx={{ display: 'flex' }}>
              { /*Drawer standard */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, position: 'relative' }}
        >
          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <DrawerItems pageNameSetter={setPageHeader} />
          </Box>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1 }}
        >
          { children }
        </Box>
      </Box>
    </Card>
  );
}

export default AdminTabs;
