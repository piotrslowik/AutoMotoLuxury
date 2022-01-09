import React from 'react';
import PropTypes from 'prop-types';

import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';

const EditButton = ({
  onClick,
  ...props
}) => {
  return (
    <Fab color="primary" size={props.size} onClick={onClick}>
      <Icon>
        edit
      </Icon>
    </Fab>
  );
}

EditButton.propTypes = {
  onClick: PropTypes.func,
};

export default EditButton;
