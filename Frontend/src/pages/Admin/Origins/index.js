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

import { getOrigins } from '../../../logic/graphql/origin';

const Origins = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [origins, setOrigins] = useState([]);

  const headers = [
    {
      text: 'Pochodzenie',
      value: 'origin',
      align: 'center',
    },
    {
      text: '',
      value: 'actions',
      sx: { width: '130px' },
    },
  ];
  
  useEffect(() => {
    fetchOrigins();
  }, []);
  useEffect(() => {
    setPageHeader();
  }, [dispatch]);

  const setPageHeader = () => {
    dispatch(helpersActions.setActionPageHeader("Pochodzenia"));
  }

  const fetchOrigins = async () => {
    setIsLoading(true);
    const result = await getOrigins();
    setOrigins(result);
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
    
    ? <Loader color={theme.palette.primary.main} text="Wczytywanie pochodzeń" />

    : <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <DataTable
          headers={headers}
          items={origins}
          slot={slots}
          headerSlot={headerSlots}
        />
      </CardContent>
  );
}

export default Origins;
