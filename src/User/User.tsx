import * as firebase from 'firebase/app';
import * as React from 'react';
import client from '../apolloClient';
import CREATE_USER from './createUser';
import fire from '../firebase';
import USER from './userQuery';
import { Query } from 'react-apollo';
require('firebase/auth');

interface Props {
  render: any;
}

interface State {
  errorMessage?: string;
  authenticating: boolean;
  selectedProfile: string;
  themeDark: boolean;
}

interface User {
  timeout: number;
}

interface User {
  email: string;
}

interface Error {
  code: string;
  message: string;
}

class User extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: undefined,
      authenticating: false,
      selectedProfile: '',
      themeDark: true,
    };
    this.timeout = 0;
  }

  async componentDidMount() {
    this.setState({
      authenticating: true,
    });
    await this.createUserIfNewUser();

    this.authListener();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
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
      .catch(function(error: any) {
        console.log(error);
      });
  };

  firebaseAuthRefreshTimeout = () => {
    // Reset token every 55min, it expires every hour
    this.timeout = window.setTimeout(() => {
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
    clearTimeout(this.timeout);
    if (navigator.onLine) {
      this.setState(
        {
          authenticating: true,
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
      this.timeout = window.setTimeout(() => {
        this.authListener();
      }, 5000);
    }
  };

  setUserLS = (profileId: string, userId: string) => {
    localStorage.setItem('profile-id', profileId);
    localStorage.setItem('user-id', userId);
  };

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ [event.target.name]: event.target.value } as any);
  };

  handleToggleThemeDark = () => {
    console.log(this.state.themeDark);
    this.setState({ themeDark: !this.state.themeDark });
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
        localStorage.removeItem('profileId');
        localStorage.removeItem('userId');
      })
      .catch((error: Error) =>
        console.log('Error happend logging out', error.code, error.message),
      );

    refetch();
  };

  render() {
    const { authenticating, themeDark } = this.state;
    const { render } = this.props;

    if (authenticating) {
      return <h1>Authenticating your account...</h1>;
    }

    return (
      <Query query={USER}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <p>loading...</p>;
          if (error) return <p>error</p>;

          const user = data.user
            ? data.user
            : {
                id: null,
                email: 'guest@email.com',
                profiles: [],
              };

          const selectedProfile =
            user.id !== null
              ? this.state.selectedProfile || user.profiles[0].id
              : null;

          this.setUserLS(selectedProfile, user.id);

          const style =
            selectedProfile && selectedProfile.style
              ? selectedProfile || null
              : null;

          return (
            <div>
              {render({
                selectedProfile,
                user,
                themeDark,
                handleToggleThemeDark: this.handleToggleThemeDark,
                handleLogin: this.authWithGoogle,
                handleLogout: () => this.handleLogout(refetch),
                refetch,
                style,
              })}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default User;
