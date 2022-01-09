export default {
  setError: error => {
    return {
      type: 'SET_ERROR',
      payload: error,
    };
  },
  clear: () => {
    return {
      type: 'CLEAR',
    };
  },
};