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
    throw error;  
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