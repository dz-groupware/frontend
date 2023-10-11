import { axiosInstance } from '../utils/axiosInstance';

export const getCompanyMgmtList = async ( pageId) => {
  try {
    
    axiosInstance.defaults.headers['menuId'] =  pageId;
    const response = await axiosInstance.get('/companies');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching company data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};

export const getCompanyMgmtNameTreeList = async ( pageId) => {
  try {
    
    axiosInstance.defaults.headers['menuId'] =  pageId;
    const response = await axiosInstance.get('/companies/nametree');
    return response.data.data;
  } catch (error) {
    
    console.error("Error fetching company data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};




export const getOpenedCompanyMgmtList = async ( pageId) => {
  try {
    
    axiosInstance.defaults.headers['menuId'] =  pageId;
    const response = await axiosInstance.get('/companies/open');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching company data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};

export const getClosedCompanyMgmtList = async ( pageId) => {
  try {
    
    axiosInstance.defaults.headers['menuId'] =  pageId;
    const response = await axiosInstance.get('/companies/close');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching company data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};


// export const getCEODetailsById = async (ceoId,pageId) => {
//   try {
//     axiosInstance.defaults.headers['menuId'] = pageId;
//     const response = await axiosInstance.get(`/companies/${ceoId}`);

//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching employee data by id:", error);
//     alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
//     throw error;
//   }
// };


export const checkCEOSignUp = async (signUpInfo, pageId) => {

  try {
    axiosInstance.defaults.headers['menuId'] = pageId;
    const response = await axiosInstance.post(`/companies/signupcheck`, signUpInfo);
    return response.data.data;

  } catch (error) {
    console.log("eeeerrrrrorrr",error);

    if (error.data === "No data found from check") {
      alert("이미 사용중인 정보가 있습니다.");
      return null; // 또는 적절한 에러 처리
    }
    if (error.data === "No data found") {
      alert('가입되지 않았습니다. 입력된 정보로 가입하기위해 인증이 진행됩니다.');
      return error; // 또는 적절한 에러 처리
    }
    console.error("Error checking sign up:", error);
    alert("An error occurred while checking sign up. Please try again later.");
    throw error;
  }
};





export const getCompanyDetailsById = async (companyId,  pageId) => {
  try {
    console.log("menuId", pageId);
    axiosInstance.defaults.headers['menuId'] =  pageId;

    const response = await axiosInstance.get(`/companies/${companyId}`);

   
    return response.data.data;
  } catch (error) {
    console.error("Error fetching company data by id:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};

export const modifyCompanyMgmt = async (info, pageId) => {
  try {
    axiosInstance.defaults.headers['menuId'] = pageId;

    const response = await axiosInstance.put(`/companies`, info);
    console.log("뭐라고 할래?" , response.data.data);
    return response.data.data;
  } catch (error) {
    
    if(error.data === "Circular reference detected! Cannot move company under its own subtree."){
     
      throw new Error("Circular reference detected");
    }
    console.error("Error adding company data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};




export const addCompanyMgmt = async (info, pageId) => {
  try {
    axiosInstance.defaults.headers['menuId'] = pageId;

    const response = await axiosInstance.post(`/companies`, info);
    return response.data.data;
  } catch (error) {
    console.error("Error adding company data:", error);
    if(error.status === 409){
      alert("이미 사용중인 정보가 있습니다. 회사코드, 사업자번호, 법인번호를 확인해 주세요");
      return error.status;
    }
    else{
         alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
    }

  }
};

export const deleteCompanyMgmt = async (id, companyInfo, pageId) => {
  try {
    axiosInstance.defaults.headers['menuId'] = pageId;

    const response = await axiosInstance.delete(`/companies/del/${id}`, companyInfo);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting company data:", error);
  }
};

export const findCompanyMgmtList = async (searchValue, selectedOption, pageId) => {
  try {
    axiosInstance.defaults.headers['menuId'] = pageId;

    const actualSearchValue = searchValue === "" ? "%25%25" : `%25${searchValue}%25`;
    const actualSelectedOption = selectedOption === "" ? 2 : `${selectedOption}`;

    const response = await axiosInstance.get(`/companies/company-list?name=${actualSearchValue}&enabledType=${actualSelectedOption}`);

    return response.data.data;
  } catch (error) {
    console.error("API Error:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};

export const getAllCompanyMgmtParList = async (pageId) => {
  try {
    console.log("메뉴아이디",pageId);
    axiosInstance.defaults.headers['menuId'] = pageId;
    const response = await axiosInstance.get('/companies/par');
    return response.data.data;
  } catch (error) {
    console.error("Error fetching company data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};