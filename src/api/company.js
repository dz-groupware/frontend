import axios from 'axios';
import { axiosInstance } from '../utils/axiosInstance';

export const getAuthGroup = ({ queryKey }) => {
  const [_ , companyId=1, pageSize=5, lastId, orderBy] = queryKey; //배열로구분
  return axiosInstance.get(`/companies/${companyId}/auth`, {
    params: {
      lastId: lastId || 0,
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
    const response = await axiosInstance.get(`/companies/${companyId}/auth/count`, {
      params: {
        orderBy
      }
    });
    return response.data.data;
  } catch (error) {
    throw new Error('count를 받아올 수가 없습니다.');
  }

}

export const getGnbList = async ({queryKey}) => {
  try {
    const [_, companyId] = queryKey;
    const response = await axiosInstance.get(`/companies/${companyId}/gnb-list`);
    return response.data.data;
  } catch (error) {
    console.error(error);  // 상세 에러 정보 출력
    throw new Error('gnb를 받아올 수가 없습니다.');
}
};

export const getLnbList = async ({companyId, parId}) => {
  try {
    const response = await axiosInstance.get(`/companies/${companyId}/gnb/${parId}/lnb-list`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('lnb를 받아올 수가 없습니다.')
  }
};