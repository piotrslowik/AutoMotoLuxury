import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';

import helpersActions from '../../../store/actions/helpers';

import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DataTable from '../../../components/Shared/DataTable';
import Loader from '../../../components/Shared/Loader';
import Select from '../../../components/Shared/Select';

import { getMakes } from '../../../logic/graphql/make';
import { getModels } from '../../../logic/graphql/model';

const Models = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [make, setMake] = useState('');
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

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
    setMakes(result.map(make => ({ text: make.make, id: make._id})));
    setIsLoading(false);
  }
  const fetchModels = async (make) => {
    const result = await getModels(make);
    setModels(result.map(model => ({ ...model, make: model.make.make })));
  }

  const handleMakeChange = (make) => {
    setMake(make);
    fetchModels(make);
  }

  const getActionsCell = (item) => {
    return (
      <div style={{marginTop: -8, marginBottom: -8 }}>
        <Fab color="primary" size="small" onClick={() => {}}>
          <Icon>
            edit
          </Icon>
        </Fab>
        <Fab color="primary" size="small" sx={{ ml: 2, backgroundColor: 'error.main', color: '#FFF' }} onClick={() => {}}>
          <Icon>
            delete
          </Icon>
        </Fab>
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
