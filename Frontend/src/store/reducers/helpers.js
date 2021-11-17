const initialState = {
  adminPageHeader: '',
}

const helpersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTION_PAGE_HEADER':
      return {
        ...state,
        adminPageHeader: action.payload,
      };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export default helpersReducer;
