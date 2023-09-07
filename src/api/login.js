import { axiosInstance } from "../utils/axiosInstance"

export const loginApi = async ({ data }) => {
  try {
    const response = await axiosInstance.post('/login', {
      loginId: data.loginId,
      loginPw: data.loginPw,
    }) 
    console.log('data',response.data);
    return response.data;
  } catch (error) {
    console.error('로그인 실패',)
  }
}