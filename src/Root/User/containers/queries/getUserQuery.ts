import gql from 'graphql-tag';

export default gql`
  query {
    networkStatus @client {
      isConnected
    }
    user {
      email
      id
      profiles {
        id
        username
      }
    }
  }
`;
