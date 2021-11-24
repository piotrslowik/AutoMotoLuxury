import React, { useState } from 'react';

import DeleteButton from '../../../components/Dialogs/DeleteButton';
import EditButton from '../../../components/Dialogs/EditButton';

import { deleteModel } from '../../../logic/graphql/model';

const Actions = ({ item }) => {
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const openDialog = () => {
    setDialog(true);
  }
  const closeDialog = () => {
    setDialog(false);
  }

  const handleDeleteModel = async () => {
    // await deleteModel(item._id);
    setLoading(true);
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
