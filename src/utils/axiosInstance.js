import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://dev.amaranth2023.site/api/v1",
  baseURL: "http://localhost:8010/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 20000,
});

//요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    if (err.response && err.response.status === 400) {
      console.log('Error : BAD_REQUEST');
      // window.location.href="/BAD_REQUEST"; // 다시시도
    }
    if (err.response && err.response.status === 401) {
      console.log('Error : UNAUTHORIZED');
      localStorage.setItem("empId", 0);
      localStorage.setItem("compId", 0);
      window.location.href="/login";
    }
    if (err.response && err.response.status === 403) {
      console.log('Error : UNAUTHORIZED');
      window.location.href="/FORBIDDEN";
    }
    if (err.message === 'timeout of 20000ms exceeded') {
      window.location.href="/";
      console.log('Error: Request Timed Out');
    } 
    if (err.message === 'timeout of 20000ms exceeded') {
      window.location.href="/";
      console.log('Error: Request Timed Out');
    } else {
      console.log("Unknown Error : ", err);
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
    if (err.response && err.response.status === 400) {
      console.log('Error : BAD_REQUEST');
      // window.location.href="/BAD_REQUEST"; // 다시시도
    }
    if (err.response && err.response.status === 401) {
      console.log('Error : UNAUTHORIZED');
      localStorage.setItem("empId", 0);
      localStorage.setItem("compId", 0);
      window.location.href="/login";
    };
    if (err.response && err.response.status === 403) {
      console.log('Error : FORBIDDEN');
      window.location.href="/FORBIDDEN";
    } 
    if (err.response && err.response.status === 500) {
      console.log('Error : INTERNAL_SERVER_ERROR');
      // window.location.href="/INTERNAL_SERVER_ERROR";
    }
    if (err.code === "ERR_NETWORK") {
      console.log('서버와 연결이 끊겼습니다.');
      window.location.href="/ERR_NETWORK";
    } else {
      console.log("Unknown Error : ", err);
    }
  }
);
