import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

import helpersActions from '../../../store/actions/helpers';
import parametersActions from '../../../store/actions/parameters';

import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DataTable from '../../../components/Shared/DataTable';
import Loader from '../../../components/Shared/Loader';
import Select from '../../../components/Shared/Select';

import { getMakes } from '../../../logic/graphql/make';
import { getModels } from '../../../logic/graphql/model';
import Actions from './actions';

const Models = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
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
    const makes = result.map(make => ({ text: make.make, id: make._id}));
    dispatch(parametersActions.setMakes(makes));
    setIsLoading(false);
  }
  const fetchModels = async (make) => {
    const result = await getModels(make);
    const models = result.map(model => ({ ...model, make: model.make.make }));
    dispatch(parametersActions.setModels(models));
  }

  const handleMakeChange = (make) => {
    setMake(make);
    fetchModels(make);
  }

  const getActionsCell = (item) => {
    return (
      <div style={{marginTop: -8, marginBottom: -8 }}>
        <Actions item={item} />
      </div>)
  }

  const getAddButton = () => {
    return <Button startIcon={<Icon>add</Icon>} variant="outlined">Dodaj</Button>
  }

  const slots = {
    actions: item => getActionsCell(item),
  };
  const headerSlots = {
    actions: () => getAddButton(),
  }

  return (
    (isLoading)
    
    ? <Loader color={theme.palette.primary.main} text="Wczytywanie modeli" />

    : <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12} md={6} lg={4}>
            <Select
            label="Marka"
            items={makes}
            value={make}
            onChange={handleMakeChange}
          />
          </Grid>
        </Grid>
        { make
          ? <DataTable
              headers={headers}
              items={models}
              slot={slots}
              headerSlot={headerSlots}
              searchable
              searchPlaceholder={"🔎︎ Wyszukaj model"}
            />
          : null
        }     
      </CardContent>
  );
}

export default Models;
