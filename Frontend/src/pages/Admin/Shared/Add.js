import React, { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

const Add = ({ 
  value,
  title,
  handleAdd,
  label,
  onInput,
  children,
 }) => {
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(value);

  useEffect(() => {
    setName(value);
  }, [value]);

  const openDialog = () => {
    setDialog(true);
  }
  const closeDialog = () => {
    setDialog(false);
    onInput('');
  }
  const handleInput = (e) => {
    onInput(e.target.value);
  }
  const handleAddAndClose = () => {
    setLoading(true);
    handleAdd();
    setLoading(false);
    closeDialog();
  }
  const handleAddOnEnterKey = (e) => {
    if (e.keyCode === 13) handleAddAndClose();
  }

  return (
    <React.Fragment>
      <Button
        startIcon={<Icon>add</Icon>}
        variant="outlined"
        onClick={openDialog}
      >
        Dodaj
      </Button>
      <Dialog
        open={dialog}
        onClose={closeDialog}
      >
        <DialogTitle>{ title }</DialogTitle>
        <DialogContent>
          { children }
          <TextField
            value={name}
            onChange={handleInput}
            label={label}
            variant="standard"
            fullWidth
            inputProps={{ minLength: 1 }}
            onKeyUp={handleAddOnEnterKey}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ float: 'right' }}
            variant="outlined"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            onClick={handleAddAndClose}
          >
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Add;
