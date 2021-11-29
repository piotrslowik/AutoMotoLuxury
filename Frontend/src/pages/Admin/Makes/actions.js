import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import helpers from '../../../store/actions/helpers';
import parameters from '../../../store/actions/parameters';

import Actions from '../Shared/Actions';

import { deleteMake, editMake, getMakes } from '../../../logic/graphql/make';

const MakeActions = ({ item }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(item.make);

  const handleDelete = async () => {
    try{
      await deleteMake(item._id);
      dispatch(helpers.setSnackbar({ message: 'Usunięto markę', type: 'success' }));
      fetchMakes();
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
    }
  }

  const handleEdit = async () => {
    try{
      const data = {make: name, originId: item.origin._id, makeId: item._id}
      await editMake(data);
      fetchMakes();
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
    } finally {
      setName(item.make)
    }
  }

  const fetchMakes = async () => {
    const result = await getMakes();
    dispatch(parameters.setMakes(result));
  }

  return (
    <Actions
      editValue={name}
      onEditInput={val => setName(val)}
      deleteDialogText={`Czy na pewno chcesz usunąć ${item.make}?`}
      editDialogTitle="Edycja marki"
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      originalName={item.make}
    />
  );
}

export default MakeActions;
