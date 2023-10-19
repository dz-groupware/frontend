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
    privEmail: '',
    repTel: '',
    gender: '',
    loginId: '',
    loginPw: '',
    businessNum: '',
    corpType: '',
    corpNum: '',
    establishmentDate: '',
    openingDate: '',
    closingDate: '',
    address: '',
    deletedYn: false,
    employeeId: null,
  },
  idForForm: null,
  isVisible: false,
  searchList: JSON.parse('[{"":""}]'),
  isDuplicated: false,
  isSignUpChecked: false,
  isSearchValue: null,
  isSelectedOption: "",
  loginCompanyId: "",
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
    departmentId: '',
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
  isSearchValue: null,
  isSelectedOption: "",
  loginCompanyId: "",
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
        // 기존 loginCompanyId 값을 임시 변수에 저장합니다.
        const currentLoginCompanyId = state.loginCompanyId;
      
        // state를 initialState로 재설정합니다.
        state = { ...initialState };
      
        // loginCompanyId만 이전 상태를 유지하도록 다시 설정합니다.
        state.loginCompanyId = currentLoginCompanyId;
      
        return state;  // 수정된 상태를 반환합니다.
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
      updateUploadedFile: (state, action) => {
        state.uploadedFile = action.payload;
        state.employeeBasicInfo.imageUrl = action.payload;
      },
      setPreviousGroupsInfo: (state, action) => {
        state.previousGroupsInfo = action.payload;
      },
      restorePreviousGroupsInfo: (state) => {
        if (state.previousGroupsInfo) {
          state.employeeGroupInfo = state.previousGroupsInfo;
        }
      },
      setSearchValue: (state, action) => {
        state.isSearchValue = action.payload;
        state.isSearchExecuted = true;
      },
      setSelectedOption: (state, action) => {
        state.isSelectedOption = action.payload;
        state.isSearchExecuted = true;
      },
      setLoginCompanyId: (state, action) => {
        state.loginCompanyId = action.payload;
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

export const favorSlice = createSlice({
  name: 'favor',
  initialState: {
    favor: [],
  },
  reducers: {
    favor: (state, action) => { state.favor = action.payload }
  }
});

export const { favor } = favorSlice.actions;
export const companyActions = companyMgmtSlice.actions;
export const employeeActions = employeeMgmtSlice.actions;