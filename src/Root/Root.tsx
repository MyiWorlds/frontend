import * as React from 'react';
import apolloClient from '../apolloClient';
import App from './App';
import MaterialUI from '../services/MaterialUI';
import NetworkUpdater from './NetworkUpdater';
import User from './User';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { Detector } from 'react-detect-offline';
import { IProfile } from '../../types/profile.d';
import { IUser } from '../../types/user.d';
import { Provider } from './ReactContext';

interface UserProps {
  selectedProfile: IProfile;
  user: IUser;
  handleToggleThemeDark: () => void;
  handleToggleStyleEnabled: () => void;
  handleToggleAddToHistory: () => void;
  handleLogin: () => void;
  handleLogout: () => void;
  changeSelectedProfile: (id: string | null) => void;
}

class Root extends React.Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <ApolloProvider client={apolloClient}>
            <Detector
              polling={{ interval: 10000 }}
              render={({ online }: { online: boolean }) => (
                <NetworkUpdater isConnected={online}>
                  <User
                    isConnected={online}
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
              )}
            />
          </ApolloProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
