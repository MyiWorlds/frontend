import gql from 'graphql-tag';

export default gql`
  query getProfileByUsername($username: String!) {
    getProfileByUsername(username: $username) {
      usernameAvailable
      usernameInvalid
    }
  }
`;
