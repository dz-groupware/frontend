import { axiosInstance } from "../utils/axiosInstance";

export const getEmployeeMgmtList = async () => {
  try {
    const response = await axiosInstance.get('/employeemgmt');
    return response.data;
  } catch (error) {
    console.error("Error fetching employee data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};

export const getEmployeeDetailsById = async (employeeMgmtId) => {
  try {
    const response = await axiosInstance.get(`/employeemgmt/${employeeMgmtId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employee data by id:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};


export const getAllDepartmentMgmtList = async () => {
  try {
    const response = await axiosInstance.get('/employeemgmt/dep');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching company data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};

export const findEmployeeMgmtList = async (searchValue, selectedOption) => {
  try {
    
    let actualSelectedOption = selectedOption === "0" ? 0 : parseInt(selectedOption);
    if (isNaN(actualSelectedOption)) {
        actualSelectedOption = 0; // 또는 원하는 기본값을 설정하세요.
    }
    const actualSearchValue = searchValue === "" ? "%25%25" : `%25${searchValue}%25`;
    console.log("actualSelectedOption:", actualSelectedOption);

    const response = await axiosInstance.get(`/employeemgmt/employee-list?compId=${actualSelectedOption}&text=${actualSearchValue}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};





export const addEmployeeMgmt = async (employeeInfo) => {
  try {
    console.log("담아졋나", employeeInfo);
    const response = await axiosInstance.post(`/employeemgmt`, employeeInfo);
    return response.data;
  } catch (error) {
    console.error("Error adding employeebasic data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
  }
};


export const modifyEmployeeMgmt = async (employeeInfo) => {
  try {
    const response = await axiosInstance.put(`/employeemgmt`,employeeInfo);
    return response.data;
  } catch (error) {
    console.error("Error adding company data:", error);
    alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
    throw error;
}
};





export const deleteEmployeeMgmt = async (id, employeeInfo) => {
  try {
      const response = await axiosInstance.put(`/employeemgmt/del/${id}`, employeeInfo);
      return response.data;
  } catch (error) {
      console.error("Error deleting company data:", error);
  }
};
