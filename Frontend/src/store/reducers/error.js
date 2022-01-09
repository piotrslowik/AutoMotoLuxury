const initialState = {
  visible: false,
  msg: '',
}

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.payload;
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export default errorReducer;
