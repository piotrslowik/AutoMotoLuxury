import React from 'react';

import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';

const EditButton = ({
  ...props
}) => {
  return (
    <Fab color="primary" size={props.size} onClick={() => {}}>
      <Icon>
        edit
      </Icon>
    </Fab>
  );
}

export default EditButton;
