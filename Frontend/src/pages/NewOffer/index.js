import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router"

import LabelledSelect from '../../components/Shared/Fields/LabelledSelect';
import LabelledInput from '../../components/Shared/Fields/LabelledInput';
import Button from '../../components/Shared/Fields/Button';
import Textarea from '../../components/Shared/Fields/Textarea';

import Loader from '../../components/Shared/Loader';

import ImageInput from '../../components/Partials/ImagesInput';

import { getModels } from '../../logic/graphql/model';
import { addOffer } from '../../logic/graphql/offer';
import { isObjectEmpty } from '../../logic/helpers';

import dataContext from '../../context/data-context';

const NewOffer = () => {

    const history = useHistory();

    const { fuels, makes } = useContext(dataContext);

    const [make, setMake] = useState({});
    const [models, setModels] = useState([{text: 'Wybierz markę', id: 'id'}]);
    const [model, setModel] = useState({});
    const [generation, setGeneration] = useState('');
    const [fuel, setFuel] = useState({});
    const [year, setYear] = useState(null);
    const [kms, setKms] = useState(null);
    const [volume, setVolume] = useState(null);
    const [power, setPower] = useState(null);
    const [price, setPrice] = useState(null);
    const [shortDesc, setShortDesc] = useState('');
    const [longDesc, setLongDesc] = useState('');
    const [images, setImages] = useState([]);
    const [isAddingOffer, setIsAddingOffer] = useState(false);
 
    useEffect(() => {
        fetchModels(make)
    }, [make]);

    const fetchModels = async make => {
        if (!isObjectEmpty(make)) {
            const models = await getModels(make.id);
            setModels(models);
        }
    };

    const formatArray = (arr, field) => {
        const newArr = arr.map(el => {return {
            text: el[field],
            id: el._id,
        }});
        newArr.unshift({
            text: 'Wybierz',
            id: 0,
        });
        return newArr;
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
                make.id,
                model.id,
                generation,
                fuel.id,
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
        }
    }

    const date = new Date();

    return (
        (isAddingOffer)
        
        ? <Loader text="Dodawanie oferty..." />

        : <div className="NewOffer flex-column-center">
            <h1>Nowe ogłoszenie</h1>
            <div className="NewOffer-inputs flex-column-center">
                <div className="NewOffer-grid">
                    <LabelledSelect values={formatArray(makes, 'make')} label="Marka" onChange={handleMakeSelect} />
                    <LabelledSelect values={formatArray(models, 'model')} label="Model" onChange={handleModelSelect} />
                    <LabelledInput label="Generacja" value={generation} onChange={handleGenerationInput} placeholder="np. II albo (W204)" />
                    <LabelledSelect values={formatArray(fuels, 'fuel')} label="Paliwo" onChange={handleFuelSelect} />
                    <LabelledInput type="number" label="Rocznik" value={year} onChange={handleYearInput} min={1900} max={date.getFullYear()} placeholder="Rok produkcji" />
                    <LabelledInput type="number" label="Przebieg" value={kms} onChange={handleKmsInput} min={0} 
                    placeholder="Wartość w km" />
                    <LabelledInput type="number" label="Pojemność" value={volume} onChange={handleVolumeInput} min={1} placeholder="Wartość w cm3" />
                    <LabelledInput type="number" label="Moc" value={power} onChange={handlePowerInput} min={0} placeholder="Wartość w KM" />
                    <LabelledInput type="number" label="Cena" value={price} onChange={handlePriceInput} min={1} placeholder="Wartość w zł" />
                </div>
            </div>
            <h2>Krótki opis:</h2>
            <Textarea className="NewOffer__desc--short" maxlength={250} rows={3} value={shortDesc} onChange={handleShortDescInput} />
            <h2>Długi opis:</h2>
            <Textarea className="NewOffer__desc--long"  rows={10} value={longDesc} onChange={handleLongDescInput} />
            <ImageInput images={images.map(img => {return {src: URL.createObjectURL(img.file), id:img.id}})} onAddImage={handleAddImage} onDeleteImage={handleDeleteImage} />
            <Button className="NewOffer__button--add" text="Dodaj" onClick={handleAddOffer} />
        </div>
    )
}

export default NewOffer;
