import gql from 'graphql-tag';

export default gql`
  query getProfileById($id: String!) {
    getProfileById(id: $id) {
      id
      username
      dateCreated
      dateUpdated
      homePublic {
        id
      }
    }
  }
`;
