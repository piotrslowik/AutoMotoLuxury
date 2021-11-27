import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import helpers from '../../../store/actions/helpers';
import parameters from '../../../store/actions/parameters';

import Modal from '../../../components/Modals';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { addModel, getModels } from '../../../logic/graphql/model';

const Add = ({ makeId }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const { makes } = useSelector(state => state.parameters);

  const openModal = () => {
    setModal(true);
  }
  const closeModal = () => {
    setModal(false);
    setName('');
  }

  const handleInput = (e) => {
    setName(e.target.value);
  }
  const handleAdd = async () => {
    setLoading(true);
    try{
      await addModel(name, makeId);
      fetchModels();
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
    } finally {
      setLoading(false);
      closeModal();
    }
  }

  const fetchModels = async () => {
    const result = await getModels(makeId);
    dispatch(parameters.setModels(result));
  }

  const getMakeName = () => {
    const make = makes.find(m => m._id === makeId);
    return make.make;
  }

  return (
    <React.Fragment>
      <Button
        startIcon={<Icon>add</Icon>}
        variant="outlined"
        onClick={openModal}
      >
        Dodaj
      </Button>
      <Modal
        header={`Dodaj model marki ${getMakeName()}`}
        open={modal}
        onClose={closeModal}
      >
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
          onClick={handleAdd}
        >
          Dodaj
        </Button>
      </Modal>
    </React.Fragment>
  );
}

export default Add;
