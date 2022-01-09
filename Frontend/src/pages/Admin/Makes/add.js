import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import helpers from '../../../store/actions/helpers';
import parameters from '../../../store/actions/parameters';

import Box from '@mui/material/Box';
import Select from '../../../components/Shared/Select';
import Add from '../Shared/Add';

import { addMake, getMakes } from '../../../logic/graphql/make';

const AddMake = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const { origins } = useSelector(state => state.parameters);

  const handleInput = (val) => {
    setName(val);
  }
  const handleAdd = async () => {
    try {
      await addMake(name, origin);
      fetchMakes();
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
    }
  }

  const fetchMakes = async () => {
    const result = await getMakes();
    dispatch(parameters.setMakes(result));
  }

  const getOriginItems = () => {
    return origins.map(o => ({
      id: o._id,
      text: o.origin,
    }));
  }

  return (
    <Add
      value={name}
      onInput={handleInput}
      handleAdd={handleAdd}
      title="Dodaj markę"
      label="Nazwa marki"
    >
      <Box sx={{ my: 1 }}>
        <Select
          items={getOriginItems()}
          value={origin}
          onChange={val => setOrigin(val)}
          label="Pochodzenie"
        />
      </Box>
    </Add>
  );
}

export default AddMake;
