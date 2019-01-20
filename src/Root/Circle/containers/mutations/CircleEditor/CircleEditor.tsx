import * as deepmerge from 'deepmerge';
import * as React from 'react';
import client from '../../../../../apolloClient';
import ConfirmCancelCircleEditor from './components/ConfirmCancelCircleEditor';
import convertCreatedCircleToEditingCircle from '../../../functions/convertCreatedCircleToEditingCircle';
import emptyCircle from '../../../functions/emptyCircle';
import FlexGrow from 'src/Root/components/FlexGrow';
import gql from 'graphql-tag';
import history from '../../../../../history';
import makeTypeHumanReadable from 'src/Root/Circle/functions/makeTypeHumanReadable';
import TypeSelector from './components/TypeSelector';
import { CircleEditorSwitch } from 'src/Root/Circle';
import { Consumer } from 'src/Root/ReactContext';
import { FullCircleFragment } from '../../queries/FullCircleFragment';
import { HeaderEditor } from 'src/Root/Circle/components/Header';
import { Redirect } from 'react-router-dom';
import {
  AppBar,
  Button,
  createStyles,
  Dialog,
  Divider,
  Icon,
  IconButton,
  Slide,
  Theme,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';

function Transition(props: CircleEditor) {
  return <Slide direction="up" {...props} />;
}

// Replace all these variables like this with how I did on updatecircle
const CREATE_CIRCLE = gql`
  mutation createCircle(
    $id: String
    $collection: String!
    $title: String
    $subtitle: String
    $description: String
    $type: String!
    $creator: String!
    $data: JSON
    $string: String
  ) {
    createCircle(
      id: $id
      collection: $collection
      title: $title
      subtitle: $subtitle
      description: $description
      type: $type
      creator: $creator
      string: $string
      data: $data
    ) {
      status
      message
      createdCircle {
        ...FullCircle
      }
    }
  }
  ${FullCircleFragment}
`;

const UPDATE_CIRCLE = gql`
  mutation updateCircle($circle: JSON!, $merge: Boolean!) {
    updateCircle(circle: $circle, merge: $merge) {
      status
      message
      updatedCircle {
        ...FullCircle
      }
    }
  }
  ${FullCircleFragment}
`;

interface State {
  shouldNavigateTo: boolean;
  navigateTo: string;
  showTypeSelector: boolean;
  showConfirmCancelCircleEditor: boolean;
  saving: boolean;
  circle: IEditingCircle;
}

interface Props {
  selectedProfile: IProfile;
  circle?: ICreatedCircle;
  currentPath: string;
  classes: {
    container: string;
    appBar: string;
    btnIcon: string;
    btnBarBtn: string;
    textField: string;
  };
}

interface CircleEditor {
  saveTimeout: any;
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing.unit * 2,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    appBar: {
      position: 'relative',
    },
    btnIcon: {
      marginRight: theme.spacing.unit,
    },
    btnBarBtn: {
      marginRight: theme.spacing.unit,
    },
  });

class CircleEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const circle = this.props.circle
      ? convertCreatedCircleToEditingCircle(
          this.props.circle,
          this.props.selectedProfile,
        )
      : emptyCircle(this.props.selectedProfile);

    this.state = {
      shouldNavigateTo: false,
      saving: false,
      showTypeSelector: false,
      navigateTo: '',
      showConfirmCancelCircleEditor: false,
      // take whatever you have and apply those ontop of whatever theme you select, unless if it is null/newly created then take all
      circle,
    };
    this.saveTimeout = 0;
  }

  componentDidMount() {
    if (this.state.circle.type === '') {
      this.showTypeSelector();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.saveTimeout);
  }

  saveCircle = async () => {
    const circleData = this.state.circle;

    const isNewCircle = !this.props.circle;
    const circle = {
      ...circleData,
      collection: 'circles',
    };

    if (isNewCircle) {
      const createdCircle = await client.mutate({
        variables: circle,
        mutation: CREATE_CIRCLE,
      });

      if (!circleData.id) {
        const circleWithId = {
          ...circle,
          id: createdCircle.data.createCircle.createdCircle.id,
        };
        history.push(`/edit/${circleWithId.id}`);
        this.setState({
          circle: circleWithId,
          saving: false,
        });
      } else {
        history.push(`/edit/${circle.id}`);
        this.setState({
          saving: false,
        });
      }
    } else {
      await client.mutate({
        variables: { circle, merge: false },
        mutation: UPDATE_CIRCLE,
      });

      this.setState({
        saving: false,
      });
    }
  };

  navigateToCircle = async () => {
    if (this.state.saving) {
      await this.saveCircle();
    }

    this.setState({
      shouldNavigateTo: true,
      navigateTo: `/id/${this.state.circle.id}`,
    });
  };

  showConfirmCancelCircleEditor = () => {
    this.setState({
      showConfirmCancelCircleEditor: true,
    });
  };

  hideConfirmCancelCircleEditor = () => {
    this.setState({
      showConfirmCancelCircleEditor: false,
    });
  };

  cancelCreation = () => {
    this.setState({
      shouldNavigateTo: true,
      navigateTo: '',
    });
  };

  showTypeSelector = () => {
    this.setState({
      showTypeSelector: true,
    });
  };

  hideTypeSelector = () => {
    this.setState({
      showTypeSelector: false,
    });
  };

  goBack = (sessionBrowserHistory: string) => {
    this.setState({
      shouldNavigateTo: true,
      navigateTo: sessionBrowserHistory,
    });
  };

  updateCircle = (updatedCircle: IEditingCircle, noDelay: boolean = false) => {
    const overrides = {
      id: this.state.circle.id,
    };
    const circle = deepmerge.all([this.state.circle, updatedCircle, overrides]);

    this.setState({ circle, saving: true }, () => {
      if (this.saveTimeout) {
        clearTimeout(this.saveTimeout);
      }

      if (noDelay) {
        this.saveCircle();
      } else {
        this.saveTimeout = setTimeout(async () => {
          this.saveCircle();
        }, 1000);
      }
    });
  };

  render() {
    const {
      circle,
      shouldNavigateTo,
      navigateTo,
      showTypeSelector,
      showConfirmCancelCircleEditor,
      saving,
    } = this.state;
    const { classes, currentPath, selectedProfile } = this.props;

    if (shouldNavigateTo) {
      return <Redirect to={navigateTo} />;
    }

    return (
      <Dialog fullScreen open={true} TransitionComponent={Transition}>
        <Consumer>
          {(store: ProviderStore) => (
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="default"
                  onClick={() => {
                    const sessionBrowserHistorys = store.state.sessionBrowserHistory.filter(
                      path => path !== currentPath,
                    );
                    this.goBack(sessionBrowserHistorys[0]);
                  }}
                  aria-label="Close"
                >
                  <Icon>arrow_back</Icon>
                </IconButton>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.btnBarBtn}
                >
                  Create{' '}
                  {circle.type && circle.type !== ''
                    ? makeTypeHumanReadable(circle.type)
                    : 'Circle'}
                </Typography>
                {circle.type === '' ? null : (
                  <div className={classes.btnBarBtn}>
                    <Typography
                      variant="body1"
                      color="inherit"
                      className={classes.btnBarBtn}
                    >
                      {saving ? 'Saving...' : 'Saved'}
                    </Typography>
                  </div>
                )}
                <FlexGrow />
                <Button
                  variant="outlined"
                  onClick={() => this.showTypeSelector()}
                  className={classes.btnBarBtn}
                >
                  <Icon className={classes.btnIcon}>tune</Icon>Change Content
                  Type
                </Button>
                <Button
                  variant="outlined"
                  disabled={!circle.type}
                  onClick={() => this.navigateToCircle()}
                >
                  <Icon className={classes.btnIcon}>remove_red_eye</Icon>View
                </Button>
              </Toolbar>
            </AppBar>
          )}
        </Consumer>

        <HeaderEditor circle={circle} updateCircle={this.updateCircle} />

        <Divider />

        <CircleEditorSwitch
          updateCircle={this.updateCircle}
          selectedProfile={selectedProfile}
          circle={circle}
        />

        <TypeSelector
          selectedProfile={selectedProfile}
          showTypeSelector={showTypeSelector}
          updateCircle={this.updateCircle}
          handleClose={this.hideTypeSelector}
        />
        <ConfirmCancelCircleEditor
          open={showConfirmCancelCircleEditor}
          handleClose={this.hideConfirmCancelCircleEditor}
          cancelCreation={this.cancelCreation}
        />
      </Dialog>
    );
  }
}

export default withStyles(styles)(CircleEditor);
