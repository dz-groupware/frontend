import { axiosInstance } from '../utils/axiosInstance';

/**
 * 수정해야함
 */
export const getAuthGroupApi = ({ params }) => {
  const { lastId, lastAuthName, pageSize, orderBy, searchTerm } = params; 
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

export const getCountAuthGroupApi = () => {
  return axiosInstance.get(`/auth-group/companies/auth/count`)
    .then(response => response)
    .catch(error => { throw new Error('권한리스트의 count를 받아올 수가 없습니다.'); });
};


export const getCompanyGnbListApi = ({ params }) => {
  const { enabledYn } = params;
  return axiosInstance.get(`/auth-group/companies/gnb-list`,{ params:{ enabledYn } })
    .then(response => response)
    .catch(error => { throw new Error('회사의 gnb를 받아올 수가 없습니다.'); });
};

export const getCompanyLnbListApi = ({ paths, params }) => {
  const { parId } = paths;
  const { enabledYn } = params;
  return axiosInstance.get(`/auth-group/companies/gnb/${parId}/lnb-list`,{ params: { enabledYn } })
    .then(response => response)
    .catch(error => { throw new Error('회사의 lnb리스트를 받아올 수가 없습니다.'); });
};

export const getGnbListOfAuthApi = async ({ paths }) => {
  const { authId } = paths
  return axiosInstance.get(`/auth-group/companies/auth/${authId}/gnb`)
  .then(response => { return response; })
  .catch(error => { throw new Error(`권한의 gnb리스트를 받아올 수가 없습니다.`); });
};

export const getLnbListOfAuthApi = async ({ paths }) => {
  const { authId,parId } = paths
  return axiosInstance.get(`/auth-group/companies/auth/${authId}/gnb/${parId}`)
  .then(response => { return response; })
  .catch(error => { throw new Error('권한의 lnb리스트를 받아올 수가 없습니다.'); });
};

export const getGnbListOfAuthWithAllApi = async ({ paths }) => {
  const {authId} = paths
  return axiosInstance.get(`/auth-group/companies/auth/${authId}/gnb-all`)
  .then(response => { return response; })
  .catch(error => { throw new Error('수정중인 권한의 gnb리스트를 받아올 수가 없습니다.'); });
}
export const getLnbListOfAuthWithAllApi = async ({ paths }) => {
  const {authId, parId} = paths
  return axiosInstance.get(`/auth-group/companies/auth/${authId}/gnb-all/${parId}`)
  .then(response => { return response; })
  .catch(error => { throw new Error('수정중인 권한의 lnb리스트를 받아올 수가 없습니다.'); });
}

export const getUserListOfAuthApi = async ({ paths }) => {
  const { authId } = paths;
  // authId가 null이거나 undefined인지 확인
  if (authId === null || authId === undefined) {
    throw new Error("authId is not defined");
  }
  
  return axiosInstance.get(`/auth-group/auth/${authId}`)
  .then(response => { return response; })
  .catch(error => { throw error; })
}

export const addAuthApi = async ({ data }) => {
  return axiosInstance.post(`/auth-group/auth`,data)
  .then(response => { return response; })
  .catch(error => { throw error; })
}

export const modifyMappedMenuOfAuthApi = async ({ paths, data }) => {
  const { authId } = paths;
  return axiosInstance.post(`/auth-group/auth/${authId}/menu-mappings`,data)
  .then(response => { return response; })
  .catch(error => { throw error; });
}

export const deleteAuthApi = async ({ paths }) => {
  const { authId } = paths;
  return axiosInstance.delete(`/auth-group/auth/${authId}`)
  .then(response =>{ return response; })
  .catch(error => { throw error; });
}