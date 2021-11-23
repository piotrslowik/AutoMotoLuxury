import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';

import helpersActions from '../../../store/actions/helpers';

import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import DataTable from '../../../components/Shared/DataTable';
import Loader from '../../../components/Shared/Loader';

import { getMakes } from '../../../logic/graphql/make';

const Makes = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [makes, setMakes] = useState([]);

  const headers = [
    {
      text: 'Marka',
      value: 'make',
      align: 'center',
      searchable: true,
      sortable: true,
    },
    {
      text: 'Pochodzenie',
      value: 'origin',
      align: 'center',
      sortable: true,
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
    dispatch(helpersActions.setActionPageHeader("Marki"));
  }

  const fetchMakes = async () => {
    setIsLoading(true);
    const result = await getMakes();
    setMakes(result.map(make => ({...make, origin: make.origin.origin})));
    setIsLoading(false);
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
    
    ? <Loader color={theme.palette.primary.main} text="Wczytywanie marek" />

    : <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <DataTable
          headers={headers}
          items={makes}
          slot={slots}
          headerSlot={headerSlots}
          searchable
          searchPlaceholder={"🔎︎ Wyszukaj markę"}
        />
      </CardContent>
  );
}

export default Makes;
