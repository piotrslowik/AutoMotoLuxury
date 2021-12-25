import { LocalStorageGet } from "../../logic/helpers";

const initialState = {
  token: LocalStorageGet('token'),
  id: LocalStorageGet('userId'),
  isAdmin: LocalStorageGet('isAdmin') === "true",
  email: LocalStorageGet('email'),
  favorites: JSON.parse(LocalStorageGet('favorites')),
  loggedIn: LocalStorageGet('token') !== null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        token: LocalStorageGet('token'),
        id: LocalStorageGet('userId'),
        isAdmin: LocalStorageGet('isAdmin') === "true",
        email: LocalStorageGet('email'),
        favorites: JSON.parse(LocalStorageGet('favorites')),
        loggedIn: true,
      };
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: JSON.parse(LocalStorageGet('favorites')),
      };
    case 'CLEAR':
      return {
        token: null,
        id: null,
        email: null,
        favorites: null,
        isAdmin: false,
        loggedIn: false,
      };
    default:
      return state;
  }
}

export default userReducer;
