import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://dev.amaranth2023.site/api/v1",
  baseURL: "http://localhost:8010/api/v1",
  headers: { "Content-Type": "application/json", },
  withCredentials: true,
  timeout: 20000,
});

//요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    //요청 보내기 전에 수행 로직
    return config;
  },
  (err) => {
    console.log('request Error : ', err);
    if (err.code && err.code === 'ERR_NETWORK') {
      window.location.href='/ERR_NETWORK';
    }
    if (err.response && err.response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    if (err.response && err.response.status === 403) {
      window.location.href='/FORBIDDEN';
    } else {
      return Promise.reject(err);
    }
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
    console.log('response Error : ', err);
    if (err.code && err.code === 'ERR_NETWORK') {
      window.location.href='/ERR_NETWORK';
    }
    if (err.response && err.response.status === 402) {
      localStorage.setItem("isLogin", false);
      window.location.href='/login';
      // return;
    }
    if (err.response && err.response.status === 403) {
      window.location.href='/FORBIDDEN';
    } 
    if (err.response) {
      const errorStatus = err.response.status;
      const errorData = err.response.data;
      return Promise.reject({ status: errorStatus, data: errorData });
    } else {
      return Promise.reject(err);
    }
  }
);


