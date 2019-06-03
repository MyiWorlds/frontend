import * as React from 'react';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Error from '../../../components/Error';
import FlexGrow from '../../../components/FlexGrow';
import GET_PROFILE_BY_USERNAME from '../../containers/queries/getProfileByUsername';
import GET_USER from '../../../User/containers/queries/getUserQuery';
import GET_USER_AND_PROFILE from '../../../User/components/UserSettings/getUserAndProfile';
import gql from 'graphql-tag';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Progress from '../../../components/Progress';
import ProgressWithMessage from '../../../components/ProgressWithMessage';
import Spacer from '../../../components/Spacer';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles } from '@material-ui/styles';
import { Mutation, Query, RefetchQueriesProviderFn } from 'react-apollo';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

interface Props {
  classes: {
    secondaryHeading: string;
    usernameTextField: string;
    textfieldProgress: string;
    codeBlock: string;
    infoPaper: string;
    restrictionsList: string;
    savingProfileContainer: string;
  };
  username?: string;
  open: boolean;
  disableBackdropClick?: boolean;
  changeSelectedProfile: (id: string | null) => void;
  propsHandleCancel?: () => void;
  handleClose: () => void;
}

interface State {
  username: string;
  checkUsername: boolean;
  saving: boolean;
  isLoading: boolean;
  usernameAvailable: boolean;
  usernameInvalid: boolean;
  showMoreInfo: boolean;
  showUsernameRequirements: boolean;
}

const CREATE_PROFILE = gql`
  mutation createProfile($username: String!) {
    createProfile(username: $username) {
      message
      createdProfile {
        id
      }
    }
  }
`;

const styles = (theme: Theme) =>
  createStyles({
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    usernameTextField: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
    },
    textfieldProgress: {
      position: 'relative',
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: 4,
      marginLeft: 6,
    },
    infoPaper: {
      padding: theme.spacing(2),
      margin: `0px ${theme.spacing(1)}px`,
    },
    actions: {
      display: 'flex',
    },
    codeBlock: {
      background: theme.palette.background.default,
      padding: theme.spacing(1),
      margin: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },
    restrictionsList: {
      color: theme.palette.text.primary,
    },
    savingProfileContainer: {
      margin: theme.spacing(4),
    },
  });

interface ProfileUsernameEditor {
  timeout: any;
}

