import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import helpersActions from '../../../store/actions/helpers';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import Loader from '../../../components/Shared/Loader';

import { getOffers } from '../../../logic/graphql/offer';
import { formatNumber } from '../../../logic/helpers';

const Offers = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [offersOriginal, setOffersOriginal] = useState([]);
  const [offers, setOffers] = useState([]);
  const [sortValue, setSortValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isSortAsc, setIsSortAsc] = useState(false);

  const headers = [
    {
      text: 'Marka',
      value: 'make',
    },
    {
      text: 'Model',
      value: 'model',
    },
    {
      text: 'Cena',
      value: 'price',
    },
    {
      text: 'Paliwo',
      value: 'fuel',
    },
    {
      text: 'Dodano',
      value: 'date',
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
    setOffersOriginal(offers);
    setIsLoading(false);
  }

  const handleSort = val => {
    if (val === sortValue) {
      if (isSortAsc) {
        setIsSortAsc(false);
        const sortedArr = offers;
        sortedArr.sort((o1, o2) => o1[val] > o2[val] ? -1 : (o1[val] < o2[val] ? 1 : 0));
      } else {
        setOffers(offersOriginal);
        setSortValue('');
      }
    }
    else {
      setSortValue(val);
      setIsSortAsc(true);
      const sortedArr = offers;
      sortedArr.sort((o1, o2) => o1[val] > o2[val] ? 1 : (o1[val] < o2[val] ? -1 : 0));
      setOffers(sortedArr);
    }
  }

  const handleSearch = () => {
    setOffers(offersOriginal.filter(o => o.make.toLowerCase().includes(searchValue.toLowerCase()) || o.model.toLowerCase().includes(searchValue.toLowerCase())));
  }
  const handleSearchOnEnterKey = (e) => {
    if (e.keyCode === 13) handleSearch();
  }

  const getDateString = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()} / ${d.getMonth() + 1} / ${d.getDate()}`;
  }

  const getSortArrow = (val) => {
    return val === sortValue ? (isSortAsc ? '↑' : '↓') : '';
  }

  return (
    (isLoading)
    
    ? <Loader color={theme.palette.primary.main} text="Wczytywanie ogłoszeń" />

    : <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ mb: 3, display: 'flex', width: '100%' }}>
          <TextField
            label="Szukaj"
            placeholder="🔎︎ Wyszukaj wśród marek i modeli"
            variant="standard"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={handleSearchOnEnterKey}
            sx={{ flexGrow: 1 }}
          />
          <IconButton size="small" sx={{ p: '10px' }} onClick={handleSearch}>
            <Icon>
              search
            </Icon>
          </IconButton>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map(h => 
                  <TableCell align="center" key={h.value} onClick={() => handleSort(h.value)} sx={{ cursor: 'pointer' }}>
                    {h.text} { getSortArrow(h.value) }
                  </TableCell>
                )}
                <TableCell sx={{ width: '130px' }}>
                
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offers.map(offer => 
                <TableRow key={offer._id}>
                  <TableCell>
                    {offer.make}
                  </TableCell>
                  <TableCell>
                    {offer.model}
                  </TableCell>
                  <TableCell>
                    { formatNumber(offer.price) } zł
                  </TableCell>
                  <TableCell>
                    {offer.fuel}
                  </TableCell>
                  <TableCell>                  
                    { getDateString(offer.date) }
                  </TableCell>
                  <TableCell sx={{ py: 1 }}>
                    <Fab color="primary" size="small">
                      <Icon>
                        edit
                      </Icon>
                    </Fab>
                    <Fab color="primary" size="small" sx={{ ml: 2, backgroundColor: 'error.main', color: '#FFF' }}>
                      <Icon>
                        delete
                      </Icon>
                    </Fab>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
  );
}

export default Offers;
