import {configureStore} from '@reduxjs/toolkit';
import {gnbSlice} from './Slice';

const store = configureStore({
    reducer:{
        gnbMenu:gnbSlice.reducer,
    }
});

export default store;