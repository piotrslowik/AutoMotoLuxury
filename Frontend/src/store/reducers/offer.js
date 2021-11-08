const initialState = {
  id: '',
  make: '',
  model: '',
  generation: '',
  fuel: '',
  year: 0,
  kms: 0,
  volume: 0,
  power: 0,
  price: 0,
  shortDescription: '',
  longDescription: '',
  photos: [],
  date: '',
  creator: {},
}

const offerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_OFFER':
      return action.payload;
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export default offerReducer;
