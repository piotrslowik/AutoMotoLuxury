export default {
  setMakes: makes => {
    return {
      type: 'SET_MAKES',
      payload: makes,
    };
  },
  setFuels: fuels => {
    return {
      type: 'SET_FUELS',
      payload: fuels,
    };
  },
  setOrigins: origins => {
    return {
      type: 'SET_ORIGINS',
      payload: origins,
    };
  },
  clear: () => {
    return {
      type: 'CLEAR',
    };
  },
};