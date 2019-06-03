import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import client from '../../../../apolloClient';
import Collapse from '@material-ui/core/Collapse';
import Error from '../../../components/Error';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemC from './ListItem/ListItemC';
import makeTypeHumanReadable from '../../functions/makeTypeHumanReadable';
import ProgressWithMessage from '../../../components/ProgressWithMessage';
import Slider from '@material-ui/lab/Slider';
import Spacer from '../../../components/Spacer';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ApolloError } from 'apollo-client';
import { ICreatedCircle, IFilter } from '../../../../../types/circle';
import { IProfile } from '../../../../../types/profile';
import { Query } from 'react-apollo';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles } from '@material-ui/styles';

interface Props {
  selectedProfile: IProfile;
  circle: ICreatedCircle;
  classes: {
    slider: string;
    sliderTextField: string;
    sliderTextContainer: string;
    gridContainer: string;
    centerOption: string;
    listTitle: string;
  };
}

interface State {
  numberOfResults: number;
  showSearchSettings: boolean;
  error: ApolloError | null;
  filters: IFilter[];
  selectFields: string[];
  lines: ICreatedCircle[];
  loading: boolean;
  orderBy: {
    property: string;
    ascending: boolean;
  };
}

interface GetInterfacedCirclesByFilters {
  searchTimeout: any;
}

const GET_CIRCLES_BY_FILTERS = gql`
  query getCirclesByFilters(
    $filters: JSON!
    $numberOfResults: Int
    $cursor: JSON
    $orderBy: JSON!
    $selectFields: [String]
  ) {
    getCirclesByFilters(
      filters: $filters
      numberOfResults: $numberOfResults
      cursor: $cursor
      orderBy: $orderBy
      selectFields: $selectFields
    ) {
      id
      title
      data
      lines {
        id
        data
        title
        type
      }
    }
  }
`;

const GET_INTERFACED_CIRCLE = gql`
  query getCircleById($id: String!) {
    getCircleById(id: $id) {
      title
    }
  }
`;

const GET_INTERFACED_PROFILE = gql`
  query getProfileById($id: String!) {
    getProfileById(id: $id) {
      username
    }
  }
`;

const styles = (theme: Theme) => ({
  avatar: {},
  gridContainer: {
    maxWidth: '100%',
    margin: 0,
  },
  sliderTextContainer: {
    display: 'flex',
  },
  slider: {
    padding: '22px 0px',
    minWidth: 200,
  },
  sliderTextField: {
    marginTop: 5,
    marginLeft: theme.spacing(2),
    width: 100,
  },
  centerOption: {
    marginTop: theme.spacing(2),
  },
  listTitle: {
    width: '100%',
  },
});

const maxAllowableNumberOfResults = 99;

