import { axiosInstance } from '../utils/axiosInstance';

export function addDepartment(dept){    
  return axiosInstance.post(
    `/department/dept-all`, dept
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

export function getEmpListByDeptId(id){    
  return axiosInstance.get(
    `/department/detail-emp?id=${id}`
  )
}

export function getDepartmentById(parId){    
  return axiosInstance.get(
    `/department/dept-list?parId=${parId}`
  )
}

export function modifyDepartment(dept){    
  return axiosInstance.post(
    `/department/dept-modify`, dept
  )
}

export function deleteDepartment(id){    
  return axiosInstance.delete(
    `/department/dept?id=${id}`
  )
}

export function saveAll(dept){    
  console.log(dept, typeof(dept));
  return axiosInstance.post(
    `/department/dept-all`, dept
  )
}


export function getOptionCompList(){    
  return axiosInstance.get(
    `/department/option-comp`
  )
}

export function findDeptNameAndCode(compId, text){    
  return axiosInstance.get(
    `/department/dept?compId=${compId}&text=%25${text}%25`
  )
}