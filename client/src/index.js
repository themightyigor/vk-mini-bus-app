import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vk-connect';
import App from './App';
import StateContextProvider from './contexts/StateContext';

// import registerServiceWorker from './sw';

// Init VK  Mini App
connect.send('VKWebAppInit', {});

ReactDOM.render(
  <StateContextProvider>
    <App />
  </StateContextProvider>,
  document.getElementById('root')
);
