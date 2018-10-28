import gql from 'graphql-tag';

export default gql`
  mutation updateProfile($id: String!, $data: JSON) {
    updateProfile(id: $id, data: $data) {
      status
      message
    }
  }
`;
