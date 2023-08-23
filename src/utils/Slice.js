import {createSlice} from '@reduxjs/toolkit';

//
export const gnbSlice = createSlice({
    name: 'gnbSwitch',
    initialState: {
        hover:false,
        menu:false,
        favor:false,
        recent:false,
    },
    reducers: {
        hover_on:(state) => {
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
        menu_on:(state) => {
            console.log('state menu : ', state.menu, state.recent, state.recent);
            state.menu = true;
            state.favor = false;
            state.recent = false;
        },
        favor_on:(state) => {
            console.log('state favor : ', state.favor, state.recent, state.recent)
            state.menu = false;
            state.favor = true;
            state.recent = false;
        },
        recent_on:(state) => {
            console.log('state recent : ', state.recent, state.recent, state.recent)
            state.menu = false;
            state.favor = false;
            state.recent = true;
        },
    }
})
export const menuSlice = createSlice({
    name: 'gnbMenu',
    initialState: {
        menu: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
        favor: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
        recent: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
        profileList: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
        key: 1,
    },
    reducers: {
        menu:(state, action) => {state.menu = action.payload;},
        favor:(state, action) => {state.favor = action.payload;},
        recent:(state, action) => {
            if (localStorage.getItem(action.payload)) {
                console.log(`[recet] emp_id:${action.payload} is not null`)
                state.recent = localStorage.getItem(action.payload)
            } else {
                console.log(`[recet] emp_id:${action.payload} is null`)
                localStorage.setItem(`${action.payload}`, '[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]')
            };
        },
        profileList:(state, action) => {state.profileList = action.payload;},
        key:(state, action) => {state.key = action.payload;},
    }
})
export const recentSlice = createSlice({
    name: 'recent',
    initialState: {
        recent: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
    },
    reducers: {
        menu:(state, action) => {state.menu = action.payload;},
        favor:(state, action) => {state.favor = action.payload;},
        remove:(state, action) => {
            if (localStorage.getItem(action.payload)) {
                console.log(`[recet] emp_id:${action.payload} is not null`)
                state.recent = localStorage.getItem(action.payload)
            } else {
                console.log(`[recet] emp_id:${action.payload} is null`)
                localStorage.setItem(`${action.payload}`, '[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]')
            };
        },
    }
})
export const modalSlice = createSlice({
    name: 'modalSwitch',
    initialState: {
        profile: false,
        search: false,
        alert: false,
        org: false,
        set: false,
    },
    reducers: {
        profile:(state) => {state.profile = !state.profile;},
        search:(state) => {state.search = !state.search;},
        alert:(state) => {state.alert = !state.alert;},
        org:(state) => {state.org = !state.org;},
        set:(state) => {state.set = !state.set;},
    }
})

export const {hover_on, menu_on, favor_on, recent_on} = gnbSlice.actions;
export const {menu, favor, recent, profileList, key} = menuSlice.actions;
export const {remove} = recentSlice.actions;
export const {profile, search, alert, org, set} = modalSlice.actions;

