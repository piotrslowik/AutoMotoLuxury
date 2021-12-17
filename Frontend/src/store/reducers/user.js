import { LocalStorageGet } from "../../logic/helpers";

const initialState = {
  token: LocalStorageGet('token'),
  id: LocalStorageGet('userId'),
  isAdmin: LocalStorageGet('isAdmin') === "true",
  loggedIn: LocalStorageGet('token') !== null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        token: LocalStorageGet('token'),
        id: LocalStorageGet('userId'),
        isAdmin: LocalStorageGet('isAdmin') === "true",
        loggedIn: true,
      };
    case 'CLEAR':
      return {
        token: null,
        id: null,
        isAdmin: false,
        loggedIn: false,
      };
    default:
      return state;
  }
}

export default userReducer;
