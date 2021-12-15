import Axios from 'axios';

import { LocalStorageSave } from '../../logic/helpers';

export const createUser = async (email, pwd) => {
  const query = `
    mutation {
      createUser (userInput: {
        email: "${email}",
        password: "${pwd}",
      })
      {
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
    const newUserId = result.data.data.createUser;
    if (newUserId) return newUserId;
    throw new Error(result.data.errors[0].message);
  }
  catch (error) {
    throw error;
  }
}

export const login = async (email, pwd) => {
  const query = `
    query {
      login (
        email: "${email}",
        password: "${pwd}",
      )
      {
        userId,
        token,
        isAdmin,
        tokenExpiration,
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
    const data = result.data.data.login;
    if (data) {
      LocalStorageSave('userId', data.userId);
      LocalStorageSave('token', data.token);
      LocalStorageSave('isAdmin', data.isAdmin);
    } else {
      throw new Error(result.data.errors[0].message);
    }
  }
  catch (error) {
    throw error;
  }
}
