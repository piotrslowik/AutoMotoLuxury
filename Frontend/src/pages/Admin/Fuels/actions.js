import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import helpers from '../../../store/actions/helpers';
import parameters from '../../../store/actions/parameters';

import Actions from '../Shared/Actions';

import { deleteFuel, editFuel, getFuels } from '../../../logic/graphql/fuel';

const FuelActions = ({ item }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(item.fuel);

  const handleDelete = async () => {
    try{
      await deleteFuel(item._id);
      dispatch(helpers.setSnackbar({ message: 'Usunięto paliwo', type: 'success' }));
      fetchFuels();
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
    }
  }

  const handleEdit = async () => {
    try{
      await editFuel(name, item._id);
      fetchFuels();
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
    } finally {
      setName(item.fuel)
    }
  }

  const fetchFuels = async () => {
    const result = await getFuels();
    dispatch(parameters.setFuels(result));
  }

  return (
    <Actions
      editValue={name}
      onEditInput={val => setName(val)}
      deleteDialogText={`Czy na pewno chcesz usunąć ${item.fuel}?`}
      editDialogTitle="Edycja paliwa"
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      originalName={item.fuel}
    />
  );
}

export default FuelActions;
