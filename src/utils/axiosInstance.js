import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://dev.amaranth2023.site/api/v1",
  baseURL: "http://localhost:8010/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});


//요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    //요청 보내기 전에 수행 로직
    return config;
  },
  (err) => {
    //요청 에러 시 수행 로직
    if (err.response && err.response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    if (err.response && err.response.status === 403) {
      throw new Error('FORBIDDEN');
    }
    
    return Promise.reject(err);
  }
);
  
  //응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답에 대한 로직
    const status = response.status;
    const data = response.data;

    return { status, data };
  },
  (err) => {
    // 오류 응답의 상태 코드와 본문을 얻으려면 err.response.status와 err.response.data를 확인해야 합니다.
    if (err.response) {
      const errorStatus = err.response.status;
      const errorData = err.response.data;

      return Promise.reject({ status: errorStatus, data: errorData });
    }
    return Promise.reject(err);
  }
);
