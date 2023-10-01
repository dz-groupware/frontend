import { axiosInstance } from '../utils/axiosInstance';

function header(menuId){
  return {
    headers: {
      'menuId' : menuId
    }
  };
}

export function addDepartment(dept, menuId){    
  return axiosInstance.post(
    `/department/dept-all`, dept, header(menuId)
  )
}

export function getDepartemnt(menuId){    
  return axiosInstance.get(
    `/department`, header(menuId)
  )
}

export function getDepartmentList(parId, menuId){    
  console.log('in api (header) : ', header(menuId));
  return axiosInstance.get(
    `/department/dept-list?parId=${parId}`, header(menuId)
  )
}

export function getBasicDetailById(id, menuId){    
  return axiosInstance.get(
    `/department/detail-basic?id=${id}`, header(menuId)
  )
}

export function getEmpListByDeptId(id, menuId){    
  return axiosInstance.get(
    `/department/detail-emp?id=${id}`, header(menuId)
  )
}

export function getDepartmentById(parId, menuId){
  console.log('in api!!!!!!!!!!!!!')
  return axiosInstance.get(
    `/department/dept-list?parId=${parId}`, header(menuId)
  )
}

export function modifyDepartment(dept, menuId){    
  return axiosInstance.post(
    `/department/dept-modify`, dept, header(menuId)
  )
}

export function deleteDepartment(id, menuId){    
  return axiosInstance.delete(
    `/department/dept?id=${id}`, header(menuId)
  )
}

export function saveAll(dept, menuId){    
  console.log(dept, typeof(dept));
  return axiosInstance.post(
    `/department/dept-all`, dept, header(menuId)
  )
}


export function getOptionCompList(menuId){   
  return axiosInstance.get(
    `/department/option-comp`, header(menuId)
  )
}

export function findDeptNameAndCode(compId, text, menuId){
  return axiosInstance.get(
    `/department/dept?compId=${compId}&text=%25${text}%25`, header(menuId)
  )
}

export function checkDeptCode(id, text, menuId){
  return axiosInstance.get(
    `/department/duplicate-test?id=${id}&text=${text}`, header(menuId)
  )
}