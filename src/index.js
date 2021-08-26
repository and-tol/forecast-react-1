import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

// Store
import { store } from './init/store';
// Styles
import './style/main.scss';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
