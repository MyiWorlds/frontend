import * as React from 'react';
import client from '../../../../../apolloClient';
import Error from 'src/Root/components/Error';
import gql from 'graphql-tag';
import ProgressWithMessage from 'src/Root/components/ProgressWithMessage';
import { ApolloError } from 'apollo-client';
import { Link } from 'react-router-dom';
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
  error: ApolloError | null;
  filters: IFilter[];
  lines: ICircle[];
  loading: boolean;
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
      lines: [],
      error: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.getCirclesByFilters();
  }

  getCirclesByFilters = () => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { settings } = this.props.circle;
        const state = this.state;

        try {
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
            lines: query.data.getCirclesByFilters.lines,
            loading: false,
          });
        } catch (error) {
          this.setState({ error: error, loading: false });
        }
      },
    );
  };

  handleNumberOfResultsChange = (numberOfResults: number) => {
    if (numberOfResults < 0) {
      numberOfResults = 0;
    } else if (numberOfResults > 99) {
      numberOfResults = 99;
    }
    this.setState({
      numberOfResults,
    });
  };

  render() {
    const {
      showSearchSettings,
      numberOfResults,
      error,
      loading,
      lines,
    } = this.state;
    const { classes } = this.props;

    if (error) return <Error error={error} />;

    if (loading) {
      return <ProgressWithMessage message="Searching" hideBackground={true} />;
    }

    if (!lines) {
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
            <IconButton
              aria-label="Refetch"
              onClick={() => this.getCirclesByFilters()}
            >
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
                  onChange={event =>
                    this.handleNumberOfResultsChange(Number(event.target.value))
                  }
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Collapse>
        </AppBar>

        {lines ? (
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
        ) : null}
      </Card>
    );
  }
}

export default withStyles(styles)(GetCirclesByFilters);
