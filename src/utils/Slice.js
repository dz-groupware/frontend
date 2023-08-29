import {createSlice} from '@reduxjs/toolkit';

export const menuSlice = createSlice({
    name: 'gnbMenu',
    initialState: {
        menu: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
        favor: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
        profileList: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
        key: 12,
    },
    reducers: {
        menu:(state, action) => {state.menu = action.payload;},
        favor:(state, action) => {state.favor = action.payload;},
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
        load:(state, action) => {
            if (localStorage.getItem(action.payload)) {
                console.log(`[recet] emp_id:${action.payload} is not null`)
                state.recent = localStorage.getItem(action.payload)
            } else {
                console.log(`[recet] emp_id:${action.payload} is null`)
                localStorage.setItem(`${action.payload}`, '[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]')
            };
        },
        add:(state, action) => { state.recent = state.recent + action.payload },
        remove:(state, action) => {},
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

export const {menu, favor, recent, profileList, key} = menuSlice.actions;
export const {load} = recentSlice.actions;
export const {profile, search, alert, org, set} = modalSlice.actions;

