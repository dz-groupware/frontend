import CompanyMgmtPage from "./pages/CompanyMgmtPage";
import React from 'react';
import { Provider } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import EmployMgmtPage from "./pages/EmployMgmtPage";
import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import LoginPage from './pages/LoginPage';
import RoleSettingPage from './pages/RoleSettingPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();




const initialState = {
  info: {
    code: '',
    enabledYn: '',
    name: '',
    abbr: '',
    businessType: '',
    repName: '',
    repIdNum: '',
    repTel: '',
    businessNum: '',
    corpType: '',
    corpNum: '',
    establishmentDate: '',
    openingDate: '',
    closingDate: '',
    address: '',
    deletedYn: false
  },
  codeForForm: null,
  isVisible: false,
  searchList: JSON.parse('[{"":""}]')
};


const companyMgmtSlice = createSlice({
  name: 'companyMgmt',
  initialState ,
  reducers: {
    searchInfo: (state, action) => {
      state.searchList = action.payload;
      state.isSearchExecuted = true; 
    },
    updateInfo: (state, action) => {
      state.info = action.payload;
    },
    showForm: (state, action) => {
      state.isVisible = true;
      console.log( state.codeForForm);

      state.info = action.payload && action.payload.info
      ? { ...state.info, ...action.payload.info }
      : { ...initialState.info };
      
      state.codeForForm = action.payload ? action.payload.code : null;

      console.log( state.codeForForm);
     
    },
    hideForm: (state) => {
      state.isVisible = false;
      state.codeForForm = null;
    },
    
  },
});







const store = configureStore({
  reducer: {
    companyMgmt: companyMgmtSlice.reducer,

  }
});


export default function App() {
  return (
    <Provider store={store}>
      
        <div className="App">
        <CompanyMgmtPage />
       
        </div>
      
    </Provider>
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle/>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/roleSetting' element={<RoleSettingPage/>} />
        </Routes>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </>
  );
}



export const { searchInfo, updateInfo, showForm, hideForm } = companyMgmtSlice.actions;