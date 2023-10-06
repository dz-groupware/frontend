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

export function changeEmpApi(empId) {
  return axiosInstance.post(`/auth/re-login`,
    {
      empId,
    },{
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