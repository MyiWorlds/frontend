import * as React from 'react';
import ConfirmCancelCircleEditor from '../ConfirmCancelCircleEditor';
import FlexGrow from '../../../../../../components/FlexGrow';
import makeTypeHumanReadable from '../../../../../functions/makeTypeHumanReadable';
import Progress from '../../../../../../components/Progress';
import { Consumer } from '../../../../../../ReactContext';
import { IEditingCircle } from '../../../../../../../../customTypeScriptTypes/circle';
import { Redirect } from 'react-router-dom';
import {
  AppBar,
  Button,
  createStyles,
  Icon,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';

interface Props {
  circle: IEditingCircle;
  saving: boolean;
  currentPath: string;
  saveCircle: () => void;
  showTypeSelector: () => void;
  classes: {
    appBar: string;
    btnBarBtn: string;
    progressIcon: string;
    btnIcon: string;
  };
}

interface State {
  shouldNavigateTo: boolean;
  navigateTo: string;
  showConfirmCancelCircleEditor: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    btnIcon: {
      marginRight: theme.spacing.unit,
    },
    btnBarBtn: {
      marginRight: theme.spacing.unit * 2,
    },
    progressIcon: {
      marginRight: theme.spacing.unit * 1.5,
      marginLeft: theme.spacing.unit * 1.5,
      position: 'relative',
    },
  });

class EditorControls extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldNavigateTo: false,
      navigateTo: '',
      showConfirmCancelCircleEditor: false,
    };
  }

  navigateToCircle = async () => {
    if (this.props.saving) {
      await this.props.saveCircle();
    }

    this.setState({
      shouldNavigateTo: true,
      navigateTo: `/id/${this.props.circle.id}`,
    });
  };

  goBack = (sessionBrowserHistory: string) => {
    this.setState({
      shouldNavigateTo: true,
      navigateTo: sessionBrowserHistory,
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

  showConfirmCancelCircleEditor = () => {
    this.setState({
      showConfirmCancelCircleEditor: true,
    });
  };

  render() {
    const {
      classes,
      circle,
      currentPath,
      saving,
      showTypeSelector,
    } = this.props;

    const {
      shouldNavigateTo,
      navigateTo,
      showConfirmCancelCircleEditor,
    } = this.state;

    if (shouldNavigateTo) {
      return <Redirect to={navigateTo} />;
    }

    return (
      <>
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
                    {saving ? (
                      <div className={classes.progressIcon}>
                        <Progress hideBackground size={24} color={'inherit'} />
                      </div>
                    ) : (
                      <Icon>cloud_done</Icon>
                    )}
                  </div>
                )}
                <FlexGrow />
                <Button
                  variant="text"
                  onClick={() => showTypeSelector()}
                  className={classes.btnBarBtn}
                >
                  <Icon className={classes.btnIcon}>tune</Icon>Change Content
                  Type
                </Button>
                <Button
                  variant="text"
                  disabled={!circle.type}
                  onClick={() => this.navigateToCircle()}
                >
                  <Icon className={classes.btnIcon}>remove_red_eye</Icon>View
                </Button>
              </Toolbar>
            </AppBar>
          )}
        </Consumer>
        <ConfirmCancelCircleEditor
          open={showConfirmCancelCircleEditor}
          handleClose={this.hideConfirmCancelCircleEditor}
          cancelCreation={this.cancelCreation}
        />
      </>
    );
  }
}

export default withStyles(styles)(EditorControls);
