import { configureStore } from '@reduxjs/toolkit';
import { favorSlice, companyMgmtSlice, employeeMgmtSlice, authGroupSlice } from './Slice';
import { uploadMiddleware } from './thunk';

const store = configureStore({
    reducer:{
        favor: favorSlice.reducer,
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