import { configureStore } from '@reduxjs/toolkit';
import { menuSlice, recentSlice, modalSlice, companyMgmtSlice, employeeMgmtSlice } from './Slice';

const store = configureStore({
    reducer:{
        gnbMenu:menuSlice.reducer,
        recentMenu:recentSlice.reducer,
        modalSwitch:modalSlice.reducer,
        companyMgmt: companyMgmtSlice.reducer,
        employeeMgmt: employeeMgmtSlice.reducer,
    }
});

export default store;