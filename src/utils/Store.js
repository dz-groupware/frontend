import { configureStore } from '@reduxjs/toolkit';
import { menuSlice, recentSlice, modalSlice } from './Slice';

const store = configureStore({
    reducer:{
        gnbMenu:menuSlice.reducer,
        recentMenu:recentSlice.reducer,
        modalSwitch:modalSlice.reducer,
    }
});

export default store;