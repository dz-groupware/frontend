import { axiosInstance } from "../utils/axiosInstance"
import { isUnAuthorized } from '../common/Error/Error';

export const loginApi = async ({ data }) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      loginId: data.loginId,
      loginPw: data.loginPw,
    }) 
    console.log(response);
    return response;
  } catch (error) {
    throw error; // 오류를 throw하여 상위로 전달합니다.
  }
}

export function changeEmpApi() {
  const empId = localStorage.setItem("empId", 0);
  isUnAuthorized(empId);
  return axiosInstance.post(`/auth/re-login`, {
      empId,
      headers: {
        "Content-Type": "application/json",
        "menuId" : "0",
      }
    }
  );
}

export function logOut() {
  return axiosInstance.post(
    `/auth/logout`, { headers: { 'pageId' : 0 } }
  )
}