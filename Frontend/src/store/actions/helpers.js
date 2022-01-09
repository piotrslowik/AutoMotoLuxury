export default {
  setActionPageHeader: header => {
    return {
      type: 'SET_ACTION_PAGE_HEADER',
      payload: header,
    };
  },
  setSnackbar: snackbar => {
    return {
      type: 'SET_SNACKBAR',
      payload: snackbar,
    };
  },
  resetSnackbar: () => {
    return {
      type: 'RESET_SNACKBAR',
    };
  },
  clear: () => {
    return {
      type: 'CLEAR',
    };
  },
};