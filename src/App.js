import CompanyMgmtPage from "./pages/CompanyMgmtPage";
import React from 'react';
import { Provider } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';





const companySlice = createSlice({
  name: 'company',
  initialState: {
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
      address: ''
    },
    isVisible: false
  },
  reducers: {
    updateInfo: (state, action) => {
      state.info = action.payload;
    },showForm: (state) => {
      state.isVisible = true;
    },
    hideForm: (state) => {
      state.isVisible = false;
    },
    
  }
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
        {/* <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CompanyMgmtPage />} /> 
                    <Route path="/companyMgmtForm" element={<CompanyMgmtForm />} />
                </Routes>
            </BrowserRouter> */}
        </div>
      
    </Provider>
  );
}



export const { updateInfo, showForm, hideForm } = companySlice.actions;
