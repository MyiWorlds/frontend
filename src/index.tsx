import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Root from './Root';
import './index.css';

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
