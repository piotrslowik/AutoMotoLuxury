import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

import helpersActions from '../../../store/actions/helpers';
import parametersActions from '../../../store/actions/parameters';

import CardContent from '@mui/material/CardContent';
import DataTable from '../../../components/Shared/DataTable';
import Loader from '../../../components/Shared/Loader';

import Add from './add';
import Actions from './actions';

import { getFuels } from '../../../logic/graphql/fuel';

const Fuels = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const { fuels } = useSelector(state => state.parameters);

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
    dispatch(parametersActions.setFuels(result));
    setIsLoading(false);
  }

  const getActionsCell = (item) => {
    return (
      <div style={{marginTop: -8, marginBottom: -8 }}>
        <Actions item={item} />
      </div>)
  }

  const getAddButton = () => {
    return <Add />
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
