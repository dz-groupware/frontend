import { configureStore } from '@reduxjs/toolkit';
import { companyMgmtSlice, employeeMgmtSlice, authGroupSlice } from './Slice';

const store = configureStore({
    reducer:{
        companyMgmt: companyMgmtSlice.reducer,
        employeeMgmt: employeeMgmtSlice.reducer,
        authGroupSlice: authGroupSlice.reducer,
    }
});

export default store;