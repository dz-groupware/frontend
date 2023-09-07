import React from 'react';
import { Provider } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from "./pages/LoginPage";
import GlobalStyle from './GlobalStyle';
import Home from './pages/Home';
import store from './utils/Store';
import { Route, Routes } from 'react-router-dom';

//const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <GlobalStyle/>
      <Provider store={store}>
          <div className="App">
            <Routes>
              <Route path='/login' element={<LoginPage />} /> 
              <Route path='/*' element={<Home/>}/>
            </Routes>
          </div>
      </Provider>
    </>

    // <>
    //   <QueryClientProvider client={queryClient}>
    //     <GlobalStyle/>
    //     <Routes>
    //       <Route path='/' element={<LoginPage/>}/>
    //       <Route path='/login' element={<LoginPage/>} />
    //       <Route path='/roleSetting' element={<RoleSettingPage/>} />
    //     </Routes>
    //     <ReactQueryDevtools/>
    //   </QueryClientProvider>
    // </>
  );
}



