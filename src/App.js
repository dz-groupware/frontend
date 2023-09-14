import React from 'react';
import { Provider } from 'react-redux';
import LoginPage from "./pages/LoginPage";
import GlobalStyle from './GlobalStyle';
import store from './utils/Store';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Error } from './pages/VIEW';


export default function App() {
  return (
    <>
      <GlobalStyle/>
      <Provider store={store}>
          <div className="App">
            <Routes>
              <Route path='/login' element={<LoginPage />} /> 
              <Route path='/*' element={<Home/>}/>
              <Route path='/error' element={<Error />} />
            </Routes>
          </div>
      </Provider>
    </>

  );
}



