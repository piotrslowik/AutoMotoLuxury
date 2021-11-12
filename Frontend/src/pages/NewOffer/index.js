import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router"
import { useTheme } from '@mui/material/styles';
import parametersActions from '../../store/actions/parameters';
import errorActions from '../../store/actions/error';

import Loader from '../../components/Shared/Loader';
import SingleSelect from '../../components/Shared/Select';
import ImageInput from '../../components/Partials/ImagesInput';
import { Card, CardContent, Grid, TextField, Typography, TextareaAutosize, Button, Alert, AlertTitle } from '@mui/material';

import { getModels } from '../../logic/graphql/model';
import { getFuels } from '../../logic/graphql/fuel';
import { getMakes } from '../../logic/graphql/make';
import { addOffer } from '../../logic/graphql/offer';


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
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(errorActions.setError({}));
    }, 4000);
  }, [error]);

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
        images.map(image => image.file)
      );
      history.push(`offer/${result._id}`);
    }
    catch (error) {
      console.error('Adding new offer failed', error);
      setIsAddingOffer(false);
      dispatch(errorActions.setError({
        visible: true,
        msg: "Nie udało się utworzyć nowej oferty."
      }));
    }
  }

  const date = new Date();

  return (
    (isAddingOffer || isLoading)
    
    ? <Loader text={ isAddingOffer ? "Dodawanie oferty..." : ""} />

    : <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" align="center" sx={{ mb: 4, fontWeight: 900 }}>
          Nowe ogłoszenie
        </Typography>
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
    </Card>
    // : <div className="NewOffer flex-column-center">
    //   <h1>Nowe ogłoszenie</h1>
    //   <div className="NewOffer-inputs flex-column-center">
    //     <div className="NewOffer-grid">
    //       <LabelledSelect values={formatArray(makes, 'make')} label="Marka" onChange={handleMakeSelect} />
    //       <LabelledSelect values={formatArray(models, 'model')} label="Model" onChange={handleModelSelect} />
    //       <LabelledInput label="Generacja" value={generation} onChange={handleGenerationInput} placeholder="np. II albo (W204)" />
    //       <LabelledSelect values={formatArray(fuels, 'fuel')} label="Paliwo" onChange={handleFuelSelect} />
    //       <LabelledInput type="number" label="Rocznik" value={year} onChange={handleYearInput} min={1900} max={date.getFullYear()} placeholder="Rok produkcji" />
    //       <LabelledInput type="number" label="Przebieg" value={kms} onChange={handleKmsInput} min={0} 
    //       placeholder="Wartość w km" />
    //       <LabelledInput type="number" label="Pojemność" value={volume} onChange={handleVolumeInput} min={1} placeholder="Wartość w cm3" />
    //       <LabelledInput type="number" label="Moc" value={power} onChange={handlePowerInput} min={0} placeholder="Wartość w KM" />
    //       <LabelledInput type="number" label="Cena" value={price} onChange={handlePriceInput} min={1} placeholder="Wartość w zł" />
    //     </div>
    //   </div>
    //   <h2>Krótki opis:</h2>
    //   <Textarea className="NewOffer__desc--short" maxlength={250} rows={3} value={shortDesc} onChange={handleShortDescInput} />
    //   <h2>Długi opis:</h2>
    //   <Textarea className="NewOffer__desc--long"  rows={10} value={longDesc} onChange={handleLongDescInput} />
    //   <ImageInput images={images.map(img => {return {src: URL.createObjectURL(img.file), id:img.id}})} onAddImage={handleAddImage} onDeleteImage={handleDeleteImage} />
    //   <Button className="NewOffer__button--add" text="Dodaj" onClick={handleAddOffer} />
    // </div>
  );
}

export default NewOffer;
