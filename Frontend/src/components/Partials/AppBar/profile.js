import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../../store/actions/user';

import Avatar from '@mui/material/Avatar';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';

const ProfileAvatar = ({ email, id }) => {
  const goToProfile = () => {
    window.location.href=`/user/${id}/profile`;
  }

  return (
    <Tooltip title="Szczegóły profilu" placement='bottom-start'>
      <Avatar onClick={goToProfile}>
        { email.charAt(0).toUpperCase() }
      </Avatar>
    </Tooltip>
  );
}

const Profile = () => {
  const dispatch = useDispatch();
  
  const { email, id } = useSelector(state => state.user);

  const goToFavorites = () => {
    window.location.href=`/user/favorites`;
  }

  const logout = () => {
    dispatch(userActions.clear());
    localStorage.clear();
    window.location.href="/";
  }

  const actions = [
    { 
      icon: <Icon>star</Icon>,
      tooltip: 'Ulubione',
      onClick: goToFavorites,
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
        icon={<ProfileAvatar email={email || "P"} id={id} />}
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
