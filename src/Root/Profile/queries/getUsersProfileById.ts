import gql from 'graphql-tag';

export default gql`
  query getUsersProfileById($id: String!) {
    getUsersProfileById(id: $id) {
      id
      username
      isDarkTheme
      isMyTheme
      myTheme {
        id
        type
        data
      }
    }
  }
`;
