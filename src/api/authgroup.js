import { axiosInstance } from '../utils/axiosInstance';

/**
 * 수정해야함
 */
export const getAuthGroupApi = ({ queryKey }) => {
  const [_ ,lastId] = queryKey; //배열로구분
  
  return axiosInstance.get(`/auth-group/companies/auth/list`, {
    params: {
      lastId: lastId,
      pageSize: 1,
    }
  }).then(response => {
    return response.data.data;
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

export const getGnbListApi = async () => {
  try {
    const response = await axiosInstance.get(`/auth-group/companies/gnb-list`);
    return response.data;
  } catch (error) {
    console.error(error);  // 상세 에러 정보 출력
    throw new Error('gnb를 받아올 수가 없습니다.');
}
};

export const getLnbListApi = async ({ paths }) => {
  const { parId } = paths;
  return axiosInstance.get(`/auth-group/companies/gnb/${parId}/lnb-list`)
    .then(response => {
      return response.data;
    });
};

export const getGnbListOfAuthApi = async ({ paths }) => {
  const { authId } = paths
  return axiosInstance.get(`/auth-group/companies/auth/${authId}/gnb`)
  .then(response => {
    return response.data;
  });
};

export const getGnbListOfAuthWithAllApi = async ({ paths }) => {
  const {authId} = paths
  return axiosInstance.get(`/auth-group/companies/auth/${authId}/gnb-all`)
  .then(response => {
    return response.data;
  })
}

export const getUserListOfAuthApi = async ({ paths }) => {
  const { authId } = paths
  return axiosInstance.get(`/auth-group/auth/${authId}`)
  .then(response => {
    return response.data;
  }).catch(error => {
    console.error('API 호출 중 오류 발생:', error);
    throw error;  // 혹은 적절한 오류 응답을 반환하세요.
  });
}
