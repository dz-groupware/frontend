import { axiosInstance } from '../utils/axiosInstance';

export function addDepartment(dept){    
  return axiosInstance.post(
    `/department/dept`, dept
  )
}