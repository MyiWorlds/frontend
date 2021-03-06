import * as React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Error from '../../../components/Error';
import gql from 'graphql-tag';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ProgressWithMessage from '../../../components/ProgressWithMessage';
import Typography from '@material-ui/core/Typography';
import { ForwardButtonLink } from '../../../components/ForwardButtonLink';
import { ICreatedCircle } from '../../../../../types/circle';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

interface Props {
  circle: ICreatedCircle;
}

const GET_CIRCLES_BY_IDS = gql`
  query getCirclesByIds($ids: [String]!) {
    getCirclesByIds(ids: $ids) {
      id
      title
      type
    }
  }
`;

class GetCirclesByIds extends React.Component<Props> {
  render() {
    const { circle } = this.props;
    const ids = circle.data && circle.data.ids ? circle.data.ids : [];

    return (
      <div
        style={{
          padding: 8,
        }}
      >
        <Typography variant="h5">Get Circles By Ids</Typography>
        <Query
          query={GET_CIRCLES_BY_IDS}
          variables={{
            ids,
          }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) {
              return (
                <ProgressWithMessage
                  message="Getting Circles by Ids"
                  hideBackground={true}
                />
              );
            }
            if (error) return <Error error={error} />;
            const lines = data.getCirclesByIds;
            return (
              <>
                <List>
                  {lines.map((circle: any) => {
                    return (
                      <div key={circle.id}>
                        <ListItem
                          button
                          component={ForwardButtonLink}
                          to={`/id/${circle.id}`}
                        >
                          <ListItemText inset primary={circle.type} />
                        </ListItem>
                        <Divider />
                      </div>
                    );
                  })}
                </List>

                <div style={{ textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => refetch()}
                  >
                    Refetch
                  </Button>
                </div>
              </>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default GetCirclesByIds;
