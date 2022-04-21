import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import { initStore } from './store';
import reportWebVitals from './reportWebVitals';

import App from './components/App';

ReactDOM.render(
  <Provider store={initStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
