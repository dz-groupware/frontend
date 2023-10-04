import { axiosInstance } from "../utils/axiosInstance";

export const getEmployeeMgmtList = async (pageId) => {
  console.log("페이지아이디 확인좀 하자",pageId);
  axiosInstance.defaults.headers['menuId'] = pageId;
  try {
    const response = await axiosInstance.get('/employeemgmt',
    // {
    //   headers:{
    //     'Content-Type': "application/json",
    //     'menuId': pageId 
    //   },
    // }
      
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching employee data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};

export const getEmployeeDetailsById = async (employeeMgmtId,pageId) => {
  try {
    axiosInstance.defaults.headers['menuId'] = pageId;
    const response = await axiosInstance.get(`/employeemgmt/${employeeMgmtId}`);

    console.log("리스폰스",response);
    console.log("리스폰스",response.data);
    console.log("리스폰스",response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching employee data by id:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};


export const getAllDepartmentMgmtList = async (pageId) => {
  try {
    axiosInstance.defaults.headers['menuId'] = pageId;
    const response = await axiosInstance.get('/employeemgmt/dep');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching company data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};

export const findEmployeeMgmtList = async (searchValue, selectedOption, pageId) => {
  try {
    axiosInstance.defaults.headers['menuId'] = pageId;
    let actualSelectedOption = selectedOption === "0" ? 0 : parseInt(selectedOption);
    if (isNaN(actualSelectedOption)) {
      actualSelectedOption = 0; // 또는 원하는 기본값을 설정하세요.
    }
    const actualSearchValue = searchValue === "" ? "%25%25" : `%25${searchValue}%25`;
    // console.log("actualSelectedOption:", actualSelectedOption);

    const response = await axiosInstance.get(`/employeemgmt/employee-list?compId=${actualSelectedOption}&text=${actualSearchValue}`);
    return response.data.data;
  } catch (error) {
    console.error("API Error:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};





export const addEmployeeMgmt = async (employeeInfo, pageId) => {
  try {
    axiosInstance.defaults.headers['menuId'] = pageId;
    // console.log("담아졋나", employeeInfo);
    const response = await axiosInstance.post(`/employeemgmt`, employeeInfo);
    return response.data.data;
  } catch (error) {
    console.error("Error adding employeebasic data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};


export const modifyEmployeeMgmt = async (employeeInfo, pageId) => {
  try {
    axiosInstance.defaults.headers['menuId'] = pageId;
    const response = await axiosInstance.put(`/employeemgmt`, employeeInfo);
    return response.data.data;
  } catch (error) {
    console.error("Error adding company data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};





export const deleteEmployeeMgmt = async (id, employeeInfo, pageId) => {
  try {
    axiosInstance.defaults.headers['menuId'] = pageId;
    const response = await axiosInstance.put(`/employeemgmt/del/${id}`, employeeInfo);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting company data:", error);
    throw error;
  }
};


export const checkLoginId = async (loginId, pageId) => {
  try {
    axiosInstance.defaults.headers['menuId'] = pageId;
    const response = await axiosInstance.post(`/employeemgmt/idcheck/${loginId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting company data:", error);
    throw error;
  }
};

export const checkSignUp = async (signUpInfo, pageId) => {

  try {
    axiosInstance.defaults.headers['menuId'] = pageId;
    const response = await axiosInstance.post(`/employeemgmt/signupcheck`, signUpInfo);
    return response.data.data;

  } catch (error) {
    console.log("eeeerrrrrorrr",error);

    if (error.status == 404) {
      alert("이미 사용중인 정보가 있습니다.");
      return null; // 또는 적절한 에러 처리
    }
    if (error.status == 403) {
      alert('가입되지 않았습니다. 입력된 정보로 가입하기위해 인증이 진행됩니다.');
      return error.status; // 또는 적절한 에러 처리
    }
    console.error("Error checking sign up:", error);
    alert("An error occurred while checking sign up. Please try again later.");
    throw error;
  }
};


export const imageUpload = async (imageFile, pageId) => {
  try {
    if (imageFile !== "") {
      let formData = new FormData();
      formData.append('profileImage', imageFile); 
      console.log("imageFile",imageFile);
      const response = await axiosInstance.post(
        `/s3/profile`, formData,
        {
          headers: { 'Content-Type': 'multipart/form-data',
                        'menuId': pageId },
        }
      );
    
      // 서버에서 반환하는 S3 이미지 URL을 반환합니다.
      // 아래 코드는 반환된 데이터 구조에 따라 달라질 수 있습니다.
      // 예를 들어, response.data.url 혹은 response.data.imageUrl 등의 형태일 수 있습니다.
      return response.data;
    }
  } catch (error) {
    console.log("fail to upload image ...", error);
    alert("다시 시도해주세요. (이미지 추가 실패)");
    throw error;  // 에러를 던져 호출한 측에서 처리할 수 있게 합니다.
  }
}

