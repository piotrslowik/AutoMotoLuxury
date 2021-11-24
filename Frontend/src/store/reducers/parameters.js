const initialState = {
  fuels: [],
  origins: [],
  makes: [],
  models: [],
}

const parametersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FUELS':
      return {
        ...state,
        fuels: action.payload,
      };
    case 'SET_ORIGINS':
      return {
        ...state,
        origins: action.payload,
      };
    case 'SET_MAKES':
      return {
        ...state,
        makes: action.payload,
      };
    case 'SET_MODELS':
      return {
        ...state,
        models: action.payload,
      };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export default parametersReducer;
