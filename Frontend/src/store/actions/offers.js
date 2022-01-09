export default {
  setOffers: offers => {
    return {
      type: 'SET_OFFERS',
      payload: offers,
    };
  },
  clear: () => {
    return {
      type: 'CLEAR',
    };
  },
};