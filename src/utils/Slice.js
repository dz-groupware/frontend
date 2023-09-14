import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { addAuthApi, getAuthGroupApi } from '../api/authgroup';
//jane
const companyMgmtInitialState = {
    companyInfo: {
      id: '',
      code: '',
      enabledYn: '',
      name: '',
      abbr: '',
      businessType: '',
      repName: '',
      repIdNum: '',
      repTel: '',
      businessNum: '',
      corpType: '',
      corpNum: '',
      establishmentDate: '',
      openingDate: '',
      closingDate: '',
      address: '',
      deletedYn: false
    },
    idForForm: null,
    isVisible: false,
    searchList: JSON.parse('[{"":""}]')
  };
  
   const employeeMgmtInitialState = {
    employeeInfo: {
      id: '',
      imageUrl:'',
      name: '',
      IdNum: '',
      gender: '',
      accountYn: '',
      loginId: '',
      loginPw: '',
      businessNum: '',
      email: '',
      privEmail: '',
      mobileNumber: '',
      homeNumber: '',
      address: '',
      joinDate: '',
      resignationDate: '',
      deletedYn: false
    },
    idForForm: null,
    isVisible: false,
    searchList: JSON.parse('[{"":""}]')
  }
  
export const  menuSlice = createSlice({
    name: 'gnbMenu',
    initialState: {
        menu: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
        favor: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
        profileList: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
        empId: 12,
        compId: 1,
    },
    reducers: {
        menu:(state, action) => {state.menu = action.payload;},
        favor:(state, action) => {state.favor = action.payload;},
        profileList:(state, action) => {state.profileList = action.payload;},
        empId:(state, action) => {state.empId = action.payload;},
        compId:(state, action) => {state.compId = action.payload;},
    }
});

export const recentSlice = createSlice({
    name: 'recent',
    initialState: {
        recent: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
    },
    reducers: {
        load:(state, action) => {
            if (localStorage.getItem(action.payload)) {
                state.recent = localStorage.getItem(action.payload)
            } else {
                localStorage.setItem(`${action.payload}`, '[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]')
            };
        },
        add:(state, action) => { state.recent = state.recent + action.payload },
        remove:(state, action) => {},
    }
});

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
});

  
  export const companyMgmtSlice = createManagementSlice(companyMgmtInitialState, 'companyMgmt');
  export const employeeMgmtSlice = createManagementSlice(employeeMgmtInitialState, 'employeeMgmt');
  
  function createManagementSlice(initialState, sliceName) {
    // info의 키 이름을 동적으로 가져옵니다 (예: companyInfo 또는 employeeInfo).
    const infoKey = Object.keys(initialState).find(key => key.endsWith('Info'));
  
    return createSlice({
      name: sliceName,
      initialState,
      reducers: {
        searchInfo: (state, action) => {
          state.searchList = action.payload;
          state.isSearchExecuted = true;
        },
        updateInfo: (state, action) => {
          state[infoKey] = action.payload; // 수정
        },
        showForm: (state, action) => {
          state.isVisible = true;
          state[infoKey] = action.payload && action.payload[infoKey]
            ? { ...state[infoKey], ...action.payload[infoKey] } // 수정
            : { ...initialState[infoKey] }; // 수정
          state.idForForm = action.payload ? action.payload[infoKey].id : null;
        },
        hideForm: (state) => {
          state.isVisible = false;
          state.idForForm = null;
        }
      }
    });
  }
  export const fetchAuthGroups = createAsyncThunk(
    'authGroup/fetchAuthGroups',
    async (queryParams) => {
      try {
        const response = await getAuthGroupApi({ params: queryParams });
        return response.data;
      } catch (error) {
        throw Error(error);
      }
    }
  );
  export const addAuthGroup = createAsyncThunk('authGroup/addAuthGroup', async (newAuthGroup, { dispatch }) => {
    await addAuthApi({ data: newAuthGroup });
    dispatch(fetchAuthGroups()); // 새 권한을 추가한 후 목록을 새로고침
  });
  export const authGroupSlice = createSlice({
    name: 'authGroup',
    initialState: {
      data: [],
      hasMore: true,
      isLoading: false,
      error: null,
    },
    reducers: {
      fetchDataStart: (state) => {
        state.isLoading = true;
      },
      fetchDataSuccess: (state, action) => {
        state.isLoading = false;
        state.data = [...state.data, ...action.payload.data];
        state.hasMore = action.payload.hasMore;
      },
      fetchDataFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      resetData: (state) => {
        state.data = [];
        state.hasMore = true;
      },
    },
  });

export const {menu, favor, recent, profileList, empId, compId} = menuSlice.actions;
export const {load} = recentSlice.actions;
export const {profile, search, alert, org, set} = modalSlice.actions;
export const companyActions = companyMgmtSlice.actions;
export const employeeActions = employeeMgmtSlice.actions;

