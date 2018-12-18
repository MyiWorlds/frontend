import * as React from 'react';
import apolloClient from '../../../..//apolloClient';
import Error from 'src/Root/components/Error';
import gql from 'graphql-tag';
import ProgressWithMessage from 'src/Root/components/ProgressWithMessage';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import {
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';

interface Props {
  selectedProfile: SelectedProfile;
  circle: Circle;
}

interface State {
  circle: any;
  lines: any[];
}

const GET_CIRCLES_BY_FILTERS = gql`
  query getCirclesByFilters(
    $filters: JSON!
    $numberOfResults: Int
    $cursor: JSON
    $orderBy: JSON!
  ) {
    getCirclesByFilters(
      filters: $filters
      numberOfResults: $numberOfResults
      cursor: $cursor
      orderBy: $orderBy
    ) {
      id
      title
      settings
      lines {
        id
        title
        type
        settings
        creator {
          id
          username
        }
      }
    }
  }
`;

class GetCirclesByFilters extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      circle: props.circle,
      lines: [],
    };
    // this.getData();
  }

  getData = async () => {
    const settings = this.props.circle.settings;

    const results: any = await apolloClient.query({
      query: GET_CIRCLES_BY_FILTERS,
      fetchPolicy: 'no-cache',
      variables: {
        filters: settings.filters,
        orderBy: settings.orderBy,
        numberOfResults: settings.numberOfResults,
        cursor: settings.cursor,
      },
    });

    this.setState({
      circle: results.data.getCirclesByFilters,
    });
  };

  render() {
    const { settings } = this.props.circle;

    return (
      <Query
        query={GET_CIRCLES_BY_FILTERS}
        variables={{
          filters: settings.filters,
          orderBy: settings.orderBy,
          numberOfResults: settings.numberOfResults,
          cursor: settings.cursor,
        }}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return (
              <ProgressWithMessage
                message="Getting Account"
                hideBackground={true}
              />
            );
          }

          if (error) return <Error error={error} />;

          const circle = data.getCirclesByFilters;

          if (!circle) {
            // Create default circle for no results (some shortcut to bring out list finding options)
            return <Typography variant="h3">No Results</Typography>;
          }

          const listTitle = this.props.circle.title || 'Get Circles by Filters';
          return (
            <div
              style={{
                border: '1px solid lightgrey',
                borderRadius: 8,
                margin: 8,
                padding: 8,
              }}
            >
              <div>
                <Typography variant="h3">{listTitle}</Typography>
                <br />
                {circle.lines ? (
                  <List>
                    {circle.lines.map((circle: any) => {
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
                ) : null}
                <IconButton aria-label="Refetch" onClick={() => refetch()}>
                  <Icon>refresh</Icon>
                </IconButton>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default GetCirclesByFilters;
