import React from 'react';
import {Provider} from 'react-redux';

import store from './utils/Store';
import Home from './pages/Home';

import { BrowserRouter } from 'react-router-dom';

export default function Layout() {

  return (
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
  );
}

