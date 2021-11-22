import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import helpersActions from '../../../store/actions/helpers';

import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';
import Snackbar from '@mui/material/Snackbar';

import DataTable from '../../../components/Shared/DataTable';
import Loader from '../../../components/Shared/Loader';

import { getOffers } from '../../../logic/graphql/offer';
import { formatNumber } from '../../../logic/helpers';

const Offers = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState([]);

  // While functions are not ready yet
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const handleClose = () => setOpen(false);
  // ---------------------------------

  const headers = [
    {
      text: 'Marka',
      value: 'make',
      align: 'center',
      sortable: true,
      searchable: true,
    },
    {
      text: 'Model',
      value: 'model',
      align: 'center',
      sortable: true,
      searchable: true,
    },
    {
      text: 'Cena',
      value: 'price',
      align: 'center',
      sortable: true,
    },
    {
      text: 'Paliwo',
      value: 'fuel',
      align: 'center',
      sortable: true,
    },
    {
      text: 'Dodano',
      value: 'date',
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
    fetchOffers();
  }, []);
  useEffect(() => {
    setPageHeader();
  }, [dispatch]);

  const setPageHeader = () => {
    dispatch(helpersActions.setActionPageHeader("Ogłoszenia"));
  }

  const fetchOffers = async () => {
    const result = await getOffers();
    const offers = result.map(o => { return {
      ...o,
      make: o.make.make,
      model: o.model.model,
      fuel: o.fuel.fuel,
    }});
    setOffers(offers);
    setIsLoading(false);
  }

  const getDateString = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()} / ${d.getMonth() + 1} / ${d.getDate()}`;
  }
  
  const getActionsCell = (item) => {
    return (
      <div style={{marginTop: -8, marginBottom: -8 }}>
        <Fab color="primary" size="small" onClick={() => handleEdit(item._id)}>
          <Icon>
            edit
          </Icon>
        </Fab>
        <Fab color="primary" size="small" sx={{ ml: 2, backgroundColor: 'error.main', color: '#FFF' }} onClick={() => handleDelete(item._id)}>
          <Icon>
            delete
          </Icon>
        </Fab>
      </div>)
  }

  const handleEdit = (id) => {
    setMessage("Funkcjonalność edycji czeka na dodanie");
    setOpen(true);
  }
  const handleDelete = (id) => {
    setMessage("Funkcjonalność usuwania czeka na dodanie");
    setOpen(true);
  }

  const slots = {
    price: item => `${formatNumber(item.price)} zł`,
    date: item => getDateString(item.date),
    actions: item => getActionsCell(item),
  };

  return (
    (isLoading)
    
    ? <Loader color={theme.palette.primary.main} text="Wczytywanie ogłoszeń" />

    : <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <DataTable
          headers={headers}
          items={offers}
          searchable
          slot={slots}
        />
        <Snackbar
          open={open}
          autoHideDuration={3000}
          message={message}
          onClose={handleClose}
        />
      </CardContent>
  );
}

export default Offers;
