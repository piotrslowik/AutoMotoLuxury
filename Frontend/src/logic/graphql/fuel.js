import Axios from 'axios';

import { sortObjectsArrayByField } from '../helpers';

export const getFuels = async () => {
    const query = `
        query {
            fuels {
                fuel,
                _id,
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
        let fuels = result.data.data.fuels;
        fuels = sortObjectsArrayByField(fuels, 'fuel');
        return fuels;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}

export const deleteFuel = async fuelId => {
    const query = `
        mutation {
            deleteOrigin (fuelId: "${fuelId}",
            )
            {
                fuel
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
        return result.data.data.deleteFuel.fuel;
    }
    catch (error) {
        console.error(error);
    }
}

export const addFuel = async fuel => {
    const query = `
        mutation {
            createFuel (fuelInput: {
                fuel: "${fuel}",
            })
            {
                fuel
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
        return result.data.data.createFuel;
    }
    catch (error) {
        console.error(error);
    }
}

export const editFuel = async (fuel, fuelId) => {
    const query = `
        mutation {
            editFuel(fuelEditInput:{
                fuel: "${fuel}",
                id: "${fuelId}",
            })
            {
                fuel
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
        return result.data.data.editFuel.fuel;
    }
    catch (error) {
        console.error(error);
    }
}