import Axios from 'axios';

import { sortObjectsArrayByField } from '../helpers';

export const getModels = async makeId => {
    const query = `
        query {
            models(makeId: "${makeId}") {
                _id,
                model,
                make {
                    _id,
                    make
                }
            }
        }
    `;
    try {
        const result = await Axios.post('http://localhost:8000/graphql', {
            query: query,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let models = result.data.data.models;
        models = sortObjectsArrayByField(models, 'model');
        return models;
    }
    catch (error) {
        console.error("Could not fetch models\n", error);
    }
}

export const deleteModel = async modelId => {
    const query = `
        mutation {
            deleteModel (modelId: "${modelId}",
            )
            {
                model
            }
        }
    `;
    try {
        const result = await Axios.post('http://localhost:8000/graphql', {
            query: query,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return result.data.data.deleteModel.model;
    }
    catch (error) {
        console.error(error);
    }
}

export const addModel = async (model, makeId) => {
    const query = `
        mutation {
            createModel (modelInput: {
                model: "${model}",
                makeId: "${makeId}",
            })
            {
                model,
                make {
                    make
                },
            }
        }
    `;
    try {
        const result = await Axios.post('http://localhost:8000/graphql', {
            query: query,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return result.data.data.createModel;
    }
    catch (error) {
        console.error(error);
    }
}

export const editModel = async (data = {model: '', modelId: '', makeId: ''}) => {
    const query = `
        mutation {
            editModel(modelEditInput:{
                model: "${data.model}",
                modelId: "${data.modelId}",
                makeId: "${data.makeId}",
            })
            {
                model,
                make {
                    make,
                },
            }
        }
    `;
    try {
        const result = await Axios.post('http://localhost:8000/graphql', {
            query: query,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return result.data.data.editMake;
    }
    catch (error) {
        console.error(error);
    }
}