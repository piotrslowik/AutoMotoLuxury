import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import helpers from '../../../store/actions/helpers';
import parameters from '../../../store/actions/parameters';

import Actions from '../Shared/Actions';

import { deleteModel, editModel, getModels } from '../../../logic/graphql/model';

const ModelActions = ({ item, makeId }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(item.model);

  const handleDelete = async () => {
    try{
      await deleteModel(item._id);
      dispatch(helpers.setSnackbar({ message: 'Usunięto model', type: 'success' }));
      fetchModels(makeId);
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
    }
  }

  const handleEdit = async () => {
    try{
      const data = {model: name, modelId: item._id, makeId}
      await editModel(data);
      fetchModels(makeId);
    } catch (e) {
      dispatch(helpers.setSnackbar({ message: e, type: 'error' }));
    } finally {
      setName(item.model)
    }
  }

  const fetchModels = async (make) => {
    const result = await getModels(make);
    dispatch(parameters.setModels(result));
  }

  return (
    <Actions
      editValue={name}
      onEditInput={val => setName(val)}
      deleteDialogText={`Czy na pewno chcesz usunąć ${item.make} ${item.model}?`}
      editDialogTitle="Edycja modelu"
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      originalName={item.model}
    />
  );
}

export default ModelActions;
