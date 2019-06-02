import * as React from 'react';
import client from '../../../../apolloClient';
import Error from '../../../components/Error';
import gql from 'graphql-tag';
import ProgressWithMessage from '../../../components/ProgressWithMessage';
import Slider from '@material-ui/lab/Slider';
import { ApolloError } from 'apollo-client';
import { IProfile } from '../../../../../customTypeScriptTypes/profile';
import { Link } from 'react-router-dom';
import {
  ICreatedCircle,
  IFilter,
} from '../../../../../customTypeScriptTypes/circle';
import {
  AppBar,
  Card,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  TextField,
  Theme,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';

interface Props {
  selectedProfile: IProfile;
  circle: ICreatedCircle;
  classes: {
    spacer: string;
    slider: string;
    sliderTextField: string;
    sliderTextContainer: string;
    gridContainer: string;
    centerOption: string;
  };
}

interface State {
  numberOfResults: number;
  showSearchSettings: boolean;
  error: ApolloError | null;
  filters: IFilter[];
  lines: ICreatedCircle[];
  loading: boolean;
  orderBy: {
    property: string;
    ascending: boolean;
  };
}

interface GetCirclesByFilters {
  searchTimeout: any;
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
    marginLeft: theme.spacing.unit * 2,
    width: 100,
  },
  centerOption: {
    marginTop: theme.spacing.unit * 2,
  },
});

const maxAllowableNumberOfResults = 99;

class GetCirclesByFilters extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { filters, numberOfResults, orderBy } = this.props.circle.data;

    this.state = {
      filters,
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
        const { filters, orderBy, numberOfResults } = this.state;

        try {
          const query: any = await client.query({
            query: GET_CIRCLES_BY_FILTERS,
            fetchPolicy: 'no-cache',
            variables: {
              filters,
              orderBy,
              numberOfResults,
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

  timedGetCirclesByFilters = () => {
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
        this.timedGetCirclesByFilters();
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
        this.timedGetCirclesByFilters();
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
      );
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
                    onChange={(event: any) =>
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

export default withStyles(styles)(GetCirclesByFilters);
