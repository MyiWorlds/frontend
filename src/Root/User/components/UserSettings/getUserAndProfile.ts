import gql from 'graphql-tag';

const GET_USER_AND_PROFILE = gql`
  {
    user {
      id
      dateCreated
      dateUpdated
      email
      profiles {
        id
        public
        username
        canCreate
        profileMedia {
          id
          data
        }
        dateCreated
        dateUpdated
        level {
          id
          data
        }
        rating {
          id
          data
        }
        isDarkTheme
        circleTypeOverrides {
          id
          data
        }
        overrideCircleTypes
        myTheme {
          id
          data
        }
        homePublic {
          id
          data
        }
        home {
          id
          data
        }
        following {
          id
          data
        }
        history {
          id
          data
        }
      }
    }
  }
`;

export default GET_USER_AND_PROFILE;
