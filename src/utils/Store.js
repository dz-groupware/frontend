import { configureStore } from '@reduxjs/toolkit';
import { menuSlice, recentSlice, modalSlice, companyMgmtSlice, employeeMgmtSlice, authGroupSlice } from './Slice';
import { uploadMiddleware } from './thunk';

const store = configureStore({
    reducer:{
        gnbMenu:menuSlice.reducer,
        recentMenu:recentSlice.reducer,
        modalSwitch:modalSlice.reducer,
        companyMgmt: companyMgmtSlice.reducer,
        employeeMgmt: employeeMgmtSlice.reducer,
        authGroupSlice: authGroupSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>[
        ...getDefaultMiddleware({
            serializableCheck: false,
        }),
        uploadMiddleware
    ],

    
});

export default store;