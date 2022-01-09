import React, { useEffect, useState } from 'react';

import DeleteButton from '../../../components/Dialogs/DeleteButton';
import EditButton from '../../../components/Dialogs/EditButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


const Actions = ({
  editValue,
  deleteDialogText,
  editDialogTitle,
  handleDelete,
  handleEdit,
  onEditInput,
  originalName,
  children,
}) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(editValue);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  useEffect(() => {
    setName(editValue);
  }, [editValue]);

  const openDeleteDialog = () => {
    setDeleteDialog(true);
  }
  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  }
  const openEditDialog = () => {
    setEditDialog(true);
  }
  const closeEditDialog = () => {
    setEditDialog(false);
    setTimeout(() => {
      setName(originalName);
    }, 200);
  }
  const handleInput = (e) => {
    onEditInput(e.target.value);
  }

  const handleDeleteAndClose = () => {
    setLoading(true);
    handleDelete();
    setLoading(false);
    closeDeleteDialog();
  }
  const handleEditAndClose = () => {
    setLoading(true);
    handleEdit();
    setLoading(false);
    closeEditDialog();
  }
  const handleEditOnEnterKey = (e) => {
    if (e.keyCode === 13) handleEditAndClose();
  }

  return (
    <div style={{ marginTop: -8, marginBottom: -8 }}>
      <EditButton size="small" onClick={openEditDialog} />
      <DeleteButton
        size="small"
        sx={{ ml: 2, }}
        dialogText={deleteDialogText}
        dialogTitle="Potwierdź usunięcie"
        dialog={deleteDialog}
        onClick={openDeleteDialog}
        onAgree={handleDeleteAndClose}
        onCancel={closeDeleteDialog}
        loading={loading}
      />
      <Dialog
        open={editDialog}
        onClose={closeEditDialog}
      >
        <DialogTitle>{editDialogTitle}</DialogTitle>
        <DialogContent>
          { children }
          <TextField
            value={name}
            onChange={handleInput}
            label="Nazwa"
            variant="standard"
            fullWidth
            inputProps={{ minLength: 1 }}
            onKeyUp={handleEditOnEnterKey}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ float: 'right' }}
            variant="outlined"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            onClick={handleEditAndClose}
          >
            Edytuj
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Actions;
