import gql from 'graphql-tag';

export default gql`
  query user {
    user {
      email
      id
      selectedProfile {
        id
      }
      profiles {
        id
        username
      }
    }
  }
`;
