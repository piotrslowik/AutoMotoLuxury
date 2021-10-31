import React, { useState, useEffect, useContext } from 'react';

import LabelledSelect from '../../Shared/Fields/LabelledSelect';
import Range from '../../Shared/Fields/Range';

import dataContext from '../../../context/data-context';
import { getModels } from '../../../logic/graphql/model';
import Button from '../../Shared/Fields/Button';

const Filters = () => {

    const { fuels, origins, makes } = useContext(dataContext);
    const [models, setModels] = useState([]);

    const [fuel, setFuel] = useState({});
    const [origin, setOrigin] = useState({});
    const [make, setMake] = useState({});
    const [model, setModel] = useState({});

    const fetchModels = async make =>{
        try {
            const models = await getModels(make.id);
            setModels(models);
        }
        catch (error) {
            throw error;
        }
    }

    const dummyObj = {
        text: 'Wszystkie',
        id: '0',
    }

    const formatArray = (arr, field) => {
        const result = arr.map(el => { return {text: el[field], id: el._id}});
        result.unshift(dummyObj);
        return result;
    }

    const formatMakeArray = (arr, field) => {
        if (origin === {} || origin.id === 0) {
            return formatArray(arr, field);
        } else {
            const filtered = arr.filter(make => make.origin._id === origin.id);
            return formatArray(filtered, field);
        }
    }
  
    const currentYear = new Date().getFullYear();

    return (
        <div className="Filters">
            <LabelledSelect label="Paliwo"
                values={formatArray(fuels, 'fuel')}
                onChange={fuel => setFuel(fuel)} />
            <LabelledSelect label="Pochodzenie"
                values={formatArray(origins, 'origin')}
                onChange={origin => setOrigin(origin)} />
            <LabelledSelect label="Marka"
                values={formatMakeArray(makes, 'make')}
                onChange={make => {
                    setMake(make)
                    fetchModels(make);
                    }} />
            <LabelledSelect label="Model"
                values={formatArray(models, 'model')}
                onChange={model => setModel(model)} />
            <Range label="Przebieg" />
            <Range label="Cena" />
            <Range label="Rocznik" min={currentYear - 100} max={currentYear} />
            <Button text="Filtruj" onClick={() => {}} />
        </div>
    )
}

export default Filters;
