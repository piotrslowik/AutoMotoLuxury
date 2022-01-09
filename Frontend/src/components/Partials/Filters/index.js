import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import offersActions from '../../../store/actions/offers';
import parametersActions from '../../../store/actions/parameters';

import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { getFuels } from '../../../logic/graphql/fuel';
import { getOrigins } from '../../../logic/graphql/origin';
import { getMakes } from '../../../logic/graphql/make';
import { getFilteredOffers } from '../../../logic/graphql/offer';

import { AccordionDetails, AccordionSummary as MuiAccordionSummary , Typography, Grid, TextField, Button, Accordion, Icon, Box, Tooltip } from '@mui/material';

import { getModels } from '../../../logic/graphql/model';
import SingleSelect from '../../Shared/Select';

const Filters = () => {
  const dummyObj = {
    text: 'Wszystkie',
    id: '0',
  }

  const { fuels, origins, makes } = useSelector(state => state.parameters);
  const [models, setModels] = useState([]);

  const [fuel, setFuel] = useState(dummyObj.id);
  const [origin, setOrigin] = useState(dummyObj.id);
  const [make, setMake] = useState(dummyObj.id);
  const [model, setModel] = useState(dummyObj.id);
  const [loading, setLoading] = useState(true);
  const [kmsMax, setKmsMax] = useState('');
  const [kmsMin, setKmsMin] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [yearMin, setYearMin] = useState('');
  const [yearMax, setYearMax] = useState('');

  const theme = useTheme();
  const dispatch = useDispatch();
  
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const [open, setOpen] = useState(matches);
  
  useEffect(() => {
    fetchParameters();
  }, [dispatch]);

  useEffect(() => {
    setOpen(matches);
  }, [matches]);

  useEffect(() => {
    if (make !== dummyObj.id) {
      fetchModels(make);
    } else {
      setModels([]);
    }
  }, [make]);
  useEffect(() => {
    setMake(dummyObj.id);
    setModel(dummyObj.id);
  }, [origin]);

  const fetchParameters = async () => {
    const fuelsPromise = getFuels();
    const originsPromise = getOrigins();
    const makesPromise = getMakes();
    Promise.all([fuelsPromise, originsPromise, makesPromise])
      .then(values => {
        setFuels(values[0]);
        setOrigins(values[1])
        setMakes(values[2]);
        setLoading(false);
      });
  }

  const setFuels = param => {
    dispatch(parametersActions.setFuels(param.map(el => el)));
  }
  const setOrigins = param => {
    dispatch(parametersActions.setOrigins(param.map(el => el)));
  }
  const setMakes = param => {
    dispatch(parametersActions.setMakes(param.map(el => el)));
  }

  const fetchModels = async make =>{
    const models = await getModels(make);
    setModels(models);
  }

  const formatArray = (arr, field) => {
    if (!arr) return [];
    const result = arr.map(el => { return {text: el[field], id: el._id}});
    result.unshift(dummyObj);
    return result;
  }

  const formatMakeArray = (arr, field) => {
    if (origin === 0) {
      return formatArray(arr, field);
    } else {
      const filtered = arr.filter(make => make.origin._id === origin);
      return formatArray(filtered, field);
    }
  }

  const handleFilters = async () => {
    const filterSetup = getFilterSetup();
    const result = await getFilteredOffers(filterSetup);
    dispatch(offersActions.setOffers(result));
  }
  const getFilterSetup = () => {
    const result = {};
    if (fuel !== dummyObj.id) result.fuel = fuel;
    if (origin !== dummyObj.id) result.origin = origin;
    if (make !== dummyObj.id) result.make = make;
    if (model !== dummyObj.id) result.model = model;
    if (kmsMin !== '') result.kmsMin = parseInt(kmsMin);
    if (kmsMax !== '') result.kmsMax = parseInt(kmsMax);
    if (priceMin !== '') result.priceMin = parseInt(priceMin);
    if (priceMax !== '') result.priceMax = parseInt(priceMax);
    if (yearMin !== '') result.yearMin = parseInt(yearMin);
    if (yearMax !== '') result.yearMax = parseInt(yearMax);
    return result;
  }

  const resetFilters = () => {
    setModels([]);
    setFuel(dummyObj.id);
    setModel(dummyObj.id);
    setMake(dummyObj.id);
    setOrigin(dummyObj.id);
    setKmsMax('');
    setKmsMin('');
    setPriceMin('');
    setPriceMax('');
    setYearMin('');
    setYearMax('');
    handleFilters();
  }

  const currentYear = new Date().getFullYear();

  return (
    <Accordion expanded={open} onChange={() => setOpen(!open)} disableGutters>
      <AccordionSummary>
        <Typography variant='h5' ml={2}>Filtry</Typography>
      </AccordionSummary>
      {loading ? null :(
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12}>
              <Typography fontWeight='700' ml={2}>
                Paliwo
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SingleSelect
                items={formatArray(fuels, 'fuel')}
                value={fuel}
                onChange={setFuel}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12}>
              <Typography fontWeight='700' ml={2}>
                  Pochodzenie
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SingleSelect
                  items={formatArray(origins, 'origin')}
                  value={origin}
                  onChange={setOrigin}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={12}>
              <Typography fontWeight='700' ml={2}>
                  Marka
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SingleSelect
                  items={formatMakeArray(makes, 'make')}
                  value={make}
                  onChange={setMake}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12}>
              <Typography fontWeight='700' ml={2}>
                  Model
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SingleSelect
                  items={formatArray(models, 'model')}
                  value={model}
                  onChange={setModel}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} lg={12} xl={6}>
            <Grid item xs={12}>
              <Typography fontWeight='700' ml={2}>
                Przebieg
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex' }}>
              <TextField 
                variant="outlined"
                type="number"
                value={kmsMin}
                onChange={e => setKmsMin(e.target.value)}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '0', max: '999999', "aria-autocomplete": "off" }}
                sx={{ flexGrow: 1 }}
                placeholder='od'
              />
              <TextField 
                variant="outlined"
                type="number"
                value={kmsMax}
                onChange={e => setKmsMax(e.target.value)}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '0', max: '999999', "aria-autocomplete": "off" }}
                sx={{ ml: 2, flexGrow: 1 }}
                placeholder='do'
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} lg={12} xl={6}>
            <Grid item xs={12}>
              <Typography fontWeight='700' ml={2}>
                Cena
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex' }}>
              <TextField 
                variant="outlined"
                type="number"
                value={priceMin}
                onChange={e => setPriceMin(e.target.value)}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '0', max: '999999', "aria-autocomplete": "off" }}
                sx={{ flexGrow: 1 }}
                placeholder='od'
              />
              <TextField 
                variant="outlined"
                type="number"
                value={priceMax}
                onChange={e => setPriceMax(e.target.value)}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '0', max: '999999', "aria-autocomplete": "off" }}
                sx={{ ml: 2, flexGrow: 1 }}
                placeholder='do'
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} lg={12} xl={6}>
            <Grid item xs={12}>
              <Typography fontWeight='700' ml={2}>
                Rocznik
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex' }}>
              <TextField 
                variant="outlined"
                type="number"
                value={yearMin}
                onChange={e => setYearMin(e.target.value)}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', max: currentYear.toString(), "aria-autocomplete": "off" }}
                sx={{ flexGrow: 1 }}
                placeholder='od'
              />
              <TextField 
                variant="outlined"
                type="number"
                value={yearMax}
                onChange={e => setYearMax(e.target.value)}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', max: currentYear.toString(), "aria-autocomplete": "off" }}
                sx={{ ml: 2, flexGrow: 1 }}
                placeholder='do'
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={12} xl={6}>
            <Box sx={{ mt: 4, display: 'flex' }}>
              <Button
                color="secondary"
                variant="contained"
                size="large"
                sx={{ flexGrow: 1 }}
                onClick={handleFilters}
              >
                Filtruj
              </Button>
              <Tooltip title="Resetuj filtry">
                <Button
                  sx={{ ml: 1 }}
                  size="large"
                  variant="outlined"
                  onClick={resetFilters}
                >
                  <Icon>
                    filter_list_off
                  </Icon>
                </Button>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
      )}
    </Accordion>
  )
}

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={ <Icon sx={{ color: 'black', ml: '40px' }}>filter_list</Icon> }
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper': {
    transition: 'opacity .4s',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    opacity: 0,
    transform: 'unset',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

export default Filters;
