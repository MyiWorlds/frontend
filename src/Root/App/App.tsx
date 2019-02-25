import * as React from 'react';
import AppMenuController from './components/AppMenuController';
import Navigation from './components/Navigation';
import Routes from '../../routes';
import withWidth from '@material-ui/core/withWidth';
import { Consumer } from '../ReactContext';
import { IProfile } from '../../../customTypeScriptTypes/profile.d';

interface Props {
  handleToggleThemeDark: () => void;
  handleToggleStyleEnabled: () => void;
  handleLogin: () => void;
  changeSelectedProfile: () => void;
  user: any;
  selectedProfile: IProfile;
  width: string;
  handleLogout: () => void;
  handleToggleAddToHistory: () => void;
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

  render() {
    const { showNavigation } = this.state;
    const {
      handleToggleThemeDark,
      handleToggleStyleEnabled,
      changeSelectedProfile,
      user,
      selectedProfile,
      handleLogout,
      handleToggleAddToHistory,
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
          handleLogout={handleLogout}
          changeSelectedProfile={changeSelectedProfile}
          handleToggleAddToHistory={handleToggleAddToHistory}
        />
        <Navigation
          showNavigation={showNavigation}
          selectedProfile={selectedProfile}
          handleNavigationToggle={this.handleNavigationToggle}
        />
        <div
          style={{
            marginTop: 48,
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            paddingBottom: 120,
            overflow: 'auto',
          }}
        >
          <Consumer>
            {(store: ProviderStore) => (
              <Routes
                store={store}
                selectedProfile={selectedProfile}
                changeSelectedProfile={changeSelectedProfile}
              />
            )}
          </Consumer>
        </div>
      </>
    );
  }
}

export default withWidth()(App);
