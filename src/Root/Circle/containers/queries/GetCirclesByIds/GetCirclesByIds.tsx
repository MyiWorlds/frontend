import * as React from 'react';
import Error from '../../../../components/Error';
import gql from 'graphql-tag';
import ProgressWithMessage from '../../../../components/ProgressWithMessage';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

interface Props {
  ids: string[];
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
    const { ids } = this.props;
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
                          component={(props: any) => (
                            <Link {...props} to={`/id/${circle.id}`} />
                          )}
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
