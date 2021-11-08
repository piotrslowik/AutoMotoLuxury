import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getFuels } from '../../../logic/graphql/fuel';
import { getOrigins } from '../../../logic/graphql/origin';
import { getMakes } from '../../../logic/graphql/make';

import parametersActions from '../../../store/actions/parameters';

import LabelledSelect from '../../Shared/Fields/LabelledSelect';
import Range from '../../Shared/Fields/Range';
import Button from '../../Shared/Fields/Button';

import { getModels } from '../../../logic/graphql/model';

const Filters = () => {
    // const { fuels, origins, makes } = useSelector(state => state.parameters);
    const fuels = useSelector(state => state.parameters.fuels);
    const origins = useSelector(state => state.parameters.origins);
    const makes = useSelector(state => state.parameters.makes);
    const [models, setModels] = useState([]);

    const [fuel, setFuel] = useState({});
    const [origin, setOrigin] = useState({});
    const [make, setMake] = useState({});
    const [model, setModel] = useState({});

    const dispatch = useDispatch();
  
    useEffect(() => {
      fetchParameters();
    }, [dispatch]);

    useEffect(() => {
        if (make.id && make.id !== dummyObj.id) {
            fetchModels(make);
        } else {
            setModels([]);
        }
    }, [make]);
  
    const fetchParameters = async () => {
      const fuels = await getFuels();
      setFuels(fuels);
      const origins = await getOrigins();
      setOrigins(origins);
      const makes = await getMakes();
      setMakes(makes);
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
        const models = await getModels(make.id);
        setModels(models);
    }

    const dummyObj = {
        text: 'Wszystkie',
        id: '0',
    }

    const formatArray = (arr, field) => {
        if (!arr) return [];
        const result = arr.map(el => { return {text: el[field], id: el._id}});
        result.unshift(dummyObj);
        return result;
    }

    const formatMakeArray = (arr, field) => {
        if (!origin.id || origin.id === 0) {
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
