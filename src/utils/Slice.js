import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addAuthApi, getAuthGroupApi } from '../api/authgroup';
//jane
const companyMgmtInitialState = {
  companyInfo: {
    id: '',
    parId: '',
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
  employeeBasicInfo: {
    id: '',
    imageUrl: '',
    name: '',
    empIdNum: '',
    gender: '',
    accountYn: true,
    loginId: '',
    loginPw: '',
    privEmail: '',
    mobileNumber: '',
    homeNumber: '',
    address: '',
    joinDate: '',
    resignationDate: '',
    
  },
  employeeGroupInfo: [{
    departmentId:'',
    compId: '',
    deptId: '',
    position: '',
    transferredYn: false,
    edjoinDate: '',
    leftDate: '',
    deletedYn: false,
  }],
  idForForm: null,
  isVisible: false,
  searchList: JSON.parse('[{"":""}]'),
  activeTab: 'basic'
}

function getIdFormLocal(k, d) {
  try {
    const value = localStorage.getItem(k);
    if (value !== null) {
      return JSON.parse(value);
    }
    return d;
  } catch (error) {
    return d;
  }
}

export const loginSlice = createSlice({
  name: 'loginInfo',
  initialState : {
    isLogin: false,
    empId: getIdFormLocal('empId', ""),
    compId: getIdFormLocal('compId', ""),
  },
  reducers: {
    isLogin:(state) => {state.isLogin = !state.isLogin;},
    newEmpId:(state, action) => {state.empId = action.payload;},
    newCompId:(state, action) => {state.compId = action.payload;},
  }
});

  
  export const companyMgmtSlice = createManagementSlice(companyMgmtInitialState, 'companyMgmt');
  export const employeeMgmtSlice = createManagementSlice(employeeMgmtInitialState, 'employeeMgmt');
  
  function createManagementSlice(initialState, sliceName) {
    // info의 키 이름을 동적으로 가져옵니다 (예: companyInfo 또는 employeeBasicInfo).
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
          state.activeTab = initialState.activeTab;
        },
        hideForm: (state) => {
          state.isVisible = false;
          state.idForForm = null;
        }
        state.activeTab = initialState.activeTab;

      },
      hideForm: (state) => {
        state.isVisible = false;
        state.idForForm = null;
      },
      resetState: (state) => {
        state.isVisible = false;
        state.idForForm = null;
        return initialState;
      },
      setActiveTab: (state, action) => {
        state.activeTab = action.payload;
      },


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

export const { isLogin, newEmpId, newCompId } = loginSlice.actions;
export const companyActions = companyMgmtSlice.actions;
export const employeeActions = employeeMgmtSlice.actions;

