import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router"
import { useTheme } from '@mui/material/styles';
import parametersActions from '../../../store/actions/parameters';
import errorActions from '../../../store/actions/error';
import helpersActions from '../../../store/actions/helpers';

import Loader from '../../../components/Shared/Loader';
import SingleSelect from '../../../components/Shared/Select';
import ImageInput from '../../../components/Partials/ImagesInput';
import { Card, CardContent, Grid, TextField, Typography, TextareaAutosize, Button, Alert, AlertTitle } from '@mui/material';

import { getModels } from '../../../logic/graphql/model';
import { getFuels } from '../../../logic/graphql/fuel';
import { getMakes } from '../../../logic/graphql/make';
import { addOffer } from '../../../logic/graphql/offer';


const NewOffer = () => {
  const theme = useTheme();

  const history = useHistory();

  const { fuels, makes } = useSelector(state => state.parameters);
  const error = useSelector(state => state.error);

  const [models, setModels] = useState([{model: 'Wybierz markę', _id: '0'}]);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('0');
  const [generation, setGeneration] = useState('');
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(0);
  const [kms, setKms] = useState(0);
  const [volume, setVolume] = useState(0);
  const [power, setPower] = useState(0);
  const [price, setPrice] = useState(0);
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [images, setImages] = useState([]);
  const [isAddingOffer, setIsAddingOffer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (make) setModel('');
    fetchModels(make);
  }, [make]);

  useEffect(() => {
    setPageHeader();
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(errorActions.setError({}));
    }, 4000);
  }, [error]);

  const setPageHeader = () => {
    dispatch(helpersActions.setActionPageHeader("Nowe ogłoszenie"));
  }

  const fetchModels = async make => {
    if (make !== '') {
      const models = await getModels(make);
      setModels(models);
    }
  };

  const fetchData = () => {
    const fuelsPromise = getFuels();
    const makesPromise = getMakes();
    Promise.all([fuelsPromise, makesPromise])
      .then(values => {
        setFuels(values[0]);
        setMakes(values[1]);
        setIsLoading(false);
      });
  }

  const setFuels = param => {
    dispatch(parametersActions.setFuels(param));
  }
  const setMakes = param => {
    dispatch(parametersActions.setMakes(param));
  }

  const formatArray = (arr, field) => {
    return arr.map(el => {return {
      text: el[field],
      id: el._id,
    }});
  }

  const handleMakeSelect = make => {
    setMake(make);
  }
  const handleModelSelect = model => {
    setModel(model);
  }
  const handleGenerationInput = event => {
    setGeneration(event.target.value);
  }
  const handleFuelSelect = fuel => {
    setFuel(fuel);
  }
  const handleYearInput = event => {
    setYear(event.target.value);
  }
  const handleKmsInput = event => {
    setKms(event.target.value);
  }
  const handleVolumeInput = event => {
    setVolume(event.target.value);
  }
  const handlePowerInput = event => {
    setPower(event.target.value);
  }
  const handlePriceInput = event => {
    setPrice(event.target.value);
  }
  const handleShortDescInput = event => {
    setShortDesc(event.target.value);
  }
  const handleLongDescInput = event => {
    setLongDesc(event.target.value);
  }
  const handleAddImage = file => {
    const newImages = images.map(el => el);
    const newImage = {
      file: file,
      id: Date.now(),
    }
    newImages.push(newImage);
    setImages(newImages);
  }
  const handleDeleteImage = id => {
    const newImages = images.filter(image => image.id !== id);
    setImages(newImages);
  }
  const handleAddOffer = async () => {
    try {
      const folderName = createFolderName();
      setIsAddingOffer(true);
      const result = await addOffer(
        make,
        model,
        generation,
        fuel,
        year,
        kms,
        volume,
        power,
        price,
        shortDesc,
        longDesc,
        folderName,
        images.map(image => image.file)
      );
     history.push(`/offer/${result._id}`);
    }
    catch (error) {
      console.error('Adding new offer failed\n', error);
      setIsAddingOffer(false);
      dispatch(errorActions.setError({
        visible: true,
        msg: "Nie udało się utworzyć nowej oferty."
      }));
    }
  }
  const createFolderName = () => {
    const makeName = makes.find(m => m._id === make).make;
    const modelName = models.find(m => m._id === model).model;
    return `${makeName}_${modelName.replaceAll(' ', '_')}_${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}_${date.getHours()}:${date.getMinutes()}`;
  }

  const date = new Date();

  return (
    (isAddingOffer || isLoading)
    
    ? <Loader text={ isAddingOffer ? "Dodawanie oferty..." : ""} />

    : <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {error.visible
        ? <Alert severity="error" sx={{ marginBottom: 4, width: '100%'}}>
            <AlertTitle>Błąd</AlertTitle>
            { error.msg }
          </Alert>
        : null      
        }
        <Grid container columnSpacing={8} rowSpacing={4} maxWidth={1200}>
          <Grid item xs={12} sm={6} md={4}>
            <SingleSelect
              items={formatArray(makes, 'make')}
              value={make}
              onChange={handleMakeSelect}
              label="Marka"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SingleSelect
              items={formatArray(models, 'model')}
              value={model}
              onChange={handleModelSelect}
              label="Model"
              disabled={make === ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              value={generation}
              onChange={handleGenerationInput}
              label="Generacja"
              placeholder="np. II albo W204"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <SingleSelect
              items={formatArray(fuels, 'fuel')}
              value={fuel}
              onChange={handleFuelSelect}
              label="Paliwo"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              value={year}
              onChange={handleYearInput}
              label="Rocznik"
              placeholder="Rok produkcji"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              value={kms}
              onChange={handleKmsInput}
              label="Przebieg"
              placeholder="Wartość w km"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              value={volume}
              onChange={handleVolumeInput}
              label="Pojemność"
              placeholder="Wartość w cm3"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              value={power}
              onChange={handlePowerInput}
              label="Moc"
              placeholder="Wartość w KM"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              value={price}
              onChange={handlePriceInput}
              label="Cena"
              placeholder="Wartość w PLN"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              Krótki opis
            </Typography>
            <TextareaAutosize
              placeholder="Krótki opis"
              style={{ width: '100%', fontSize: theme.typography.fontSize + 4, fontFamily: theme.typography.fontFamily, padding: 12, marginTop: 4 }}
              value={shortDesc}
              onChange={handleShortDescInput}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              Długi opis
            </Typography>
            <TextareaAutosize
              placeholder="Długi opis"
              style={{ width: '100%', fontSize: theme.typography.fontSize + 4, fontFamily: theme.typography.fontFamily, padding: 12, marginTop: 4 }}
              value={longDesc}
              minRows={3}
              onChange={handleLongDescInput}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageInput
              images={images.map(img => {return {src: URL.createObjectURL(img.file), id:img.id}})}
              onAddImage={handleAddImage}
              onDeleteImage={handleDeleteImage}
            />
          </Grid>
          <Grid item xs={2} sm={3} md={4} />
          <Grid item xs={8} sm={6} md={4}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              onClick={handleAddOffer}
            >
              Dodaj
            </Button>
          </Grid>
          <Grid item xs={2} sm={3} md={4} />
        </Grid>
      </CardContent>
  );
}

export default NewOffer;
