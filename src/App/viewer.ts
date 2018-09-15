import gql from 'graphql-tag';

export default gql`
  query viewer {
    viewer {
      username
      email
      id
      dateCreated
    }
  }
`;
