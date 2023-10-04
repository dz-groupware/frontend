import { axiosInstance } from "../utils/axiosInstance"

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

export function changeEmpApi(pageId, empId) {
  axiosInstance.defaults.headers['pageId'] = pageId;
  if(empId !== undefined && empId) {
      return axiosInstance.post(
          `/auth/re-login`,
          {
            empId,
          }
      )
  }
}

export function logOut() {
  return axiosInstance.post(
    `/auth/logout`, { headers: { 'pageId' : 0 } }
  )
}