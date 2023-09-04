import { axiosInstance } from '../utils/axiosInstance';

/**
 * 수정해야함
 */
export const getAuthGroup = ({ queryKey }) => {
  const [_ , companyId=1, pageSize=5, lastId, orderBy] = queryKey; //배열로구분
  
  return axiosInstance.get(`/auth-group/companies/${companyId}/auth`, {
    params: {
      lastId: lastId,
      pageSize: pageSize || 1,
      orderBy
    }
  }).then(response => {
    return response.data.data;
  });
};

export const getCountAuthGroup = async ({ queryKey }) => {
  try {
    const [_ , companyId, orderBy] = queryKey;
    const response = await axiosInstance.get(`/auth-group/companies/${companyId}/auth/count`, {
      params: {
        orderBy
      }
    });
    return response.data.data;
  } catch (error) {
    throw new Error('count를 받아올 수가 없습니다.');
  }

}

export const getGnbList = async ({ params, paths }) => {
  try {
    const {companyId} = paths;
    const response = await axiosInstance.get(`/auth-group/companies/${companyId}/gnb-list`);
    return response.data.data;
  } catch (error) {
    console.error(error);  // 상세 에러 정보 출력
    throw new Error('gnb를 받아올 수가 없습니다.');
}
};

export const getLnbList = async ({ paths }) => {
  const { companyId, parId } = paths;
  return axiosInstance.get(`/auth-group/companies/${companyId}/gnb/${parId}/lnb-list`)
    .then(response => {
      return response.data.data;
    });
};

export const getGnbListOfAuth = async ({ paths }) => {
  const { companyId, authId } = paths
  return axiosInstance.get(`/auth-group/companies/${companyId}/auth/${authId}/gnb`)
  .then(response => {
    return response.data.data;
  });
};

export const getGnbListOfAuthWithAll = async ({ paths }) => {
  const { companyId, authId} = paths
  return axiosInstance.get(`/auth-group/companies/${companyId}/auth/${authId}/gnb-all`)
  .then(response => {
    return response.data.data;
  })
}

export const getUserListOfAuth = async ({ paths }) => {
  const { authId } = paths
  return axiosInstance.get(`/auth-group/auth/${authId}`)
  .then(response => {
    return response.data.data;
  })
}