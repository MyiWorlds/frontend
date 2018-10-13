import * as React from 'react';
import * as ReactDOM from 'react-dom';
import apolloClient from './AppWrappers/apolloClient';
import App from './App';
import MaterialUI from './AppWrappers/MaterialUI';
import registerServiceWorker from './registerServiceWorker';
import User from './AppWrappers/User/User';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const Root = () => (
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

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
