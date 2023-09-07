import axios from "axios";

export const axiosInstance = axios.create({
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
      return Promise.reject(err);
    }
  );
  
  //응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답에 대한 로직
    const statusCode = response.status;
    const data = response.data;

    return { statusCode, data };
  },
  (err) => {
    // 오류 응답의 상태 코드와 본문을 얻으려면 err.response.status와 err.response.data를 확인해야 합니다.
    if (err.response) {
      const errorStatusCode = err.response.status;
      const errorData = err.response.data;

      return Promise.reject({ statusCode: errorStatusCode, data: errorData });
    }

    return Promise.reject(err);
  }
);
