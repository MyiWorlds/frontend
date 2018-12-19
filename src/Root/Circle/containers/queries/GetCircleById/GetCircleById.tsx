import * as React from 'react';
import Circle from '../../../Circle';
import Error from '../../../../../Root/components/Error';
import gql from 'graphql-tag';
import ProgressWithMessage from 'src/Root/components/ProgressWithMessage';
import { FullCircleFragment } from '../FullCircleFragment';
import { Location } from 'history';
import { Query } from 'react-apollo';

interface Props {
  id: string;
  location?: Location;
  selectedProfile: ISelectedProfile;
}

const GET_CIRCLE_BY_ID = gql`
  query getCircleById($id: String!) {
    getCircleById(id: $id) {
      id
      title
      ...FullCircle
    }
  }
  ${FullCircleFragment}
`;

class GetCircleById extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <Query
        query={GET_CIRCLE_BY_ID}
        variables={{
          id: this.props.id,
        }}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return (
              <ProgressWithMessage
                message="Getting Circle"
                hideBackground={true}
              />
            );
          }
          if (error) return <Error error={error} />;
          const circle = data.getCircleById;
          const { selectedProfile } = this.props;
          if (!circle) return null;

          return (
            <div
              style={{
                border: '1px solid lightgrey',
                borderRadius: 8,
                margin: 8,
                padding: 8,
              }}
            >
              <Circle circle={circle} selectedProfile={selectedProfile} />
              <br />
              <button onClick={() => refetch()}>Refetch</button>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default GetCircleById;
// export default withStyles(styles: object)(GetCircleById);
