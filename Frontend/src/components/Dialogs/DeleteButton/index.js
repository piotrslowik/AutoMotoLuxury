import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Confirm from '../Confirm';
import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';

const DeleteButton = ({
  dialog,
  dialogText,
  dialogTitle,
  onClick,
  onAgree,
  onCancel,
  loading,
  ...props,
}) => {
  const [_dialog, setDialog] = useState(dialog);
  useEffect(() => {
    setDialog(dialog);
  }, [dialog]);

  return (
    <Confirm
      value={_dialog}
      text={dialogText}
      title={dialogTitle}
      onAgree={onAgree}
      onCancel={onCancel}
      loading={loading}
    >
      <Fab
        color="primary" 
        size={props.size}
        sx={{ backgroundColor: 'error.main', color: '#FFF', ...props.sx }}
        onClick={onClick}
      >
        <Icon>
          delete
        </Icon>
      </Fab>
    </Confirm>
  );
}

DeleteButton.propTypes = {
  dialog: PropTypes.bool,
  dialogText: PropTypes.string,
  dialogTitle: PropTypes.string,
  onAgree: PropTypes.func,
  onCancel: PropTypes.func,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
}

export default DeleteButton;
