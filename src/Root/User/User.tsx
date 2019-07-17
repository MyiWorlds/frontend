import * as React from 'react';
import client from '../../apolloClient';
import CREATE_USER from './containers/mutations/createUser';
import GET_PROFILE_BY_ID from '../Profile/containers/queries/getProfileById';
import GET_USER from './containers/queries/getUserQuery';
import guestProfile from '../Profile/constants/guestProfile';
import guestUser from './constants/guestUser';
import Paper from '@material-ui/core/Paper';
import ProfileUsernameEditor from '../Profile/components/ProfileUsernameEditor';
import ProgressWithMessage from '../components/ProgressWithMessage';
import SelectProfile from '../Profile/components/SelectProfile';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import UPDATE_PROFILE from '../Profile/containers/mutations/updateProfile';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { Error } from '../../../types/error.d';
import { fire } from '../../services/firebase';
import { IProfile } from '../../../types/profile';
import { Query } from 'react-apollo';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { TransitionProps } from '@material-ui/core/transitions/transition';

require('firebase/auth');

interface Props {
  render: any;
  isConnected: boolean;
  classes: {
    card: string;
    container: string;
  };
}

interface State {
  errorMessage?: string;
  authenticating: boolean;
  selectedProfile: IProfile;
  showProfileUpdatedSnackbar: boolean;
  profileUpdatedSnackbarMessage: string;
}

interface User {
  timeoutFirebaseAuthToken: number;
  timeoutUpdateProfile: number | any;
  email: string;
}

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props: any, ref: any) {
    return <Slide direction="up" ref={ref} {...props} />;
  },
);

const styles = (theme: Theme) =>
  createStyles({
    card: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    container: {
      margin: '42px auto',
    },
  });

