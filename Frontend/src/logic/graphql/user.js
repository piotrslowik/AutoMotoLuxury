import Axios from 'axios';

export const createUser = async (email, pwd) => {
  const query = `
    mutation {
      createUser (userInput: {
        email: "${email}",
        password: "${pwd}",
      })
      {
        __typename
        ... on User
        {
          _id
        }
        ... on Error
        {
          message
        }
        ... on Errors
        {
          errors
          {
            message,
            path,
          }
        }
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
    console.log(result.data.data);
    //return result.data.data.createUser;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}
