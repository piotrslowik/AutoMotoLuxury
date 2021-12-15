import React from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../../../store/actions/user';

import Avatar from '@mui/material/Avatar';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';

const ProfileAvatar = () => {
  return (
    <Avatar>
      P
    </Avatar>
  );
}

const Profile = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userActions.clear());
    localStorage.clear();
    window.location.href="/";
  }

  const actions = [
    { 
      icon: <Icon>star</Icon>,
      tooltip: 'Ulubione',
      onClick: () => {},
    },
    { 
      icon: <Icon>logout</Icon>,
      tooltip: 'Wyloguj',
      onClick: logout,
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ width: '60px' }} />
      <SpeedDial
        sx={{ position: 'absolute', top: { xs: 0, sm: 4 }, right: 0}}
        icon={<ProfileAvatar />}
        ariaLabel="profile speed dial"
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.tooltip}
            icon={action.icon}
            tooltipTitle={action.tooltip}
            onClick={action.onClick}
            sx={{ bgcolor: '#EEE' }}
          />
        ))}
      </SpeedDial>
    </React.Fragment>
  );
}

export default Profile;
