import * as React from 'react';
import * as ReactDOM from 'react-dom';
import apolloClient from './apolloClient';
import App from './App';
import jssNested from 'jss-nested';
import MaterialUI from './materialUI';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import { JssProvider } from 'react-jss';
import { SheetsRegistry } from 'jss';
import './index.css';

const generateClassName = createGenerateClassName();

const sheetsRegistry = new SheetsRegistry();
const jss = create(jssPreset());
jss.use(jssNested());

const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MaterialUI>
          <App />
        </MaterialUI>
      </JssProvider>
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
