import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { ThemeProvider } from "styled-components";

import theme from "./utils/theme";
import store from "./utils/Store";
import GlobalStyle from "./GlobalStyle";

import LoginPage from "./pages/LoginPage";
import GnbLayout from "./pages/GnbLayout";
import ErrNetwork from "./pages/Error/ErrNetwork";
import ServiceUnavailable from "./pages/Error/ServiceUnavailable";
// import Test from './pages/Test'

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <div className="App">
          <Suspense fallback={<div>로딩중...</div>}>
            <ThemeProvider theme={theme}>
              <Routes>
                <Route 
                  path="/login" 
                  element={<LoginPage />} 
                /> 
                <Route 
                  path="/" 
                  element={<LoginPage />} 
                /> 
                <Route 
                  path="/*" 
                  element={<GnbLayout />}
                />
                {/* <Route 
                  path="/test" 
                  element={<Test />}
                 />  */}
                <Route 
                  path="/ERR_NETWORK" 
                  element={<ErrNetwork />}
                 />                
                <Route 
                  path="/SERVICE_UNAVAILABLE" 
                  element={<ServiceUnavailable />}
                />
              </Routes>
            </ThemeProvider>
          </Suspense>
        </div>
      </Provider>
    </>
  );
}