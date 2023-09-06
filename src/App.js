import CompanyMgmtPage from "./pages/CompanyMgmtPage";
import React from 'react';
import { Provider } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';


import { Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();


const companyMgmtInitialState = {
  companyInfo: {
    id: '',
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
  idForForm: null,
  isVisible: false,
  searchList: JSON.parse('[{"":""}]')
};

const employeeMgmtInitialState = {
  employeeInfo: {
    id: '',
    imageUrl:'',
    name: '',
    IdNum: '',
    gender: '',
    accountYn: '',
    loginId: '',
    loginPw: '',
    businessNum: '',
    email: '',
    privEmail: '',
    mobileNumber: '',
    homeNumber: '',
    address: '',
    joinDate: '',
    resignationDate: '',
    deletedYn: false
  },
  idForForm: null,
  isVisible: false,
  searchList: JSON.parse('[{"":""}]')
}


const companyMgmtSlice = createManagementSlice(companyMgmtInitialState, 'companyMgmt');
const employeeMgmtSlice = createManagementSlice(employeeMgmtInitialState, 'employeeMgmt');

function createManagementSlice(initialState, sliceName) {
  // info의 키 이름을 동적으로 가져옵니다 (예: companyInfo 또는 employeeInfo).
  const infoKey = Object.keys(initialState).find(key => key.endsWith('Info'));

  return createSlice({
    name: sliceName,
    initialState,
    reducers: {
      searchInfo: (state, action) => {
        state.searchList = action.payload;
        state.isSearchExecuted = true;
      },
      updateInfo: (state, action) => {
        state[infoKey] = action.payload; // 수정
      },
      showForm: (state, action) => {
        state.isVisible = true;
        state[infoKey] = action.payload && action.payload[infoKey]
          ? { ...state[infoKey], ...action.payload[infoKey] } // 수정
          : { ...initialState[infoKey] }; // 수정
        state.idForForm = action.payload ? action.payload[infoKey].id : null;
      },
      hideForm: (state) => {
        state.isVisible = false;
        state.idForForm = null;
      }
    }
  });
}




const store = configureStore({
  reducer: {
    companyMgmt: companyMgmtSlice.reducer,
    employeeMgmt: employeeMgmtSlice.reducer
  }
});

export default function App() {
  return (
    <Provider store={store}>
        <div className="App">
        <CompanyMgmtPage />
        </div>
    </Provider>
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

export const companyActions = companyMgmtSlice.actions;
export const employeeActions = employeeMgmtSlice.actions;

