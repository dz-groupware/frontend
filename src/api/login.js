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
    console.error(error)
    console.error('로그인 실패');
    throw error; // 오류를 throw하여 상위로 전달합니다.
  }
}

export function changeEmpApi(empId) {
  if(empId !== undefined && empId) {
      return axiosInstance.post(
          `/user/re-login`,
          {
            empId,
          }
      )
  }
}