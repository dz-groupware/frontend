import { axiosInstance } from '../utils/axiosInstance';

/**
 * 수정해야함
 */
export const getAuthGroupApi = async ({ params, headers }) => {
  const { lastId, lastAuthName, pageSize, orderBy, searchTerm } = params; 
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.get(`/auth-group/companies/auth/list`, {
    params: {
      lastId,
      lastAuthName,
      pageSize,
      orderBy,
      searchTerm
    }
  })
  .then(response => response)
  .catch(error => { throw new Error('권한리스트를 가져올 수가 없습니다.'); });
};

export const getCountAuthGroupApi = async ({headers}) => {
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.get(`/auth-group/companies/auth/count`)
    .then(response => response)
    .catch(error => { throw new Error('권한리스트의 count를 받아올 수가 없습니다.'); });
};


export const getCompanyGnbListApi = async ({ params, headers }) => {
  const { enabledYn } = params;
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.get(`/auth-group/companies/gnb-list`,{ params:{ enabledYn } })
    .then(response => response)
    .catch(error => { throw new Error('회사의 gnb를 받아올 수가 없습니다.'); });
};

export const getCompanyLnbListApi = async ({ paths, params, headers }) => {
  const { parId } = paths;
  const { enabledYn } = params;
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.get(`/auth-group/companies/gnb/${parId}/lnb-list`,{ params: { enabledYn } })
    .then(response => response)
    .catch(error => { throw new Error('회사의 lnb리스트를 받아올 수가 없습니다.'); });
};

export const getGnbListOfAuthApi = async ({ paths, headers }) => {
  const { authId } = paths
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.get(`/auth-group/companies/auth/${authId}/gnb`)
  .then(response => { return response; })
  .catch(error => { throw new Error(`권한의 gnb리스트를 받아올 수가 없습니다.`); });
};

export const getLnbListOfAuthApi = async ({ paths, headers }) => {
  const { authId,parId } = paths;
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.get(`/auth-group/companies/auth/${authId}/gnb/${parId}`)
  .then(response => { return response; })
  .catch(error => { throw new Error('권한의 lnb리스트를 받아올 수가 없습니다.'); });
};

export const getGnbListOfAuthWithAllApi = async ({ paths, headers }) => {
  const {authId} = paths;
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.get(`/auth-group/companies/auth/${authId}/gnb-all`)
  .then(response => { return response; })
  .catch(error => { throw new Error('수정중인 권한의 gnb리스트를 받아올 수가 없습니다.'); });
}
export const getLnbListOfAuthWithAllApi = async ({ paths, headers }) => {
  const {authId, parId} = paths;
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.get(`/auth-group/companies/auth/${authId}/gnb-all/${parId}`)
  .then(response => { return response; })
  .catch(error => { throw new Error('수정중인 권한의 lnb리스트를 받아올 수가 없습니다.'); });
}

export const getUserListOfAuthApi = async ({ paths, headers }) => {
  const { authId } = paths;
  // authId가 null이거나 undefined인지 확인
  if (authId === null || authId === undefined) {
    throw new Error("authId is not defined");
  }
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.get(`/auth-group/auth/${authId}/employees`)
  .then(response => { return response; })
  .catch(error => { throw error; })
}

export const addAuthApi = async ({ data, headers }) => {
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.post(`/auth-group/auth`,data)
  .then(response => { return response; })
  .catch(error => { throw error; })
}

export const modifyMappedMenuOfAuthApi = async ({ paths, data, headers }) => {
  const { authId } = paths;
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.post(`/auth-group/auth/${authId}/menu-mappings`,data)
  .then(response => { return response; })
  .catch(error => { throw error; });
}

export const deleteAuthApi = async ({ paths, headers }) => {
  const { authId } = paths;
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.delete(`/auth-group/auth/${authId}`)
  .then(response =>{ return response; })
  .catch(error => { throw error; });
}

export const getEmpAuthGroupApi = ({ params, headers }) => {
  const { employeeId, lastId, lastAuthName, pageSize, orderBy, searchTerm } = params; 
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.get(`/auth-group/employees/auth/list`, {
    params: {
      employeeId,
      lastId,
      lastAuthName,
      pageSize,
      orderBy,
      searchTerm
    }
  })
  .then(response => response)
  .catch(error => { throw new Error('권한리스트를 가져올 수가 없습니다.'); });
};
export const getEmpAuthGroupEditApi = ({ params, headers }) => {
  const { employeeId, lastId, lastAuthName, pageSize, orderBy, searchTerm } = params; 
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.get(`/auth-group/employees/auth/list/edit`, {
    params: {
      employeeId,
      lastId,
      lastAuthName,
      pageSize,
      orderBy,
      searchTerm
    }
  })
  .then(response => response)
  .catch(error => { throw new Error('권한리스트를 가져올 수가 없습니다.'); });
};

export const getEmpAuthCountApi = ({ paths, headers }) => {
  const { employeeId } = paths;
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.get(`/auth-group/employees/${employeeId}/count`)
  .then(response => response)
  .catch(error => { throw new Error('권한개수를 가져올 수가 없습니다.'); })
}


export const addEmployeeAuthApi = async ({ data, headers }) => {
  axiosInstance.defaults.headers['menuId'] = headers.menuId;
  return axiosInstance.post(`/auth-group/employee/auth`,data)
  .then(response => { 
    console.log(response);
    return response; })
  .catch(error => { throw error; })
}