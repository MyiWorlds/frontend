import * as React from 'react';
import * as ReactDOM from 'react-dom';
import apolloClient from './apolloClient';
import App from './App';
import MaterialUI from './materialUI';
import registerServiceWorker from './registerServiceWorker';
import User from './User/User';
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
          themeDark,
          style,
          handleToggleThemeDark,
          handleLogin,
          handleLogout,
        }) => (
          <MaterialUI themeDark={themeDark} style={style}>
            <App
              user={user}
              themeDark={themeDark}
              selectedProfile={selectedProfile}
              handleToggleThemeDark={handleToggleThemeDark}
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
