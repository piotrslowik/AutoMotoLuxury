import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import helpers from '../../../store/actions/helpers';
import parameters from '../../../store/actions/parameters';

import DeleteButton from '../../../components/Dialogs/DeleteButton';
import EditButton from '../../../components/Dialogs/EditButton';
import Modal from '../../../components/Modals';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { deleteModel, editModel, getModels } from '../../../logic/graphql/model';

const Actions = ({ item, makeId }) => {
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(item.model);

  const openDialog = () => {
    setDialog(true);
  }
  const closeDialog = () => {
    setDialog(false);
  }
  const openModal = () => {
    setModal(true);
  }
  const closeModal = () => {
    setModal(false);
    setName(item.model);
  }
  const handleInput = (e) => {
    setName(e.target.value);
  }

  const handleDelete = async () => {
    setLoading(true);
    try{
      await deleteModel(item._id);
      dispatch(helpers.setSnackbar({ message: 'Usunięto model', type: 'success' }));
      fetchModels(makeId);
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
    } finally {
      setLoading(false);
      setDialog(false);
    }
  }

  const handleEdit = async () => {
    setLoading(true);
    try{
      const data = {model: name, modelId: item._id, makeId}
      await editModel(data);
      fetchModels(makeId);
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
    } finally {
      setLoading(false);
      setModal(false);
    }
  }

  const fetchModels = async (make) => {
    const result = await getModels(make);
    dispatch(parameters.setModels(result));
  }

  return (
    <div style={{marginTop: -8, marginBottom: -8 }}>
      <EditButton size="small" onClick={openModal} />
      <DeleteButton
        size="small"
        sx={{ ml: 2, }}
        dialogText={`Czy na pewno chcesz usunąć ${item.make} ${item.model}?`}
        dialogTitle="Potwierdź usunięcie"
        dialog={dialog}
        onClick={openDialog}
        onAgree={handleDelete}
        onCancel={closeDialog}
        loading={loading}
      />
      <Modal header="Edycja modelu" onClose={closeModal} open={modal} maxWidth={300}>
        <Paper sx={{ p: 1 }}>
          <TextField
            value={name}
            onChange={handleInput}
            label="Nazwa modelu"
            variant="standard"
            fullWidth
            inputProps={{ minLength: 1 }}
          />
        </Paper>
        <Button
          sx={{ mt: 3, float: 'right' }}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
          onClick={handleEdit}
        >
          Edytuj
        </Button>
      </Modal>
    </div>
  );
}

export default Actions;
