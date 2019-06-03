import * as React from 'react';
import Error from '../../../components/Error';
import gql from 'graphql-tag';
import ProgressWithMessage from '../../../components/ProgressWithMessage';
import Typography from '@material-ui/core/Typography';
import { Query } from 'react-apollo';
interface Props {
  username: string;
}

const GET_CIRCLE_BY_PROFILE_USERNAME = gql`
  query getCircleByProfileUsername($username: String!) {
    getCircleByProfileUsername(username: $username) {
      id
      title
    }
  }
`;

class GetCircleByProfileUsername extends React.Component<Props> {
  render() {
    const { username } = this.props;
    return (
      <Query
        query={GET_CIRCLE_BY_PROFILE_USERNAME}
        variables={{
          username: username,
        }}
      >
        {({ loading, error, data, refetch }) => {
          if (loading)
            return (
              <ProgressWithMessage
                message="Getting Users Public Profile"
                hideBackground={true}
              />
            );
          if (error) return <Error error={error} />;
          const circle = data.getCircleByProfileUsername;

          if (!circle) return <div>None</div>;

          return (
            <div>
              <Typography variant="body1">{username}</Typography>
              <Typography variant="body1">{circle.id}</Typography>
              <br />
              <button onClick={() => refetch()}>Refetch</button>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default GetCircleByProfileUsername;
