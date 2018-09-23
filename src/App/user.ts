import gql from 'graphql-tag';

export default gql`
  query user {
    user {
      email
      id
      dateCreated
      profiles {
        username
        dateCreated
        id
      }
    }
  }
`;
