import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import helpers from '../../../store/actions/helpers';
import parameters from '../../../store/actions/parameters';

import Add from '../Shared/Add';

import { addOrigin, getOrigins } from '../../../logic/graphql/origin';

const AddOrigin = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleInput = (val) => {
    setName(val);
  }
  const handleAdd = async () => {
    try {
      await addOrigin(name);
      fetchOrigins();
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
    }
  }

  const fetchOrigins = async () => {
    const result = await getOrigins();
    dispatch(parameters.setOrigins(result));
  }

  return (
    <Add
      value={name}
      onInput={handleInput}
      handleAdd={handleAdd}
      title="Dodaj pochodzenie"
      label="Pochodzenie"
    />
  );
}

export default AddOrigin;
