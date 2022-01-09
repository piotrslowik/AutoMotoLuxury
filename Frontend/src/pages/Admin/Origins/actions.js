import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import helpers from '../../../store/actions/helpers';
import parameters from '../../../store/actions/parameters';

import Actions from '../Shared/Actions';

import { deleteOrigin, editOrigin, getOrigins } from '../../../logic/graphql/origin';

const OriginActions = ({ item }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(item.origin);

  const handleDelete = async () => {
    try{
      await deleteOrigin(item._id);
      dispatch(helpers.setSnackbar({ message: 'Usunięto pochodzenie', type: 'success' }));
      fetchOrigins();
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
    }
  }

  const handleEdit = async () => {
    try{
      await editOrigin(name, item._id);
      fetchOrigins();
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
    } finally {
      setName(item.origin)
    }
  }

  const fetchOrigins = async () => {
    const result = await getOrigins();
    dispatch(parameters.setOrigins(result));
  }

  return (
    <Actions
      editValue={name}
      onEditInput={val => setName(val)}
      deleteDialogText={`Czy na pewno chcesz usunąć pochodzenie ${item.origin}?`}
      editDialogTitle="Edycja pochodzenia"
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      originalName={item.origin}
    />
  );
}

export default OriginActions;
