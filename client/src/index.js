import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'; // importing from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from './routes';

import registerServiceWorker from './registerServiceWorker';
require('./index.css');
ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);

registerServiceWorker();