class User extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: undefined,
      authenticating: false,
      selectedProfile: guestProfile,
      showProfileUpdatedSnackbar: false,
      profileUpdatedSnackbarMessage: '',
    };
    this.timeoutFirebaseAuthToken = 0;
    this.timeoutUpdateProfile = 0;
  }

  async componentDidMount() {
    this.setState({
      authenticating: true,
    });
    await this.createUserIfNewUser();

    this.authListener();

    const lastUsedProfileOnDevice:
      | string
      | null = this.getSelectedProfileIdLS();
    this.changeSelectedProfile(lastUsedProfileOnDevice);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutFirebaseAuthToken);
  }

  createUserIfNewUser = async () => {
    await fire
      .auth()
      .getRedirectResult()
      .then(async (result: any) => {
        if (
          result &&
          result.additionalUserInfo &&
          result.additionalUserInfo.isNewUser
        ) {
          await this.createUser(result.user.uid, result.user.email);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  firebaseAuthRefreshTimeout = () => {
    // Reset token every 55min, it expires every hour
    this.timeoutFirebaseAuthToken = window.setTimeout(() => {
      this.authListener();
    }, 3300000);
  };

  getUserAuthToken = (user: User) => {
    fire
      .auth()
      .currentUser.getIdToken(true)
      .then((idToken: any) => {
        console.log('I put a new token in your Local Storage');
        this.setTokenLS(idToken);

        const selectedProfileLS = this.getSelectedProfileIdLS();

        this.setState(
          {
            authenticating: false,
          },
          () => {
            this.firebaseAuthRefreshTimeout();
            if (
              selectedProfileLS &&
              selectedProfileLS !== '' &&
              selectedProfileLS !== 'null'
            ) {
              this.changeSelectedProfile(selectedProfileLS);
            }
          },
        );
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  createUser = async (userId: string, email: string) => {
    await client.mutate({
      variables: { id: userId, email: email },
      mutation: CREATE_USER,
    });
  };

  authListener = () => {
    clearTimeout(this.timeoutFirebaseAuthToken);
    if (this.props.isConnected) {
      this.setState(
        {
          authenticating: true,
          // offlines: false // Might want to try playing with this
        },
        () => {
          try {
            fire.auth().onAuthStateChanged(async (user: any) => {
              if (user) {
                await this.getUserAuthToken(user);
                await this.changeSelectedProfile(this.getSelectedProfileIdLS());
              } else {
                this.setState({
                  authenticating: false,
                });
              }
            });
          } catch (error) {
            console.log('Network Error from intermittent connection', error);
            this.setState({
              authenticating: false,
            });
          }
        },
      );
    }
  };

  clearLS = () => {
    localStorage.clear();
  };

  setTokenLS = (idToken: string) => {
    localStorage.setItem('token', idToken);
  };

  setUserLS = (userId: string) => {
    localStorage.setItem('user-id', userId);
  };

  setSelectedProfileLS = (selectedProfileId: string) => {
    localStorage.setItem('selected-profile-id', selectedProfileId);
  };

  setProfileHistoryIdLS = (profileHistoryId: string) => {
    localStorage.setItem('profile-history-id', profileHistoryId);
  };

  setAddToHistoryLS = (addToHistory: string) => {
    localStorage.setItem('add-to-history', addToHistory);
  };

  getSelectedProfileIdLS = () => {
    return localStorage.getItem('selected-profile-id');
  };

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ [event.target.name]: event.target.value } as any);
  };

  handleToggleThemeDark = () => {
    if (this.timeoutUpdateProfile) {
      clearTimeout(this.timeoutUpdateProfile);
    }
    let selectedProfile = Object.assign({}, this.state.selectedProfile);
    selectedProfile.isDarkTheme = !selectedProfile.isDarkTheme;
    this.setState({ selectedProfile });

    this.timeoutUpdateProfile = setTimeout(async () => {
      if (selectedProfile.id) {
        const updateProfile = await this.updateProfile(selectedProfile.id, {
          isDarkTheme: selectedProfile.isDarkTheme,
        });

        if (updateProfile.data) {
          this.displaySnackbar(updateProfile.data.updateProfile.status);
        }
      }
    }, 500);
  };

  displaySnackbar = (status: string) => {
    const profileUpdatedSnackbarMessage =
      status === 'SUCCESS' ? 'I saved your changes' : 'I had an error';

    this.setState({
      showProfileUpdatedSnackbar: true,
      profileUpdatedSnackbarMessage,
    });
  };

  handleToggleStyleEnabled = () => {
    let selectedProfile = Object.assign({}, this.state.selectedProfile);
    selectedProfile.overrideCircleTypes = !selectedProfile.overrideCircleTypes;

    this.setState({ selectedProfile });

    this.timeoutUpdateProfile = setTimeout(async () => {
      if (selectedProfile.id) {
        const updateProfile = await this.updateProfile(selectedProfile.id, {
          overrideCircleTypes: selectedProfile.overrideCircleTypes,
        });

        if (updateProfile.data) {
          this.displaySnackbar(updateProfile.data.updateProfile.status);
        }
      }
    }, 500);
  };

  handleToggleAddToHistory = () => {
    let selectedProfile = Object.assign({}, this.state.selectedProfile);

    if (selectedProfile && selectedProfile.id) {
      selectedProfile.addToHistory = !selectedProfile.addToHistory;
      this.setState({ selectedProfile }, () => {
        this.timeoutUpdateProfile = setTimeout(async () => {
          if (selectedProfile.id) {
            const updateProfile = await this.updateProfile(selectedProfile.id, {
              addToHistory: selectedProfile.addToHistory,
            });

            this.setAddToHistoryLS(selectedProfile.addToHistory.toString());

            if (updateProfile.data) {
              this.displaySnackbar(updateProfile.data.updateProfile.status);
            }
          }
        }, 500);
      });
    }
  };

  updateProfile = async (id: string, data: any) => {
    const updatedProfileMutation = await client.mutate({
      mutation: UPDATE_PROFILE,
      variables: {
        id,
        data,
      },
    });

    return updatedProfileMutation;
  };

  handleLogout = async (refetch: () => void) => {
    await fire
      .auth()
      .signOut()
      .then(() => {
        console.log('You were signed out');
        localStorage.removeItem('token');
        localStorage.removeItem('selectedProfileId');
        localStorage.removeItem('userId');
      })
      .catch((error: Error) =>
        console.log('Error happend logging out', error.code, error.message),
      );
    refetch();
    this.changeSelectedProfile('guest');
  };

  changeSelectedProfile = async (id: string | null) => {
    if (id && id !== 'null' && id !== 'guest') {
      const optimisticSelectedProfile = Object.assign(
        {},
        this.state.selectedProfile,
        { id },
      );
      this.setState({
        selectedProfile: optimisticSelectedProfile,
      });

      this.setSelectedProfileLS(id);

      const query: any = await client.query({
        query: GET_PROFILE_BY_ID,
        fetchPolicy: 'no-cache',
        variables: {
          id,
        },
      });
      const selectedProfile = query.data.getProfileById || guestProfile;

      this.setProfileHistoryIdLS(
        selectedProfile.history ? selectedProfile.history.id : null,
      );
      this.setAddToHistoryLS(selectedProfile.addToHistory);

      this.setState({
        selectedProfile,
      });
    } else {
      this.setState({
        selectedProfile: guestProfile,
      });
    }
  };

  handleCloseSnackbar = () => {
    this.setState({ showProfileUpdatedSnackbar: false });
  };

  render() {
    const { authenticating, selectedProfile } = this.state;
    const { render, classes } = this.props;

    if (authenticating) {
      return (
        <ProgressWithMessage
          message="Authenticating Account"
          hideBackground={true}
        />
      );
    }

    return (
      <Query query={GET_USER}>
        {({ loading, error, data, refetch }) => {
          if (error) return <p>error</p>;
          if (loading) {
            return (
              <ProgressWithMessage
                message="Getting your Account Information"
                hideBackground={true}
              />
            );
          }

          const user = data.user ? data.user : guestUser;

          // TODO THIS IS NOT RENDERING
          if (user.id) {
            if (
              user.profiles.length > 0 &&
              (selectedProfile && selectedProfile.id === 'guest')
            ) {
              return (
                <SelectProfile
                  changeSelectedProfile={this.changeSelectedProfile}
                  profiles={user.profiles}
                />
              );
            }

            if (!user.profiles.length) {
              return (
                <div className={classes.container}>
                  <Paper className={classes.card} elevation={1}>
                    <ProfileUsernameEditor
                      open={true}
                      handleClose={() => null}
                      changeSelectedProfile={this.changeSelectedProfile}
                    />
                  </Paper>
                </div>
              );
            }
          } else {
            this.clearLS();
            return null;
          }

          return (
            <div>
              {render({
                selectedProfile,
                user,
                handleToggleThemeDark: this.handleToggleThemeDark,
                handleToggleStyleEnabled: this.handleToggleStyleEnabled,
                handleToggleAddToHistory: this.handleToggleAddToHistory,
                handleLogout: () => this.handleLogout(refetch),
                changeSelectedProfile: this.changeSelectedProfile,
              })}

              <Snackbar
                open={this.state.showProfileUpdatedSnackbar}
                onClose={this.handleCloseSnackbar}
                autoHideDuration={2000}
                TransitionComponent={Transition}
                disableWindowBlurListener={true}
                ClickAwayListenerProps={{
                  onClickAway: () => {
                    return;
                  },
                }}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={
                  <span id="message-id">
                    {this.state.profileUpdatedSnackbarMessage}
                  </span>
                }
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(User);
