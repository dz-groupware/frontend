import {configureStore} from '@reduxjs/toolkit';
import {gnbSlice, menuSlice, recentSlice, modalSlice} from './Slice';

const store = configureStore({
    reducer:{
        gnbSwitch:gnbSlice.reducer,
        gnbMenu:menuSlice.reducer,
        recentMenu:recentSlice.reducer,
        modalSwitch:modalSlice.reducer,
    }
});

export default store;