import { configureStore } from '@reduxjs/toolkit';
import { loginSlice, companyMgmtSlice, employeeMgmtSlice, authGroupSlice } from './Slice';

const store = configureStore({
    reducer:{
        loginInfo: loginSlice.reducer,
        companyMgmt: companyMgmtSlice.reducer,
        employeeMgmt: employeeMgmtSlice.reducer,
        authGroupSlice: authGroupSlice.reducer,
    }
});

export default store;