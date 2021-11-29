import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

import helpersActions from '../../../store/actions/helpers';
import parametersActions from '../../../store/actions/parameters';

import CardContent from '@mui/material/CardContent';
import DataTable from '../../../components/Shared/DataTable';
import Loader from '../../../components/Shared/Loader';

import Actions from './actions';
import Add from './add';

import { getMakes } from '../../../logic/graphql/make';
import { getOrigins } from '../../../logic/graphql/origin';

const Makes = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const { makes } = useSelector(state => state.parameters);

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
    setIsLoading(true);
    fetchMakes();
    fetchOrigins();
    setIsLoading(false);
  }, []);
  useEffect(() => {
    setPageHeader();
  }, [dispatch]);

  const setPageHeader = () => {
    dispatch(helpersActions.setActionPageHeader("Marki"));
  }

  const fetchMakes = async () => {
    const result = await getMakes();
    dispatch(parametersActions.setMakes(result));
  }
  const fetchOrigins = async () => {
    const result = await getOrigins();
    dispatch(parametersActions.setOrigins(result));
  }

  const makeItems = () => {
    return makes.map(make => ({...make, origin: make.origin.origin, originId: make.origin._id}))
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
    
    ? <Loader color={theme.palette.primary.main} text="Wczytywanie marek" />

    : <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <DataTable
          headers={headers}
          items={makeItems()}
          slot={slots}
          headerSlot={headerSlots}
          searchable
          searchPlaceholder={"🔎︎ Wyszukaj markę"}
        />
      </CardContent>
  );
}

export default Makes;