class GetInterfacedCirclesByFilters extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const {
      filters,
      numberOfResults,
      orderBy,
      selectFields,
    } = this.props.circle.data;

    this.state = {
      filters,
      selectFields,
      numberOfResults,
      orderBy,
      showSearchSettings: false,
      lines: [],
      error: null,
      loading: false,
    };
    this.searchTimeout = 0;
  }

  componentDidMount() {
    this.getCirclesByFilters();
  }

  componentWillUnmount() {
    clearTimeout(this.searchTimeout);
  }

  getCirclesByFilters = () => {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { data } = this.props.circle;
        const state = this.state;

        try {
          const query: any = await client.query({
            query: GET_CIRCLES_BY_FILTERS,
            fetchPolicy: 'no-cache',
            variables: {
              filters: state.filters,
              selectFields: state.selectFields,
              orderBy: state.orderBy,
              numberOfResults: state.numberOfResults,
              cursor: data.cursor,
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

  timedGetInterfacedCirclesByFilters = () => {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(async () => {
      this.getCirclesByFilters();
    }, 700);
  };

  handleNumberOfResultsChange = (numberOfResults: number) => {
    if (numberOfResults < 0) {
      numberOfResults = 0;
    } else if (numberOfResults > maxAllowableNumberOfResults) {
      numberOfResults = maxAllowableNumberOfResults;
    }
    this.setState(
      {
        numberOfResults,
      },
      () => {
        this.timedGetInterfacedCirclesByFilters();
      },
    );
  };

  toggleOrderBy = () => {
    const orderBy = {
      property: this.state.orderBy.property,
      ascending: !this.state.orderBy.ascending,
    };
    this.setState(
      {
        orderBy,
      },
      () => {
        this.timedGetInterfacedCirclesByFilters();
      },
    );
  };

  render() {
    const {
      showSearchSettings,
      numberOfResults,
      error,
      loading,
      lines,
      orderBy,
    } = this.state;
    const { classes } = this.props;

    if (error) return <Error error={error} />;

    let results: any = null;

    if (loading) {
      results = (
        <ProgressWithMessage message="Searching" hideBackground={true} />
      );
    } else if (!lines) {
      // Create default circle for no results (some shortcut to bring out list finding options)
      results = <Typography variant="h3">No Results</Typography>;
    } else {
      results = (
        <List>
          {lines.map((circle: any) => {
            switch (circle.type) {
              case 'UPDATED':
              case 'CREATED':
              case 'VIEWED':
                {
                  let circleTitle = 'Untitled';
                  if (circle.data.collection === 'circles') {
                    return (
                      <Query
                        key={circle.id}
                        query={GET_INTERFACED_CIRCLE}
                        variables={{
                          id: circle.data.id,
                        }}
                      >
                        {({ loading, error, data }) => {
                          if (loading) {
                            return <div />;
                          }
                          if (error) return <Error error={error} />;

                          circleTitle = data.getCircleById.title;
                          const interfacedCircle = data.getCircleById;

                          return (
                            <ListItemC
                              key={circle.id}
                              linkUrl={`/id/${circle.data.id}`}
                              primary={interfacedCircle.title}
                              secondary={makeTypeHumanReadable(circle.type)}
                            />
                          );
                        }}
                      </Query>
                    );
                  } else if (circle.data.collection === 'profiles') {
                    return (
                      <Query
                        key={circle.id}
                        query={GET_INTERFACED_PROFILE}
                        variables={{
                          id: circle.data.id,
                        }}
                      >
                        {({ loading, error, data }) => {
                          if (loading) {
                            return null;
                          }
                          if (error) return <Error error={error} />;
                          circleTitle = data.getProfileById.title;
                          const interfacedProfile = data.getProfileById;

                          return (
                            <ListItemC
                              key={circle.id}
                              linkUrl={`/id/${interfacedProfile.id}`}
                              primary={interfacedProfile.username}
                              secondary={makeTypeHumanReadable(circle.type)}
                            />
                          );
                        }}
                      </Query>
                    );
                  }
                }
                break;
              case 'VIEWED_BY_IDS':
                return (
                  <ListItemC
                    key={circle.id}
                    linkUrl={`/id/${circle.id}`}
                    primary={`List of ${circle.data.collection}`}
                    secondary={makeTypeHumanReadable(circle.type)}
                  />
                );
              default:
                return null;
            }
          })}
        </List>
      );
    }

    const listTitle = this.props.circle.title || 'Get Circles by Filters';

    return (
      <Card>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Typography variant="h5" className={classes.listTitle}>
              {listTitle}
            </Typography>
            <Spacer />
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
              <Icon>tune</Icon>
            </IconButton>
          </Toolbar>
          <Collapse in={showSearchSettings}>
            <Grid container spacing={8} className={classes.gridContainer}>
              <Grid item xs={6} md={4} lg={3}>
                <Typography id="slider-image">Number of Results</Typography>
                <div className={classes.sliderTextContainer}>
                  <Slider
                    classes={{ container: classes.slider }}
                    value={numberOfResults}
                    aria-labelledby="label"
                    onChange={(event, value) =>
                      this.handleNumberOfResultsChange(value)
                    }
                    min={0}
                    max={maxAllowableNumberOfResults}
                    step={1}
                  />
                  <TextField
                    id="number-of-results"
                    // label="Number of Results"
                    className={classes.sliderTextField}
                    value={numberOfResults}
                    type="number"
                    onChange={event =>
                      this.handleNumberOfResultsChange(
                        Number(event.target.value),
                      )
                    }
                    margin="normal"
                  />
                </div>
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <div className={classes.centerOption}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={orderBy.ascending}
                        onChange={() => this.toggleOrderBy()}
                        value="ascending"
                      />
                    }
                    label="Ascending"
                  />
                </div>
              </Grid>
            </Grid>
          </Collapse>
        </AppBar>

        {results}
      </Card>
    );
  }
}

export default withStyles(styles)(GetInterfacedCirclesByFilters);
