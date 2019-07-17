import client from '../../../apolloClient';
import gql from 'graphql-tag';

export interface CloneCircleResponse {
  message: string;
  clonedCircleId: string;
}

const CLONE_CIRCLE = gql`
  mutation cloneCircle($id: String) {
    cloneCircle(id: $id) {
      message
      clonedCircleId
    }
  }
`;

const cloneCircle = async (
  circleToCloneId: string,
): Promise<CloneCircleResponse> => {
  const cloneCircle = await client.mutate({
    variables: {
      id: circleToCloneId,
    },
    mutation: CLONE_CIRCLE,
  });
  const { clonedCircleId, message } = cloneCircle.data.cloneCircle;

  return { clonedCircleId, message };
};

export default cloneCircle;
