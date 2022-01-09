import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import helpers from '../../../store/actions/helpers';
import parameters from '../../../store/actions/parameters';

import Box from '@mui/material/Box';
import Actions from '../Shared/Actions';
import Select from '../../../components/Shared/Select';

import { deleteMake, editMake, getMakes } from '../../../logic/graphql/make';

const MakeActions = ({ item }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(item.make);
  const [origin, setOrigin] = useState(item.originId);
  const { origins } = useSelector(state => state.parameters);

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
      const data = {make: name, originId: origin, makeId: item._id}
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

  const originItems = () => {
    return origins.map(o => ({
      text: o.origin,
      id: o._id,
    }));
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
    >
      <Box sx={{ my: 1 }}>
        <Select
          label="Pochodzenie"
          value={origin}
          onChange={val => setOrigin(val)}
          items={originItems()}
        />
      </Box>
    </Actions>
  );
}

export default MakeActions;
