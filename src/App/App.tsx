import * as React from 'react';
import AppMenuController from './components/AppMenuController';
import Navigation from './components/Navigation';
import Routes from '../routes';
import withWidth from '@material-ui/core/withWidth';

// import CreateCircle from './containers/Circle/mutations/CreateCircle';
// import CreateProfile from './containers/Profile/mutations/CreateProfile';
// import GetCirclesByFilters from './containers/queries/GetCirclesByFilters';
// import GetCirclesByIds from './containers/queries/GetCirclesByIds';
// import Home from './components/Home';

interface Props {
  handleToggleThemeDark: () => void;
  handleToggleStyleEnabled: () => void;
  handleLogin: () => void;
  changeSelectedProfile: () => void;
  user: any;
  selectedProfile: {
    id: string | null;
    isDarkTheme: boolean;
    isMyTheme: boolean;
  };
  width: string;
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
      showNavigation:
        props.width === 'xs' || props.width === 'sm' ? false : true,
    };
  }

  handleNavigationToggle = () => {
    this.setState({ showNavigation: !this.state.showNavigation });
  };

  handleToggleBoolean = (key: string) => {
    this.setState({ [key]: !this.state[key] } as any);
  };

  render() {
    const { showNavigation } = this.state;
    const {
      handleToggleThemeDark,
      handleToggleStyleEnabled,
      handleLogin,
      changeSelectedProfile,
      user,
      selectedProfile,
      handleLogout,
    } = this.props;

    return (
      <>
        <AppMenuController
          profiles={user.profiles}
          selectedProfile={selectedProfile}
          user={user}
          handleNavigationToggle={this.handleNavigationToggle}
          showNavigation={showNavigation}
          handleToggleThemeDark={handleToggleThemeDark}
          handleToggleStyleEnabled={handleToggleStyleEnabled}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          changeSelectedProfile={changeSelectedProfile}
        />
        <Navigation
          showNavigation={showNavigation}
          handleNavigationToggle={this.handleNavigationToggle}
        />
        <div
          style={{
            marginTop: 60,
            width: '100%',
            paddingBottom: 120,
            overflow: 'auto',
          }}
        >
          <Routes />
          {/* <Home user={user} />
          {user.id ? <CreateCircle selectedProfile={selectedProfile} /> : null}
          {user.id ? <CreateProfile user={user} /> : null}
          <GetCirclesByIds />
          <GetCirclesByFilters /> */}
        </div>
      </>
    );
  }
}

export default withWidth()(App);