class ProfileUsernameEditor extends React.Component<
  Props,
  State,
  ProfileUsernameEditor
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: props.username || '',
      checkUsername: false,
      saving: false,
      isLoading: false,
      usernameAvailable: false,
      usernameInvalid: false,
      showMoreInfo: false,
      showUsernameRequirements: false,
    };
    this.timeout = 0;
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  updateState = (object: any) => {
    this.setState(object);
  };

  handleInputChange = (key: string, value: any, refetch: any) => {
    this.setState({
      checkUsername: false,
      usernameAvailable: false,
      isLoading: true,
      usernameInvalid: false,
    });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(async () => {
      this.setState({ checkUsername: true });

      await refetch().then((res: any) => {
        const response = res.data.getProfileByUsername;
        const usernameAvailable = response && response.usernameAvailable;
        const usernameInvalid =
          (response && response.usernameInvalid) || !usernameAvailable;

        this.setState({
          checkUsername: false,
          usernameAvailable,
          isLoading: false,
          usernameInvalid,
        });
      });
    }, 700);

    this.setState({ [key]: value } as any);
  };

  submitForm = async (
    event: any,
    createProfile: any,
    usernameInvalid: boolean,
  ) => {
    event.preventDefault();

    if (usernameInvalid) {
      return;
    }

    this.setState({
      saving: true,
    });

    const profile = await createProfile({
      variables: {
        username: this.state.username,
      },
      refetchQueries: [{ query: GET_USER }, { query: GET_USER_AND_PROFILE }],
    });

    // Check if username was taken while trying and error it

    if (!profile.data.createProfile.createdProfile) {
      this.setState({
        usernameInvalid: true,
        checkUsername: false,
        saving: false,
      });
    } else {
      this.setState(
        {
          checkUsername: false,
          saving: false,
          username: '',
        },
        () => {
          if (profile.data.createProfile.createdProfile) {
            this.props.changeSelectedProfile(
              profile.data.createProfile.createdProfile.id,
            );
            this.props.handleClose();
          }
        },
      );
    }
  };

  handleCancel = (propsUsername: string | undefined) => {
    this.updateState({
      username: propsUsername || '',
      checkUsername: false,
      usernameInvalid: false,
    });
    this.props.handleClose();
  };

  toggleMoreInfo = () => {
    this.setState({
      showMoreInfo: !this.state.showMoreInfo,
    });
  };

  toggleUsernameRequirements = () => {
    this.setState({
      showUsernameRequirements: !this.state.showUsernameRequirements,
    });
  };

  render() {
    const {
      username,
      checkUsername,
      isLoading,
      saving,
      showMoreInfo,
      usernameAvailable,
      usernameInvalid,
      showUsernameRequirements,
    } = this.state;
    const {
      username: propsUsername,
      classes,
      open,
      propsHandleCancel,
      handleClose,
      disableBackdropClick,
    } = this.props;

    return (
      <Dialog
        open={open}
        disableBackdropClick={disableBackdropClick ? true : false}
        onClose={() => handleClose()}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle id="draggable-dialog-title">
          {propsUsername ? 'Edit Profile Username' : 'Create Profile'}
        </DialogTitle>
        <Query query={GET_USER}>
          {({ loading, error, data }) => {
            if (error) {
              return <Error error={error} />;
            }
            if (loading) {
              return (
                <ProgressWithMessage
                  message="Getting Account Information"
                  hideBackground={true}
                />
              );
            }

            return (
              <Mutation mutation={CREATE_PROFILE}>
                {(
                  createProfile,
                  //  { data }
                ) => (
                  <Query
                    query={GET_PROFILE_BY_USERNAME}
                    variables={{
                      username,
                    }}
                    fetchPolicy="no-cache"
                    skip={!checkUsername}
                  >
                    {({ loading, error, data, refetch }) => {
                      if (error) return <Error error={error} />;
                      if (saving) {
                        return (
                          <div className={classes.savingProfileContainer}>
                            <ProgressWithMessage
                              message="Saving Profile"
                              hideBackground={true}
                            />
                          </div>
                        );
                      }

                      const progress = (
                        <div className={classes.textfieldProgress}>
                          <Progress hideBackground size={24} />
                        </div>
                      );

                      const userIcon = (
                        <Icon
                          style={{
                            color: usernameInvalid ? 'red' : 'green',
                          }}
                        >
                          account_circle
                        </Icon>
                      );

                      let usernameMessage: null | string = null;
                      let textfieldIcon: null | any = null;

                      if (isLoading) {
                        usernameMessage = 'Checking if available...';
                        textfieldIcon = progress;
                      } else if (usernameAvailable) {
                        usernameMessage = 'Yes! This username is available!';
                        textfieldIcon = userIcon;
                      } else {
                        usernameMessage = 'Try to create a unique username';
                        textfieldIcon = userIcon;
                      }

                      return (
                        <>
                          <DialogContent>
                            <DialogContentText>
                              {propsUsername !== undefined
                                ? 'This will change all your previous URLs you may have posted around the internet. All your old URLs will have your new username infront.'
                                : 'Choose your username, but think hard as you should avoid changing it at all costs!'}
                            </DialogContentText>
                            <Spacer />
                            <Button
                              color="primary"
                              onClick={() => this.toggleMoreInfo()}
                              style={{ textTransform: 'none' }}
                            >
                              <Icon style={{ marginRight: 8 }}>help</Icon>
                              Why
                            </Button>

                            <Collapse in={showMoreInfo}>
                              <Paper className={classes.infoPaper}>
                                <Spacer />

                                <DialogContentText>
                                  If you create custom URL's using your username
                                  and give them out, for example:
                                </DialogContentText>

                                <Paper className={classes.codeBlock}>
                                  <DialogContentText>
                                    {window.location.protocol}//
                                    {window.location.hostname}/
                                    <b>my-username</b>
                                    /something-you-created
                                  </DialogContentText>
                                </Paper>

                                <DialogContentText>
                                  then change your username to
                                  "my-new-username", it will break all the old
                                  links because your new one would look like:
                                </DialogContentText>

                                <Paper className={classes.codeBlock}>
                                  <DialogContentText>
                                    {window.location.protocol}//
                                    {window.location.hostname}/
                                    <b>my-new-username</b>
                                    /something-you-created
                                  </DialogContentText>
                                </Paper>

                                <DialogContentText>
                                  If you only share using direct URL's you will
                                  be fine (seen below), but this makes your
                                  URL's hard for people to memorize
                                </DialogContentText>

                                <Paper className={classes.codeBlock}>
                                  <DialogContentText>
                                    {window.location.protocol}//
                                    {window.location.hostname}/id/Faj8131kjvERa
                                  </DialogContentText>
                                </Paper>
                              </Paper>
                              <Spacer />
                            </Collapse>

                            <Spacer />
                            <Button
                              color="primary"
                              onClick={() => this.toggleUsernameRequirements()}
                              style={{ textTransform: 'none' }}
                            >
                              <Icon style={{ marginRight: 8 }}>warning</Icon>
                              Username Requirements
                            </Button>

                            <Collapse in={showUsernameRequirements}>
                              <Spacer />
                              <Paper className={classes.infoPaper}>
                                <Typography variant="body1">
                                  A valid username must follow the following
                                  guidelines:
                                </Typography>
                                <ul className={classes.restrictionsList}>
                                  <li>
                                    <Typography variant="body1">
                                      Must not be in use by anyone else
                                    </Typography>
                                  </li>
                                  <li>
                                    <Typography variant="body1">
                                      Must be 4 or more characters
                                    </Typography>
                                  </li>
                                  <li>
                                    <Typography variant="body1">
                                      Can only contain characters A-Z, 0-9, -,
                                      or _
                                    </Typography>
                                  </li>
                                </ul>
                              </Paper>
                            </Collapse>

                            <TextField
                              label="Username"
                              variant="outlined"
                              margin="normal"
                              value={username}
                              fullWidth
                              className={classes.usernameTextField}
                              onChange={event =>
                                this.handleInputChange(
                                  'username',
                                  event.target.value,
                                  refetch,
                                )
                              }
                              error={usernameInvalid}
                              helperText={usernameMessage}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {textfieldIcon}
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </DialogContent>
                          <DialogActions>
                            <FlexGrow />
                            <Button
                              onClick={() => {
                                this.handleCancel(propsUsername);
                                if (propsHandleCancel) {
                                  propsHandleCancel();
                                }
                              }}
                              color="primary"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={event =>
                                this.submitForm(
                                  event,
                                  createProfile,
                                  usernameInvalid,
                                )
                              }
                              variant="contained"
                              color="primary"
                              type="submit"
                              disabled={!usernameAvailable || isLoading}
                            >
                              {propsUsername ? 'Edit' : 'Create'}
                            </Button>
                          </DialogActions>
                        </>
                      );
                    }}
                  </Query>
                )}
              </Mutation>
            );
          }}
        </Query>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ProfileUsernameEditor);
