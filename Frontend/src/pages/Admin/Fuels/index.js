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

import { getFuels } from '../../../logic/graphql/fuel';

const Fuels = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [fuels, setFuels] = useState([]);

  const headers = [
    {
      text: 'Paliwo',
      value: 'fuel',
      align: 'center',
    },
    {
      text: '',
      value: 'actions',
      sx: { width: '130px' },
    },
  ];
  
  useEffect(() => {
    fetchFuels();
  }, []);
  useEffect(() => {
    setPageHeader();
  }, [dispatch]);

  const setPageHeader = () => {
    dispatch(helpersActions.setActionPageHeader("Typy paliw"));
  }

  const fetchFuels = async () => {
    setIsLoading(true);
    const result = await getFuels();
    setFuels(result);
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
    
    ? <Loader color={theme.palette.primary.main} text="Wczytywanie paliw" />

    : <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <DataTable
          headers={headers}
          items={fuels}
          slot={slots}
          headerSlot={headerSlots}
        />
      </CardContent>
  );
}

export default Fuels;
