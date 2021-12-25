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
        user {
          _id,
          isAdmin,
          email,
          observedOffers {
            _id,
          },
        },
        token,
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
      LocalStorageSave('userId', data.user._id);
      LocalStorageSave('token', data.token);
      LocalStorageSave('isAdmin', data.user.isAdmin);
      LocalStorageSave('favorites', JSON.stringify(data.user.observedOffers));
      LocalStorageSave('email', data.user.email);
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
export const toggleFavoriteOffer = async (userId, offerId) => {
  const query = `
    mutation {
      toggleFavoriteOffer(favoritesInput: {
        userId: "${userId}",
        offerId: "${offerId}",
      })
      {
        _id,
        observedOffers
        {
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
    const favoriteOffers = result.data.data.toggleFavoriteOffer;
    if (favoriteOffers) LocalStorageSave('favorites', JSON.stringify(favoriteOffers.observedOffers));
    else throw new Error(result.data.errors[0].message);
  }
  catch (error) {
    throw error;
  }
}
