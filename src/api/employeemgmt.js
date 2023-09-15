import { axiosInstance } from "../utils/axiosInstance";

export const getEmployeeMgmtList = async () => {
    try {
        const response = await axiosInstance.get('/employeemgmt');
        return response.data;
    } catch (error) {
      console.error("Error fetching company data:", error);
      alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
      throw error;
    }
  };

//   export const getEmployeeDetailsById = async (companyId) => {
//     try {
//       const response = await axiosInstance.get(`/employeemgmt/${companyId}`);
//       console.log("받아온거:",response.data.data);
//       return response.data.data;
//     } catch (error) {
//       console.error("Error fetching company data by id:", error);
//       alert("오류가 발생했습니다.");  // 사용자에게 오류 메시지를 표시합니다.
//       throw error;
//     }
// };