import {createSlice} from '@reduxjs/toolkit';

//
export const gnbSlice = createSlice({
    name: 'gnbMenu',
    initialState: {
        hover:false,
        menu:false,
        favor:false,
        recent:false,
    },
    reducers: {
        hover_on:(state, action) => {
            console.log('hover on : ', state.hover);
            if (state.hover === true) {
                console.log('hover true ->', false);
                state.hover = false;
                state.menu = false;
                state.favor = false;
                state.recent = false;    
            }
            else if (state.hover === false) {
                console.log('hover false ->', true);
                state.hover = true;
                state.menu = true;
                state.favor = false;
                state.recent = false;
            }
        },
        menu_on:(state, action) => {
            console.log('state menu : ', state.menu, state.recent, state.recent);
            state.menu = true;
            state.favor = false;
            state.recent = false;
        },
        favor_on:(state, action) => {
            console.log('state favor : ', state.favor, state.recent, state.recent)
            state.menu = false;
            state.favor = true;
            state.recent = false;
        },
        recent_on:(state, action) => {
            console.log('state recent : ', state.recent, state.recent, state.recent)
            state.menu = false;
            state.favor = false;
            state.recent = true;
        },
    }
})

//
export const {hover_on, menu_on, favor_on, recent_on} = gnbSlice.actions;