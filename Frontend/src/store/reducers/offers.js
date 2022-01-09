const initialState = [];

const offersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_OFFERS':
      return action.payload;
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export default offersReducer;
