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
  }).then(response => {
    return response.data;
  }).catch(error => {
    throw error;
  });
};

export const getCountAuthGroupApi = async () => {
  try {
    const response = await axiosInstance.get(`/auth-group/companies/auth/count`);
    return response.data;
  } catch (error) {
    throw new Error('count를 받아올 수가 없습니다.');
  }
}

export const getCompanyGnbListApi = async () => {
  try {
    const response = await axiosInstance.get(`/auth-group/companies/gnb-list`);
    return response.data;
  } catch (error) {
    console.error(error);  // 상세 에러 정보 출력
    throw new Error('gnb를 받아올 수가 없습니다.');
}
};

export const getCompanyLnbListApi = async ({ paths }) => {
  const { parId } = paths;
  return axiosInstance.get(`/auth-group/companies/gnb/${parId}/lnb-list`)
    .then(response => {
      return response.data;
    }).catch(error => {
      console.error('getLnbListApi 에러:', error);
      throw new Error(`Auth group data could not be retrieved. ${error.message}`);
    });;
};

export const getGnbListOfAuthApi = async ({ paths }) => {
  const { authId } = paths
  return axiosInstance.get(`/auth-group/companies/auth/${authId}/gnb`)
  .then(response => {
    return response.data;
  }).catch(error => {
    console.error('getGnbListOfAuthApi 에러:', error);
    throw new Error(`Auth group data could not be retrieved. ${error.message}`);
  });
};

export const getLnbListOfAuthApi = async ({ paths }) => {
  const { authId,parId } = paths
  return axiosInstance.get(`/auth-group/companies/auth/${authId}/gnb/${parId}`)
  .then(response => {
    return response.data;
  }).catch(error => {
    console.error('getLnbListOfAuthApi 에러:', error);
    throw new Error(`Auth group data could not be retrieved. ${error.message}`);
  });
};

export const getGnbListOfAuthWithAllApi = async ({ paths }) => {
  const {authId} = paths
  return axiosInstance.get(`/auth-group/companies/auth/${authId}/gnb-all`)
  .then(response => {
    return response.data;
  }).catch(error => {
    console.error('getGnbListOfAuthWithAllApi 에러:', error);
    throw new Error(`Auth group data could not be retrieved. ${error.message}`);
  });
}
export const getLnbListOfAuthWithAllApi = async ({ paths }) => {
  const {authId, parId} = paths
  return axiosInstance.get(`/auth-group/companies/auth/${authId}/gnb-all/${parId}`)
  .then(response => {
    return response.data;
  }).catch(error => {
    console.error('getLnbListOfAuthWithAllApi 에러:', error);
    throw new Error(`Auth group data could not be retrieved. ${error.message}`);
  });
}

export const getUserListOfAuthApi = async ({ paths }) => {
  const { authId } = paths;
  // authId가 null이거나 undefined인지 확인
  if (authId === null || authId === undefined) {
    throw new Error("authId is not defined");
  }
  
  return axiosInstance.get(`/auth-group/auth/${authId}`)
  .then(response => {
    return response.data;
  }).catch(error => {
    throw error;  // 혹은 적절한 오류 응답을 반환하세요.
  });
}

export const addAuthApi = async ({ data }) => {
  return axiosInstance.post(`/auth-group/auth`,data)
  .then(response => {
    return 
  }).catch(error => {
    throw error;
  })
}