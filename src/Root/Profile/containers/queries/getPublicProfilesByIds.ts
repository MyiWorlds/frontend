import gql from 'graphql-tag';

export default gql`
  query getProfilesByIds($ids: [String]!) {
    getProfilesByIds(ids: $ids) {
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
