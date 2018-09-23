import * as React from 'react';
import AppMenuController from './AppMenuController';
import CreateCircle from './containers/mutations/CreateCircle';
import GetCirclesByFilters from './containers/queries/GetCirclesByFilters';
import GetCirclesByIds from './containers/queries/GetCirclesByIds';
import Home from './components/Home';
import Navigation from './Navigation';
import Routes from '../routes';

interface Props {
  themeDark: boolean;
  handleToggleThemeDark: () => void;
  handleLogin: () => void;
  user: any;
  selectedProfile: any;
  handleLogout: () => void;
}

interface State {
  errorMessage?: string;
  authenticating: boolean;
  showNavigation: boolean;
}

interface App {
  timeout: number;
}

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: undefined,
      authenticating: false,
      showNavigation: true,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ [event.target.name]: event.target.value } as any);
  };

  handleNavigationToggle = () => {
    this.setState({ showNavigation: !this.state.showNavigation });
  };

  handleToggleBoolean = (key: string) => {
    this.setState({ [key]: !this.state[key] } as any);
  };

  render() {
    const { showNavigation } = this.state;
    const {
      themeDark,
      handleToggleThemeDark,
      handleLogin,
      user,
      selectedProfile,
      handleLogout,
    } = this.props;

    return (
      <div>
        <AppMenuController
          profiles={user.profiles}
          selectedProfile={selectedProfile}
          handleChange={this.handleChange}
          user={user}
          handleNavigationToggle={this.handleNavigationToggle}
          showNavigation={showNavigation}
          themeDark={themeDark}
          handleToggleThemeDark={handleToggleThemeDark}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
        <Navigation />
        <Routes />
        <Home user={user} />
        {user.id ? <CreateCircle selectedProfile={selectedProfile} /> : null}
        <GetCirclesByIds />
        <GetCirclesByFilters />
      </div>
    );
  }
}

export default App;
