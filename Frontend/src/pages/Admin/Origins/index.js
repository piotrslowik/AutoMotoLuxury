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

import { getOrigins } from '../../../logic/graphql/origin';

const Origins = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const { origins } = useSelector(state => state.parameters);

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
    dispatch(parametersActions.setOrigins(result));
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
