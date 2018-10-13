import * as firebase from 'firebase/app';
import * as React from 'react';
import client from '../apolloClient';
import CREATE_USER from '../../App/containers/User/mutations/createUser';
import fire from '../../services/firebase';
import GET_PROFILE_BY_ID from '../../App/containers/Profile/queries/getProfileById';
import GET_USER from '../../App/containers/User/queries/getUserQuery';
import ProfileUsernameEditor from '../../App/containers/Profile/mutations/ProfileUsernameEditor';
import ProgressWithMessage from '../../App/components/ProgressWithMessage';
import SelectProfile from '../../App/containers/Profile/SelectProfile';
import UPDATE_PROFILE from '../../App/containers/Profile/mutations/updateProfile';
import { Query } from 'react-apollo';
import {
  createStyles,
  Paper,
  Typography,
  withStyles,
  Slide,
  Snackbar,
} from '@material-ui/core';

// import apolloClient from '../apolloClient';
require('firebase/auth');

interface Props {
  render: any;
  classes: {
    card: string;
    container: string;
  };
}

interface SelectedProfile {
  id: string | null;
  isDarkTheme: boolean;
  isMyTheme: boolean;
  myTheme: {
    id: string;
    data: any;
  } | null;
}

interface State {
  errorMessage?: string;
  authenticating: boolean;
  selectedProfile: SelectedProfile | null;
  showProfileUpdatedSnackbar: boolean;
  profileUpdatedSnackbarMessage: string;
}

interface User {
  timeoutFirebaseAuthToken: number;
  timeoutUpdateProfile: number | any;
  email: string;
}

interface Error {
  code: string;
  message: string;
}

function TransitionUp(props: any) {
  return <Slide {...props} direction="up" />;
}

const styles = theme =>
  createStyles({
    card: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    container: {
      margin: '42px auto',
    },
  });

const defaultEmptySelectedProfile: SelectedProfile = {
  id: null,
  isDarkTheme: true,
  isMyTheme: false,
  myTheme: null,
};

const defaultGuestUser = {
  id: null,
  email: 'guest@email.com',
  profiles: [],
};

class User extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: undefined,
      authenticating: false,
      selectedProfile: defaultEmptySelectedProfile,
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

  createUserIfNewUser = () => {
    fire
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
        localStorage.setItem('token', idToken);

        this.setState({
          authenticating: false,
        });
        this.firebaseAuthRefreshTimeout();
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
    if (navigator.onLine) {
      // This may be a place where if it goes online and inbetween
      this.setState(
        {
          authenticating: true,
          // offlines: false // Might want to try playing with this
        },
        () => {
          try {
            fire.auth().onAuthStateChanged(async (user: any) => {
              if (user) {
                this.getUserAuthToken(user);
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
    } else {
      console.log('Checking for internet connection...');
      this.timeoutFirebaseAuthToken = window.setTimeout(() => {
        this.authListener();
      }, 5000);
    }
  };

  setUserLS = (userId: string) => {
    localStorage.setItem('user-id', userId);
  };

  setSelectedProfileLS = (selectedProfileId: string) => {
    localStorage.setItem('selected-profile-id', selectedProfileId);
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
    // TODO: Create app level breadcrumb
    // TOOD: Create a breadcrumb after x amount of time saying your settings have been saved
    let selectedProfile = Object.assign({}, this.state.selectedProfile);
    selectedProfile.isMyTheme = !selectedProfile.isMyTheme;

    this.setState({ selectedProfile });

    this.timeoutUpdateProfile = setTimeout(async () => {
      if (selectedProfile.id) {
        const updateProfile = await this.updateProfile(selectedProfile.id, {
          isMyTheme: selectedProfile.isMyTheme,
        });

        if (updateProfile.data) {
          this.displaySnackbar(updateProfile.data.updateProfile.status);
        }
      }
    }, 500);
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

  authWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: 'select_account',
    });

    fire
      .auth()
      .signInWithRedirect(provider)
      .catch((error: Error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  };

  handleLogout = async refetch => {
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
  };

  changeSelectedProfile = async (id: string | null) => {
    if (id) {
      const optomisticSelectedProfile = Object.assign(
        {},
        this.state.selectedProfile,
        { id },
      );
      this.setState({
        selectedProfile: optomisticSelectedProfile,
      });

      const query: any = await client.query({
        query: GET_PROFILE_BY_ID,
        fetchPolicy: 'no-cache',
        variables: {
          id,
        },
      });
      const selectedProfile =
        query.data.getProfileById || defaultEmptySelectedProfile;

      if (selectedProfile) {
        this.setSelectedProfileLS(selectedProfile.id);
      }

      this.setState({
        selectedProfile,
      });
    } else {
      this.setState({
        selectedProfile: defaultEmptySelectedProfile,
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
      return <h1>Authenticating your account...</h1>;
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

          const user = data.user ? data.user : defaultGuestUser;

          if (user.id) {
            if (
              user.profiles.length > 1 &&
              (selectedProfile && !selectedProfile.id)
            ) {
              return (
                <div className={classes.container}>
                  <Paper className={classes.card} elevation={1}>
                    <Typography variant="h2">Select Profile</Typography>
                    <SelectProfile
                      list={user.profiles}
                      changeSelectedProfile={this.changeSelectedProfile}
                    />
                  </Paper>
                </div>
              );
            }

            if (!user.profiles.length) {
              return (
                <div className={classes.container}>
                  <Paper className={classes.card} elevation={1}>
                    <ProfileUsernameEditor />
                  </Paper>
                </div>
              );
            }
          }

          return (
            <div>
              {render({
                selectedProfile,
                user,
                handleToggleThemeDark: this.handleToggleThemeDark,
                handleToggleStyleEnabled: this.handleToggleStyleEnabled,
                handleLogin: this.authWithGoogle,
                handleLogout: () => this.handleLogout(refetch),
                changeSelectedProfile: this.changeSelectedProfile,
              })}

              <Snackbar
                open={this.state.showProfileUpdatedSnackbar}
                onClose={this.handleCloseSnackbar}
                autoHideDuration={2000}
                TransitionComponent={TransitionUp}
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
