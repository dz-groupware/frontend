import React from 'react';
import { Provider } from 'react-redux';
import LoginPage from "./pages/LoginPage";
import GlobalStyle from './GlobalStyle';
import store from './utils/Store';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Error } from './pages/VIEW';
import {ErrorBoundary} from 'react-error-boundary';
import EmployeeMgmtPage from '../src/pages/EmployeeMgmtPage'


const ErrorFallback = (err) => {
  return (<div>### error ###</div>);
}

export default function App() {
  return (
    <>
      <GlobalStyle/>
      <Provider store={store}>
          <div className="App">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Routes>
                <Route path='/login' element={<LoginPage />} /> 
                <Route path='/*' element={<Home/>}/>
                <Route path='/error' element={<Error />} />
              </Routes>
            </ErrorBoundary>

          

          </div>
      </Provider>
    </>

  );
}



