import { axiosInstance } from '../utils/axiosInstance';

export function addDepartment(dept){    
  return axiosInstance.post(
    `/department/dept`, dept
  )
}

export function getDepartemnt(){    
  return axiosInstance.get(
    `/department`
  )
}

export function getDepartmentList(parId){    
  return axiosInstance.get(
    `/department/dept-list?parId=${parId}`
  )
}

export function getBasicDetailById(id){    
  return axiosInstance.get(
    `/department/detail-basic?id=${id}`
  )
}