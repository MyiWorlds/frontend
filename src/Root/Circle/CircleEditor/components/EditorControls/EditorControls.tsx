import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ConfirmCancelCircleEditor from '../ConfirmCancelCircleEditor';
import FlexGrow from '../../../../components/FlexGrow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import makeTypeHumanReadable from '../../../functions/makeTypeHumanReadable';
import Progress from '../../../../components/Progress';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { Consumer } from '../../../../ReactContext';
import { createStyles, withStyles } from '@material-ui/styles';
import { IEditingCircle } from '../../../../../../types/circle';
import { IProfile } from '../../../../../../types/profile';
import { Redirect } from 'react-router-dom';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Can I pass a callback which runs inside the child component.
// I pass down just a function which uses save circle and passes the state held item
interface Props {
  circle: IEditingCircle;
  saving: boolean;
  currentPath: string;
  selectedProfile: IProfile;
  saveCircle: () => void;
  showSettings: () => void;
  saveLayout: () => void;
  cancelEditingGrid: () => void;
  editGridLayout: () => void;
  toggleWidthOptions: () => void;
  isEditingGrid: boolean;
  designSize: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | null;
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
      height: 48,
    },
    btnIcon: {
      marginRight: theme.spacing(1),
    },
    btnBarBtn: {
      marginRight: theme.spacing(2),
    },
    progressIcon: {
      marginRight: theme.spacing(1.5),
      marginLeft: theme.spacing(1.5),
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
      selectedProfile,
      showSettings,
      editGridLayout,
      isEditingGrid,
      saveLayout,
      cancelEditingGrid,
      toggleWidthOptions,
      designSize,
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
              <Toolbar style={{ minHeight: 48 }}>
                {isEditingGrid ? (
                  <>
                    <Button onClick={() => cancelEditingGrid()}>
                      <Icon className={classes.btnIcon}>close</Icon>
                      Cancel
                    </Button>
                    <FlexGrow />
                    <Tooltip title="View and edit different screen sizes">
                      <Button onClick={toggleWidthOptions}>
                        <Icon className={classes.btnIcon}>phonelink</Icon>
                        {designSize || 'Full'}
                      </Button>
                    </Tooltip>
                    <Button onClick={() => saveLayout()}>
                      <Icon className={classes.btnIcon}>check</Icon>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
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
                      {circle.type
                        ? makeTypeHumanReadable(circle.type)
                        : 'Circle'}
                    </Typography>
                    {circle.type === '' ? null : (
                      <div className={classes.btnBarBtn}>
                        {saving ? (
                          <div className={classes.progressIcon}>
                            <Progress
                              hideBackground
                              size={24}
                              color={'inherit'}
                            />
                          </div>
                        ) : selectedProfile.id === 'guest' ? (
                          <Tooltip title="Login to save to the Cloud. It is saved on your device currently">
                            <Icon>cloud_off</Icon>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Saved">
                            <Icon>cloud_done</Icon>
                          </Tooltip>
                        )}
                      </div>
                    )}
                    <FlexGrow />
                    <Button onClick={editGridLayout}>
                      <Icon>dashboard</Icon>
                    </Button>

                    <Tooltip title="Settings">
                      <Button
                        variant="text"
                        onClick={() => showSettings()}
                        // className={classes.btnBarBtn}
                      >
                        <Icon
                        // className={classes.btnIcon}
                        >
                          settings
                        </Icon>
                      </Button>
                    </Tooltip>

                    {selectedProfile.id === 'guest' ? (
                      <Button variant="outlined" onClick={() => store.login()}>
                        <Icon className={classes.btnIcon}>person</Icon>Login to
                        Save
                      </Button>
                    ) : (
                      <Tooltip title="View">
                        <Button
                          variant="text"
                          disabled={!circle.type}
                          onClick={() => this.navigateToCircle()}
                        >
                          <Icon
                          // className={classes.btnIcon}
                          >
                            remove_red_eye
                          </Icon>
                        </Button>
                      </Tooltip>
                    )}
                  </>
                )}
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
