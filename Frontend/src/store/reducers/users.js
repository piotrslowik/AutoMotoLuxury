const initialState = {
  users: [],
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        users: action.payload,
      };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export default usersReducer;
