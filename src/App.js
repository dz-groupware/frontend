import CompanyMgmtPage from "./pages/CompanyMgmtPage";
import React from 'react';
import { Provider } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';




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


const companySlice = createSlice({
  name: 'company',
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
      state.codeForForm = action.payload ? action.payload.code : null;
      state.info = action.payload && action.payload.info
      ? { ...state.info, ...action.payload.info }
      : { ...initialState.info };
    },
    hideForm: (state) => {
      state.isVisible = false;
      state.codeForForm = null;
    },
    
  },
});







const store = configureStore({
  reducer: {
    company: companySlice.reducer,
  }
});


export default function App() {
  return (
    <Provider store={store}>
      
        <div className="App">
        <CompanyMgmtPage />
       
        </div>
      
    </Provider>
  );
}



export const { searchInfo, updateInfo, showForm, hideForm } = companySlice.actions;