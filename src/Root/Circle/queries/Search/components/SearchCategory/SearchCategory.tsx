import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Grid, { GridProps } from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ProgressWithMessage from '../../../../../components/ProgressWithMessage';
import SearchResults from '../SearchResults/SearchResults';
import { SearchCircle } from './../../searchTypes';
import { withStyles } from '@material-ui/styles';

interface Props {
  circle: SearchCircle;
  index: number;
  gridSize: GridProps;
  resultsDense: boolean;
  resultsShowSecondary: boolean;
  showMoreResults: (circle: SearchCircle) => void;
  classes: {
    cardContent: string;
    card: string;
    avatar: string;
    actions: string;
  };
}

interface State {
  loading: boolean;
}

const styles = {
  cardContent: {
    padding: 0,
  },
  card: {},
  actions: {},
  avatar: {},
};

class SearchCategory extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.circle.lines !== this.props.circle.lines) {
      this.setState({
        loading: false,
      });
    }
  }

  handleShowMore = () => {
    this.setState({
      loading: true,
    });
  };

  render() {
    const {
      classes,
      gridSize,
      index,
      resultsDense,
      resultsShowSecondary,
      showMoreResults,
      circle,
    } = this.props;
    const { loading } = this.state;

    const anotherQueryWithResults = circle.lines.find(
      c => c.type === 'QUERY' && c.data && c.data.hasMoreResults,
    );
    const cursorQueries =
      circle && circle.lines && circle.lines.length
        ? anotherQueryWithResults
        : false;

    const getLines = circle.lines.find(
      (circle: SearchCircle) => circle.type === 'LINES',
    );

    let lines = circle ? (getLines ? getLines.lines : []) : [];

    const fadeInTime = index * 100 * 2 + 500;

    return (
      <Grid
        item
        xs={gridSize.xs}
        sm={gridSize.sm}
        md={gridSize.md}
        lg={gridSize.lg}
        xl={gridSize.xl}
      >
        <Grow
          in={true}
          timeout={500}
          style={{ transformOrigin: '50% 0' }}
          {...(true ? { timeout: fadeInTime } : {})}
        >
          <div>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    {<Icon color="action">{circle.icon}</Icon> || (
                      <Icon>access_time</Icon>
                    )}
                  </Avatar>
                }
                action={
                  <div>
                    <IconButton aria-label="More options">
                      <Icon>more_vert</Icon>
                    </IconButton>
                  </div>
                }
                title={circle.title}
              />
              <Divider />

              <CardContent className={classes.cardContent}>
                {lines ? (
                  <SearchResults
                    lines={lines}
                    resultsDense={resultsDense}
                    resultsShowSecondary={resultsShowSecondary}
                  />
                ) : null}
              </CardContent>

              <CardActions className={classes.actions} disableSpacing>
                {cursorQueries ? (
                  <div
                    style={{ position: 'relative', flex: 1, display: 'flex' }}
                  >
                    {loading ? (
                      <ProgressWithMessage
                        hideBackground={true}
                        hideMessage={true}
                        containerStylesOverride={{ margin: '12px auto' }}
                        size={24}
                      />
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ flex: 1 }}
                        onClick={() => {
                          this.handleShowMore();
                          showMoreResults(circle);
                        }}
                        disabled={loading}
                      >
                        Show More
                      </Button>
                    )}
                  </div>
                ) : null}
              </CardActions>
            </Card>
          </div>
        </Grow>
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchCategory);
