import * as React from 'react';
import apolloClient from '../services/apolloClient';
import App from './App';
import MaterialUI from '../services/MaterialUI';
import User from './User';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';

const Root: React.SFC = () => (
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <User
        render={({
          selectedProfile,
          user,
          handleToggleThemeDark,
          handleToggleStyleEnabled,
          handleLogin,
          handleLogout,
          changeSelectedProfile,
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
            />
          </MaterialUI>
        )}
      />
    </ApolloProvider>
  </BrowserRouter>
);

export default Root;
