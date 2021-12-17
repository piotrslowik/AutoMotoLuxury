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

export const getUsers = async () => {
  const query = `
  query {
    users {
      _id,
      email,
      isAdmin
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
    const data = result.data.data.users;
    if (data) return data;
    throw new Error(result.data.errors[0].message);
  }
  catch (error) {
    throw error;
  }
}

export const editUser = async (user) => {
  const query = `
    mutation {
      editUser(userEditInput:{
        _id: "${user._id}",
        email: "${user.email}",
        password: "${user.password}",
      })
      {
        user
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
    const data = result.data.data.users;
    if (data) return data;
    throw new Error(result.data.errors[0].message);
  }
  catch (error) {
    throw error;
  }
}
export const changeRole = async (userId, isAdmin) => {
  const query = `
    mutation {
      changeRole(userEditInput:{
        userId: "${userId}",
        isAdmin: ${isAdmin},
      })
      {
        _id
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
    const data = result.data.data.changeRole;
    if (data) return data;
    throw new Error(result.data.errors[0].message);
  }
  catch (error) {
    throw error;
  }
}
