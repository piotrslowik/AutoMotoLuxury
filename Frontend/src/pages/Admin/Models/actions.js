import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import helpers from '../../../store/actions/helpers';
import parameters from '../../../store/actions/parameters';

import DeleteButton from '../../../components/Dialogs/DeleteButton';
import EditButton from '../../../components/Dialogs/EditButton';

import { deleteModel, getModels } from '../../../logic/graphql/model';

const Actions = ({ item, makeId }) => {
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const openDialog = () => {
    setDialog(true);
  }
  const closeDialog = () => {
    setDialog(false);
  }

  const handleDeleteModel = async () => {
    setLoading(true);
    try{
      await deleteModel(item._id);
      dispatch(helpers.setSnackbar({ message: 'Usunięto model', type: 'success' }));
      fetchModels(makeId);
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: 'Nie udało się usunąć modelu', type: 'error' }));
    } finally {
      setLoading(false);
      setDialog(false);
    }
  }

  const fetchModels = async (make) => {
    const result = await getModels(make);
    dispatch(parameters.setModels(result));
  }

  return (
    <div style={{marginTop: -8, marginBottom: -8 }}>
      <EditButton size="small" />
      <DeleteButton
        size="small"
        sx={{ ml: 2, }}
        dialogText={`Czy na pewno chcesz usunąć ${item.make} ${item.model}?`}
        dialogTitle="Potwierdź usunięcie"
        dialog={dialog}
        onClick={openDialog}
        onAgree={handleDeleteModel}
        onCancel={closeDialog}
        loading={loading}
      />
    </div>
  );
}

export default Actions;
