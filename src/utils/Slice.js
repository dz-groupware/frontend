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
  activeTab: 'basic',
  isDuplicated: false,
  isSignUpChecked: false, 
  uploadedFile: null,
  
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

const initialState = {
  menu: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
  favor: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
  profileList: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
  empId: getIdFormLocal('empId', ""),
  compId: getIdFormLocal('compId', ""),
}
export const menuSlice = createSlice({
  name: 'gnbMenu',
  initialState,
  reducers: {
    menu: (state, action) => { state.menu = action.payload; },
    favor: (state, action) => { state.favor = action.payload; },
    profileList: (state, action) => { state.profileList = action.payload; },
    newEmpId: (state, action) => { state.empId = action.payload; },
    newCompId: (state, action) => { state.compId = action.payload; },
  }
});

export const recentSlice = createSlice({
  name: 'recent',
  initialState: {
    recent: JSON.parse('[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]'),
  },
  reducers: {
    load: (state, action) => {
      if (localStorage.getItem(action.payload)) {
        state.recent = localStorage.getItem(action.payload)
      } else {
        localStorage.setItem(`${action.payload}`, '[{"empId": "","menuId": "","parId": "","name": "","iconUrl": ""}]')
      };
    },
    add: (state, action) => { state.recent = state.recent + action.payload },
    remove: (state, action) => { },
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
    profile: (state) => { state.profile = !state.profile; },
    search: (state) => { state.search = !state.search; },
    alert: (state) => { state.alert = !state.alert; },
    org: (state) => { state.org = !state.org; },
    set: (state) => { state.set = !state.set; },
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
      updateBasicInfo: (state, action) => {
        state.employeeBasicInfo = action.payload;
      },
      updateGroupInfo: (state, action) => {
        if (Array.isArray(action.payload)) {  // 전달된 payload가 배열인지 확인
          state.employeeGroupInfo = action.payload.map(data => ({
            departmentId: data.departmentId,
            position: data.position,
            compId: data.compId,
            deptId: data.deptId,
            transferredYn: data.transferredYn,
            edjoinDate: data.edjoinDate,
            leftDate: data.leftDate,
            deletedYn: data.deletedYn
          }));
        } else {
          console.warn("Expected an array for updateGroupInfo but received:", action.payload);
        }
      },

      clearInfo: (state) => {
        // 현재 활성화된 탭에 따라 정보를 초기화
        if (state.activeTab === 'basic') {
          state.employeeBasicInfo = { ...initialState.employeeBasicInfo };
        } else if (state.activeTab === 'group') {
          state.employeeGroupInfo = { ...initialState.employeeGroupInfo };
        }
      },

      showForm: (state, action) => {
        state.isVisible = true;
        if (Array.isArray(action.payload)) { // 배열로 받아온 경우
          const firstItem = action.payload[0];
          state[infoKey] = {
            ...state[infoKey],
            ...firstItem,
          };

          state.idForForm = firstItem.id;
        } else if (action.payload && action.payload[infoKey]) {
          state[infoKey] = {
            ...state[infoKey],
            ...action.payload[infoKey],
          };
          state.idForForm = action.payload[infoKey].id;
        } else {
          state.idForForm = null;


        }
        state.activeTab = initialState.activeTab;

        
      },
      hideForm: (state) => {
        state.isVisible = false;
        state.idForForm = null;
      },
      resetState: (state) => {
        state.employeeBasicInfo = { ...employeeMgmtInitialState.employeeBasicInfo };
        state.employeeGroupInfo = [...employeeMgmtInitialState.employeeGroupInfo];
        state.idForForm = employeeMgmtInitialState.idForForm;
        state.isVisible = employeeMgmtInitialState.isVisible;
        state.searchList = [...employeeMgmtInitialState.searchList];
        state.activeTab = employeeMgmtInitialState.activeTab;
        state.isDuplicated = employeeMgmtInitialState.isDuplicated;
        state.isSignUpChecked = employeeMgmtInitialState.isSignUpChecked;
      },
      setActiveTab: (state, action) => {
        state.activeTab = action.payload;
      },

      setDuplicated: (state, action) => {
        state.isDuplicated = action.payload;
      },
      setSignUpChecked: (state, action) => {
        state.isSignUpChecked = action.payload;
      },
      updateUploadedFileUrl: (state, action) => {
        state.employeeBasicInfo.imageUrl = action.payload;
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

export const { menu, favor, recent, profileList, newEmpId, newCompId } = menuSlice.actions;
export const { load } = recentSlice.actions;
export const { profile, search, alert, org, set } = modalSlice.actions;
export const companyActions = companyMgmtSlice.actions;
export const employeeActions = employeeMgmtSlice.actions;

