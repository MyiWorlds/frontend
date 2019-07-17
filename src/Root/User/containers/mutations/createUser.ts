import gql from 'graphql-tag';

export default gql`
  mutation createUser($id: ID!, $email: String!) {
    createUser(id: $id, email: $email) {
      status
      message
    }
  }
`;
