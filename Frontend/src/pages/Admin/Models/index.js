import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

import helpersActions from '../../../store/actions/helpers';
import parametersActions from '../../../store/actions/parameters';

import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import DataTable from '../../../components/Shared/DataTable';
import Loader from '../../../components/Shared/Loader';
import Select from '../../../components/Shared/Select';

import { getMakes } from '../../../logic/graphql/make';
import { getModels } from '../../../logic/graphql/model';
import Actions from './actions';
import Add from './add';

const Models = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [loadingModels, setLoadingModels] = useState(false);
  const [make, setMake] = useState('');
  const { makes, models } = useSelector(state => state.parameters);

  const headers = [
    {
      text: 'Model',
      value: 'model',
      align: 'center',
      sortable: true,
      searchable: true,
    },
    {
      text: '',
      value: 'actions',
      sx: { width: '130px' },
    },
  ];

  const items = () => {
    return models.map(model => ({ ...model, make: model.make.make }))
  }
  const itemsMakes = () => {
    return makes.map(make => ({ text: make.make, id: make._id}));
  }
  
  useEffect(() => {
    fetchMakes();
  }, []);
  useEffect(() => {
    setPageHeader();
  }, [dispatch]);

  const setPageHeader = () => {
    dispatch(helpersActions.setActionPageHeader("Modele"));
  }

  const fetchMakes = async () => {
    setIsLoading(true);
    const result = await getMakes();
    dispatch(parametersActions.setMakes(result));
    setIsLoading(false);
  }
  const fetchModels = async (make) => {
    setLoadingModels(true);
    dispatch(parametersActions.setModels([]));
    const result = await getModels(make);
    dispatch(parametersActions.setModels(result));
    setLoadingModels(false);
  }

  const handleMakeChange = (make) => {
    setMake(make);
    fetchModels(make);
  }

  const getActionsCell = (item) => {
    return (
      <div style={{marginTop: -8, marginBottom: -8 }}>
        <Actions item={item} makeId={make} />
      </div>)
  }

  const getAddButton = () => {
    return <Add makeId={make} />
  }

  const slots = {
    actions: item => getActionsCell(item),
  };
  const headerSlots = {
    actions: () => getAddButton(),
  }

  return (
    (isLoading)
    
    ? <Loader color={theme.palette.primary.main} text="Wczytywanie marek" />

    : <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12} md={6} lg={4}>
            <Select
            label="Marka"
            items={itemsMakes()}
            value={make}
            onChange={handleMakeChange}
          />
          </Grid>
        </Grid>
        { make
          ? <DataTable
              headers={headers}
              items={items()}
              slot={slots}
              headerSlot={headerSlots}
              searchable
              searchPlaceholder={"🔎︎ Wyszukaj model"}
              loading={loadingModels}
            />
          : null
        }     
      </CardContent>
  );
}

export default Models;
