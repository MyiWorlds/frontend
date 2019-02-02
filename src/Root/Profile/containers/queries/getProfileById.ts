import gql from 'graphql-tag';

export default gql`
  query getProfileById($id: String!) {
    getProfileById(id: $id) {
      id
      username
      isDarkTheme
      isMyTheme
      addToHistory
      history {
        id
      }
      myTheme {
        id
        type
        data
      }
      home {
        id
      }
      homePublic {
        id
      }
    }
  }
`;
