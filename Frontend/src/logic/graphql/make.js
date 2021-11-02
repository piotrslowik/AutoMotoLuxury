import Axios from 'axios';

import { sortObjectsArrayByField } from '../helpers';

export const getMakes = async () => {
    const query = `
        query {
            makes {
                _id,
                make,
                origin {
                    _id,
                    origin
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
        let makes = result.data.data.makes;
        makes = sortObjectsArrayByField(makes, 'make');
        return makes;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}

export const deleteMake = async makeId => {
    const query = `
        mutation {
            deleteMake (makeId: "${makeId}",
            )
            {
                make
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
        return result.data.data.deleteMake.make;
    }
    catch (error) {
        console.error(error);
    }
}

export const addMake = async (make, originId) => {
    const query = `
        mutation {
            createMake (makeInput: {
                make: "${make}",
                originId: "${originId}",
            })
            {
                make,
                origin {
                    origin
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
        return result.data.data.createMake;
    }
    catch (error) {
        console.error(error);
    }
}

export const editMake = async (data = {make: '', originId: '', makeId: ''}) => {
    const query = `
        mutation {
            editMake(makeEditInput:{
                make: "${data.make}",
                originId: "${data.originId}",
                makeId: "${data.makeId}",
            })
            {
                make,
                origin {
                    origin,
                    _id,
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