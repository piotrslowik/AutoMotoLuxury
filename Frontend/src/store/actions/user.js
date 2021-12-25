export default {
  setUser: () => {
    return {
      type: 'SET_USER',
    };
  },
  setFavorites: () => {
    return {
      type: 'SET_FAVORITES',
    }
  },
  clear: () => {
    return {
      type: 'CLEAR',
    };
  },
}
