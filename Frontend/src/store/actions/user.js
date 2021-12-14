export default {
  setUser: user => {
    return {
      type: 'SET_USER',
      payload: user,
    };
  },
  clear: () => {
    return {
      type: 'CLEAR',
    };
  },
}
