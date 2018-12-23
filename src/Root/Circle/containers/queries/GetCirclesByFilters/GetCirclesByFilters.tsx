import * as React from 'react';
import client from '../../../../../apolloClient';
import Error from 'src/Root/components/Error';
import gql from 'graphql-tag';
import ProgressWithMessage from 'src/Root/components/ProgressWithMessage';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import {
  AppBar,
  Card,
  Collapse,
  Divider,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Theme,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';

interface Props {
  selectedProfile: ISelectedProfile;
  circle: ICircle;
  classes: {
    spacer: string;
  };
}

interface State {
  numberOfResults: number;
  showSearchSettings: boolean;
  filters: [IFilter];
  circles: ICircle[];
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

const styles = (theme: Theme) => ({
  avatar: {},
  spacer: {
    flexGrow: 1,
  },
});

class GetCirclesByFilters extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      filters: this.props.circle.settings.filters,
      numberOfResults: this.props.circle.settings.numberOfResults,
      showSearchSettings: false,
      circles: [],
    };
  }

  componentDidMount() {
    this.getCirclesByFilters();
  }

  getCirclesByFilters = async () => {
    const { settings } = this.props.circle;
    const state = this.state;
    const query: any = await client.query({
      query: GET_CIRCLES_BY_FILTERS,
      fetchPolicy: 'no-cache',
      variables: {
        filters: state.filters,
        orderBy: settings.orderBy,
        numberOfResults: state.numberOfResults,
        cursor: settings.cursor,
      },
    });

    this.setState({
      circles: query.data.getCirclesByFilters,
    });
  };

  handleTextChange = (name: string) => event => {
    this.setState({
      [name]: event.currentTarget.value,
    } as any);
  };

  render() {
    const { showSearchSettings, numberOfResults } = this.state;
    const { classes } = this.props;

    return (
      <Query query={GET_CIRCLES_BY_FILTERS} variables={{}}>
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
            <Card>
              <AppBar position="static" color="inherit">
                <Toolbar>
                  <Typography variant="h5">{listTitle}</Typography>
                  <div className={classes.spacer} />
                  <IconButton aria-label="Refetch" onClick={() => refetch()}>
                    <Icon>refresh</Icon>
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      this.setState({
                        showSearchSettings: !showSearchSettings,
                      })
                    }
                  >
                    <Icon>settings</Icon>
                  </IconButton>
                </Toolbar>
                <Collapse in={showSearchSettings}>
                  <Grid container spacing={16}>
                    <Grid item>
                      <TextField
                        id="number-of-results"
                        label="Number of Results"
                        // className={classes.textField}
                        value={numberOfResults}
                        type="number"
                        onChange={this.handleTextChange('numberOfResults')}
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </Collapse>
              </AppBar>

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
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(GetCirclesByFilters);
