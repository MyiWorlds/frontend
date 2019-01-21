import * as React from 'react';
import apolloClient from '../apolloClient';
import App from './App';
import MaterialUI from '../services/MaterialUI';
import NetworkUpdater from './NetworkUpdater';
import User from './User';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { IProfile } from '../../customTypeScriptTypes/profile.d';
import { IUser } from '../../customTypeScriptTypes/user.d';
import { Provider } from './ReactContext';
// const Detector = require('react-detect-offline');

interface UserProps {
  selectedProfile: IProfile;
  user: IUser;
  handleToggleThemeDark: () => void;
  handleToggleStyleEnabled: () => void;
  handleToggleAddToHistory: () => void;
  handleLogin: () => void;
  handleLogout: (refetch: () => void) => void;
  changeSelectedProfile: (id: string | null) => void;
}

class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider>
          <BrowserRouter>
            <ApolloProvider client={apolloClient}>
              {/* <Detector
                polling={{ interval: 10000 }}
                render={({ online }: { online: boolean }) => ( */}
              <NetworkUpdater isConnected={true}>
                <User
                  isConnected={true}
                  render={({
                    selectedProfile,
                    user,
                    handleToggleThemeDark,
                    handleToggleStyleEnabled,
                    handleLogin,
                    handleLogout,
                    changeSelectedProfile,
                    handleToggleAddToHistory,
                  }: UserProps) => (
                    <MaterialUI selectedProfile={selectedProfile}>
                      <App
                        user={user}
                        selectedProfile={selectedProfile}
                        handleToggleThemeDark={handleToggleThemeDark}
                        handleToggleStyleEnabled={handleToggleStyleEnabled}
                        handleLogin={handleLogin}
                        handleLogout={handleLogout}
                        changeSelectedProfile={changeSelectedProfile}
                        handleToggleAddToHistory={handleToggleAddToHistory}
                      />
                    </MaterialUI>
                  )}
                />
              </NetworkUpdater>
              {/* )}
              /> */}
            </ApolloProvider>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default Root;
