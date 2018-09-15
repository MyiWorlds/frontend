import * as React from 'react';
import AppBar from './AppBar';
import client from '../apolloClient';
import CREATE_USER from './createUser';
import CreateCircle from './containers/mutations/CreateCircle';
import fire from '../firebase';
import GetCirclesByFilters from './containers/queries/GetCirclesByFilters';
import GetCirclesByIds from './containers/queries/GetCirclesByIds';
import Home from './components/Home';
import Login from './authentication/Login';
import Logout from './authentication/Logout';
import Navigation from './Navigation';
import Routes from '../routes';
import VIEWER from './viewer';
import { Query } from 'react-apollo';

interface Props {}

interface State {
  errorMessage?: string;
  authenticating: boolean;
}

interface App {
  timeout: number;
}

interface User {
  email: string;
}

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: undefined,
      authenticating: false,
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

  render() {
    if (this.state.authenticating) {
      return <h1>Authenticating your account...</h1>;
    }

    return (
      <Query query={VIEWER}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <p>loading...</p>;
          if (error) return <p>error</p>;

          const viewer = data.viewer
            ? data.viewer
            : {
                id: null,
                email: 'guest@email.com',
              };

          return (
            <div>
              <AppBar />
              <Navigation />
              <Routes />
              <Home user={viewer} />
              <CreateCircle test="ttestsafds" />
              <GetCirclesByIds />
              <GetCirclesByFilters />
              {viewer.id ? <Logout refetch={refetch} /> : <Login />}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;
// export default withStyles(styles: object)(App);
