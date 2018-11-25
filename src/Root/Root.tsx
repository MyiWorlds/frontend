import * as React from 'react';
import apolloClient from '..//apolloClient';
import App from './App';
import MaterialUI from '../services/MaterialUI';
import NetworkUpdater from './NetworkUpdater';
import ReactContext from './ReactContext';
import User from './User';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { Detector } from 'react-detect-offline';

const Root: React.SFC = () => (
  <ReactContext>
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <Detector
          polling={{ interval: 10000 }}
          render={({ online }) => (
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
                }) => (
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
  </ReactContext>
);

export default Root;
