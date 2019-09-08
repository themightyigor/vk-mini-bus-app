import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vk-connect';
import App from './App';
import { RouterProvider } from 'react-router5';
import createRouter from './create-router';
import StateContextProvider from './contexts/StateContext';

// import registerServiceWorker from './sw';

// Init VK  Mini App
connect.send('VKWebAppInit', {});

const router = createRouter();

router.start(() => {
  ReactDOM.render(
    <StateContextProvider>
      <RouterProvider router={router}>
        <App router={router} />
      </RouterProvider>
    </StateContextProvider>,
    document.getElementById('root')
  );
});
