import React from 'react';
import { Provider } from 'react-redux';
//import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from "./pages/LoginPage";
import GlobalStyle from './GlobalStyle';
import store from './utils/Store';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Error } from './pages/VIEW';

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
              <Route path='/error' element={<Error />} />
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



