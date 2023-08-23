import {configureStore} from '@reduxjs/toolkit';
import {gnbSlice, menuSlice, recentSlice} from './Slice';

const store = configureStore({
    reducer:{
        gnbSwitch:gnbSlice.reducer,
        gnbMenu:menuSlice.reducer,
        recentMenu:recentSlice.reducer,
    }
});

export default store;