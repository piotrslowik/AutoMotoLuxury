import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Confirm = ({
  value,
  title,
  text,
  cancelText,
  agreeText,
  onAgree,
  onCancel,
  children,
  loading,
}) => {
  const [open, setOpen] = useState(value);
  useEffect(() => {
    setOpen(value);
  }, [value]);

  const handleCancel = () => {
    onCancel();
  }
  const handleAgree = () => {
    onAgree();
  }

  return (
    <React.Fragment>
      { children }
      <Dialog
        open={open}
        onClose={handleCancel}
      >
        <DialogTitle>
          { title }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            { text }
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button onClick={handleCancel} sx={{ color: 'error.main' }}>
            { cancelText }
          </Button>
          <Button onClick={handleAgree} autoFocus disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : null}>
            { agreeText }
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

Confirm.propTypes = {
  value: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  cancelText: PropTypes.string,
  agreeText: PropTypes.string,
  onAgree: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
}

Confirm.defaultProps = {
  value: false,
  title: '',
  text: '',
  cancelText: 'anuluj',
  agreeText: 'ok',
  onAgree: () => {},
  onCancel: () => {},
  loading: false,
}

export default Confirm;
