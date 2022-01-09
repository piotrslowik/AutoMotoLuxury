import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import helpers from '../../../store/actions/helpers';
import parameters from '../../../store/actions/parameters';

import Add from '../Shared/Add';

import { addFuel, getFuels } from '../../../logic/graphql/fuel';

const AddFuel = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleInput = (val) => {
    setName(val);
  }
  const handleAdd = async () => {
    try {
      await addFuel(name);
      fetchFuels();
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
    }
  }

  const fetchFuels = async () => {
    const result = await getFuels();
    dispatch(parameters.setFuels(result));
  }

  return (
    <Add
      value={name}
      onInput={handleInput}
      handleAdd={handleAdd}
      title="Dodaj paliwo"
      label="Rodzaj paliwa"
    />
  );
}

export default AddFuel;
