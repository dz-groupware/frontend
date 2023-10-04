import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import GlobalStyle from './GlobalStyle';

import store from './utils/Store';
import LoginPage from "./pages/LoginPage";
import GnbLayout from './pages/GnbLayout';
import { Test } from './pages/VIEW';
import ERR_NETWORK from './components/Error/ERR_NETWORK';

export default function App() {
  return (
    <>
      <GlobalStyle/>
      <Provider store={store}>
        <div className="App">
          <Suspense fallback={<div>로딩중...</div>}>
            <Routes>
              <Route path='/login' element={<LoginPage />} /> 
              <Route path='/*' element={<GnbLayout/>}/>
              <Route path='/test' element={<Test />} />
              <Route path='/ERR_NETWORK' element={<ERR_NETWORK />} />
            </Routes>
          </Suspense>
        </div>
      </Provider>
    </>
  );
}