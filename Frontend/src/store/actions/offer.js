export default {
  setOffer: offer => {
    return {
      type: 'SET_OFFER',
      payload: offer,
    };
  },
  clear: () => {
    return {
      type: 'CLEAR',
    };
  },
};