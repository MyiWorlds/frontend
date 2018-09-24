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
          isDarkTheme,
          styleEnabled,
          style,
          handleToggleThemeDark,
          handleToggleStyleEnabled,
          handleLogin,
          handleLogout,
        }) => (
          <MaterialUI
            isDarkTheme={isDarkTheme}
            styleEnabled={styleEnabled}
            style={style}
          >
            <App
              user={user}
              isDarkTheme={isDarkTheme}
              styleEnabled={styleEnabled}
              selectedProfile={selectedProfile}
              handleToggleThemeDark={handleToggleThemeDark}
              handleToggleStyleEnabled={handleToggleStyleEnabled}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
            />
          </MaterialUI>
        )}
      />
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
