import Axios from 'axios';

import { sortObjectsArrayByField, makeObjectLast } from '../helpers';

export const getOrigins = async () => {
    const query = `
        query {
            origins {
                origin,
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
        let origins = result.data.data.origins;
        origins = sortObjectsArrayByField(origins, 'origin');
        origins = makeObjectLast(origins, 'origin', 'Inne');
        return origins;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}

export const deleteOrigin = async originId => {
    const query = `
        mutation {
            deleteOrigin (originId: "${originId}",
            )
            {
                origin
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
        return result.data.data.deleteOrigin.origin;
    }
    catch (error) {
        console.error(error);
    }
}

export const addOrigin = async origin => {
    const query = `
        mutation {
            createOrigin (originInput: {
                origin: "${origin}",
            })
            {
                origin
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
        return result.data.data.createOrigin;
    }
    catch (error) {
        console.error(error);
    }
}

export const editOrigin = async (origin, originId) => {
    const query = `
        mutation {
            editOrigin(originEditInput:{
                origin: "${origin}",
                id: "${originId}",
            })
            {
                origin
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
        return result.data.data.editOrigin.origin;
    }
    catch (error) {
        console.error(error);
    }
}