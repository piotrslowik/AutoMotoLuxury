import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import helpers from '../../../store/actions/helpers';
import parameters from '../../../store/actions/parameters';

import Add from '../Shared/Add';

import { addModel, getModels } from '../../../logic/graphql/model';

const AddModel = ({ makeId }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const { makes } = useSelector(state => state.parameters);

  const handleInput = (val) => {
    setName(val);
  }
  const handleAdd = async () => {
    try {
      await addModel(name, makeId);
      fetchModels();
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
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
    <Add
      value={name}
      onInput={handleInput}
      handleAdd={handleAdd}
      title={`Dodaj model marki ${getMakeName()}`}
      label="Nazwa modelu"
    />
  );
}

export default AddModel;
