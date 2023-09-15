import { axiosInstance } from '../utils/axiosInstance';

export const getCompanyMgmtList = async () => {
    try {
        const response = await axiosInstance.get('/companies');
        return response.data.data;
    } catch (error) {
      console.error("Error fetching company data:", error);
      alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
      throw error;
    }
  };


  export const getCompanyDetailsById = async (companyId) => {
    try {
      const response = await axiosInstance.get(`/companies/${companyId}`);
      console.log("받아온거:",response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching company data by id:", error);
      alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
      throw error;
    }
};

export const modifyCompanyMgmt = async (info) => {
    try {
      const response = await axiosInstance.put(`/companies`, info);
      return response.data.data;
    } catch (error) {
      console.error("Error adding company data:", error);
      alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
      throw error;
  }
};

export const addCompanyMgmt = async (info) => {
    try {
      const response = await axiosInstance.post(`/companies`, info);
      return response.data.data;
    } catch (error) {
      console.error("Error adding company data:", error);
      alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
      throw error;
    }
};

export const deleteCompanyMgmt = async (id, companyInfo) => {
    try {
        const response = await axiosInstance.delete(`/companies/del/${id}`, companyInfo);
        return response.data.data;
    } catch (error) {
        console.error("Error deleting company data:", error);
    }
};

export const findCompanyMgmtList = async (searchValue, selectedOption) => {
    try {
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

export const getAllCompanyMgmtParList = async () => {
  try {
      const response = await axiosInstance.get('/companies/par');
      console.log(response.data.data);
      return response.data.data;
  } catch (error) {
    console.error("Error fetching company data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
      throw error;
  }
};