export default {
  setActionPageHeader: header => {
    return {
      type: 'SET_ACTION_PAGE_HEADER',
      payload: header,
    };
  },
  clear: () => {
    return {
      type: 'CLEAR',
    };
  },
};