import { axiosInstance } from "../utils/axiosInstance";

export const getParentCompanyWithEmployeeCountApi = async () => {
  return axiosInstance.get(`/company/par`)
  .then(response =>{ return response; })
  .catch(error => { throw error; });
}

export const getSubsidiaryCompaniesWithEmployeeCountApi = async ( {paths} ) => {
  const {companyId} = paths;
  console.log('이거호출되나?' ,companyId);
  return axiosInstance.get(`/company/par/${companyId}/sub`)
  .then(response =>{ 
    console.log(response)
    return response; })
  .catch(error => { throw error; });
}

export const getParDepartmentsWithEmployeeCountApi = async ({paths}) => {
  const { companyId } = paths; 
  return axiosInstance.get(`/company/${companyId}/departments/par`)
  .then(response =>{ return response; })
  .catch(error => { throw error; });
}

export const getSubsidiaryDepartmentsWithEmployeeCount = async ({paths}) => {
  const { companyId, departmentId} = paths;
  return axiosInstance.get(`/company/${companyId}/departments/par/${departmentId}/sub`)
  .then(response =>{ 
    return response; })
  .catch(error => { throw error; });
}



export const getEmployeeByDepartmentIdApi = async ({paths}) => {
  const { departmentId } = paths;
  return axiosInstance.get(`/company/departments/${departmentId}/employees`)
  .then(response =>{ 
    console.log(response);
    return response; })
  .catch(error => { throw error; });
}

export const getEmployeeNoDepartmentApi = async ({paths}) => {
  const { companyId } = paths;
  return axiosInstance.get(`/company/${companyId}/employees`)
  .then(response =>{ 
    console.log(response);
    return response; })
  .catch(error => { throw error; });
}