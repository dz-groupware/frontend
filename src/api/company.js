import { axiosInstance } from "../utils/axiosInstance";

export const getParentCompanyWithEmployeeCountApi = async ({ headers }) => {
  axiosInstance.defaults.headers['pageId'] = headers.pageId;
  return axiosInstance.get(`/company/par`)
  .then(response =>{ return response; })
  .catch(error => { throw error; });
}

export const getSubsidiaryCompaniesWithEmployeeCountApi = async ( {paths, headers} ) => {
  const {companyId} = paths;
  axiosInstance.defaults.headers['pageId'] = headers.pageId;
  return axiosInstance.get(`/company/par/${companyId}/sub`)
  .then(response =>{ 
    console.log(response)
    return response; })
  .catch(error => { throw error; });
}

export const getParDepartmentsWithEmployeeCountApi = async ( {paths, headers} ) => {
  const { companyId } = paths; 
  axiosInstance.defaults.headers['pageId'] = headers.pageId;
  return axiosInstance.get(`/company/${companyId}/departments/par`)
  .then(response =>{ return response; })
  .catch(error => { throw error; });
}

export const getSubsidiaryDepartmentsWithEmployeeCount = async ({paths, headers}) => {
  const { companyId, departmentId} = paths;
  axiosInstance.defaults.headers['pageId'] = headers.pageId;
  return axiosInstance.get(`/company/${companyId}/departments/par/${departmentId}/sub`)
  .then(response =>{ 
    return response; })
  .catch(error => { throw error; });
}



export const getEmployeeByDepartmentIdApi = async ({paths, headers}) => {
  const { departmentId } = paths;
  axiosInstance.defaults.headers['pageId'] = headers.pageId;
  return axiosInstance.get(`/company/departments/${departmentId}/employees`)
  .then(response =>{ 
    return response; })
  .catch(error => { throw error; });
}

export const getEmployeeNoDepartmentApi = async ({paths, headers}) => {
  const { companyId } = paths;
  axiosInstance.defaults.headers['pageId'] = headers.pageId;
  return axiosInstance.get(`/company/${companyId}/employees`)
  .then(response =>{ 
    return response; })
  .catch(error => { throw error; });
}