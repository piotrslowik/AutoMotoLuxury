import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getFuels } from '../../../logic/graphql/fuel';
import { getOrigins } from '../../../logic/graphql/origin';
import { getMakes } from '../../../logic/graphql/make';

import parametersActions from '../../../store/actions/parameters';

import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';

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

  const dispatch = useDispatch();

  useEffect(() => {
    fetchParameters();
  }, [dispatch]);

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

  const currentYear = new Date().getFullYear();

  return (
    <Card>
      {loading ? null :(
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
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
              />
              <TextField 
                variant="outlined"
                type="number"
                value={kmsMax}
                onChange={e => setKmsMax(e.target.value)}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '0', max: '999999', "aria-autocomplete": "off" }}
                sx={{ ml: 2, flexGrow: 1 }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
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
              />
              <TextField 
                variant="outlined"
                type="number"
                value={priceMax}
                onChange={e => setPriceMax(e.target.value)}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: '0', max: '999999', "aria-autocomplete": "off" }}
                sx={{ ml: 2, flexGrow: 1 }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
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
              />
              <TextField 
                variant="outlined"
                type="number"
                value={yearMax}
                onChange={e => setYearMax(e.target.value)}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', max: currentYear.toString(), "aria-autocomplete": "off" }}
                sx={{ ml: 2, flexGrow: 1 }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 4 }}
            >
              Filtruj
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      )}
    </Card>
  )
}

export default Filters;
