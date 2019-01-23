import gql from 'graphql-tag';
import { FullCircleFragment } from '../../../queries/FullCircleFragment';

export default gql`
  mutation updateCircle($circle: JSON!, $merge: Boolean!) {
    updateCircle(circle: $circle, merge: $merge) {
      status
      message
      updatedCircle {
        ...FullCircle
      }
    }
  }
  ${FullCircleFragment}
`;
