import Axios from 'axios';

export const createUser = async (email, pwd) => {
  const query = `
    mutation {
      createUser (userInput: {
        email: "${email}",
        password: "${pwd}",
      })
      {
        _id,
      }
    }
`;
  try {
    const result = await Axios.post('http://localhost:8000/graphql', {
      query: query,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const newUserId = result.data.data.createUser;
    if (newUserId) return newUserId;
    throw new Error(result.data.errors[0].message);
  }
  catch (error) {
    throw error;
  }
}
