const initialState = {
  adminPageHeader: '',
  snackbar: {
    open: false,
    message: '',
    time: 3000,
    type: '',
  }
}

const helpersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTION_PAGE_HEADER':
      return {
        ...state,
        adminPageHeader: action.payload,
      };
    case 'SET_SNACKBAR':
      return {
        ...state,
        snackbar: {
          ...initialState.snackbar,
          ...action.payload,
          open: true,
        },
      };
    case 'RESET_SNACKBAR':
      return {
        ...state,
        snackbar: initialState.snackbar,
      };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export default helpersReducer;
