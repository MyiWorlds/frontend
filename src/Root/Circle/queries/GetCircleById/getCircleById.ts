import apolloClient from '../../../../apolloClient';
import gql from 'graphql-tag';
import { FullCircleFragment } from '../FullCircleFragment';
import { ICreatedCircle } from '../../../../../types/circle';

const GET_CIRCLE_BY_ID = gql`
  query getCircleById($id: String!) {
    getCircleById(id: $id) {
      ...FullCircle
    }
  }
  ${FullCircleFragment}
`;

const getCircleById = async (
  circleId: string,
): Promise<ICreatedCircle | null> => {
  const query = await apolloClient.query({
    variables: {
      id: circleId,
    },
    query: GET_CIRCLE_BY_ID,
  });
  const circle = query.data.getCircleById;

  return circle;
};

export default getCircleById;
