import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import { initStore } from './store';

import App from './components/App';
import WebSocketProvider from './components/providers/WebSocket';

ReactDOM.render(
  <Provider store={initStore()}>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </Provider>,
  document.getElementById('root')
);
