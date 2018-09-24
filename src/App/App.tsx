import * as React from 'react';
import AppMenuController from './AppMenuController';
import CreateCircle from './containers/mutations/CreateCircle';
import GetCirclesByFilters from './containers/queries/GetCirclesByFilters';
import GetCirclesByIds from './containers/queries/GetCirclesByIds';
import Home from './components/Home';
import Navigation from './Navigation';
import Routes from '../routes';

interface Props {
  isDarkTheme: boolean;
  styleEnabled: boolean;
  handleToggleThemeDark: () => void;
  handleToggleStyleEnabled: () => void;
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
      isDarkTheme,
      handleToggleThemeDark,
      handleToggleStyleEnabled,
      handleLogin,
      user,
      selectedProfile,
      handleLogout,
      styleEnabled,
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
          isDarkTheme={isDarkTheme}
          styleEnabled={styleEnabled}
          handleToggleThemeDark={handleToggleThemeDark}
          handleToggleStyleEnabled={handleToggleStyleEnabled}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
        <Navigation />
        <div style={{ marginTop: 60 }}>
          <Routes />
          <Home user={user} />
          {user.id ? <CreateCircle selectedProfile={selectedProfile} /> : null}
          <GetCirclesByIds />
          <GetCirclesByFilters />
        </div>
      </div>
    );
  }
}

export default App;
