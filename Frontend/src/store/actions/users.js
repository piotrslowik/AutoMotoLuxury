export default {
  setUsers: users => {
    return {
      type: 'SET_USERS',
      payload: users,
    };
  },
  clear: () => {
    return {
      type: 'CLEAR',
    };
  },
}
